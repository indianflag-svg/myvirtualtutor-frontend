"use client";

import React, { useRef, useState, useEffect } from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import TutorPanel from "../../components/session/TutorPanel";
import SessionControlBar from "../../components/session/SessionControlBar";

export default function SessionPage() {

  const [messages, setMessages] = useState<any[]>([]);
  const [recording, setRecording] = useState(false);

  const boardApiRef = useRef<any>(null);

  // NEW: auto-scroll reference
  const tutorPanelRef = useRef<any>(null);

  const API_BASE = "https://myvirtualtutor-backend-2.onrender.com";

  // NEW: scroll whenever messages update
  useEffect(() => {
    tutorPanelRef.current?.scrollToBottom?.();
  }, [messages]);

  const onSend = async (text?: string) => {

    if (!text || !text.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text
    };

    setMessages(prev => [...prev, userMsg]);

    try {

      const res = await fetch(API_BASE + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      const reply = data.reply || "Tutor error.";

      const tutorMsg = {
        id: crypto.randomUUID(),
        role: "tutor",
        content: reply
      };

      setMessages(prev => [...prev, tutorMsg]);

      boardApiRef.current?.clear?.();
      boardApiRef.current?.writeLines?.(reply.split("\n"));

    } catch {

      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "tutor",
          content: "Error contacting tutor server."
        }
      ]);

    }

  };

  const startVoiceInput = async () => {

    if (recording) return;
    setRecording(true);

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);

      mediaRecorder.onstop = async () => {

        const blob = new Blob(chunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", blob, "speech.wav");

        try {

          const sttRes = await fetch(API_BASE + "/speech-to-text", {
            method: "POST",
            body: formData
          });

          const sttData = await sttRes.json();
          setRecording(false);

          if (!sttData.ok || !sttData.text) {
            alert("Speech-to-text failed.");
          } else {
            onSend(sttData.text);
          }

        } catch {
          alert("Speech processing error.");
          setRecording(false);
        }

      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 10000);

    } catch (e) {
      alert("Microphone error: " + e);
      setRecording(false);
    }

  };

  return (

    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      <div style={{ padding: "0.5rem", textAlign: "center", backgroundColor: "#f3f3f3" }}>
        <button onClick={startVoiceInput} disabled={recording} style={{ fontSize: "1.2rem" }}>
          {recording ? "Recording..." : "🎤 Speak"}
        </button>
      </div>

      <SessionShell
        tutor={
          <TutorPanel
            ref={tutorPanelRef}
            messages={messages}
            onSend={onSend}
          />
        }
        whiteboard={<WhiteboardPanel apiRef={boardApiRef} />}
        controls={<SessionControlBar />}
      />

    </div>

  );

}
