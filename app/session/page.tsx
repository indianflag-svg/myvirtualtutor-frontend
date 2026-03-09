"use client";

import React, { useRef, useState } from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import TutorPanel from "../../components/session/TutorPanel";
import SessionControlBar from "../../components/session/SessionControlBar";

export default function SessionPage() {

  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);

  const boardApiRef = useRef(null);

  const API_BASE = "https://myvirtualtutor-backend-2.onrender.com";

  function cleanBoardLines(text) {

    return text
      .replace(/\\\[.*?\\\]/gs, "")      // remove LaTeX blocks
      .replace(/\*\*/g, "")              // remove markdown bold
      .replace(/#+/g, "")                // remove headings
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .slice(0, 6);                      // limit lines on board

  }

  const onSend = async (text) => {

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

      const boardLines = cleanBoardLines(reply);

      boardApiRef.current?.clear?.();
      boardApiRef.current?.writeLines?.(boardLines);

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
      const chunks = [];

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
        tutor={<TutorPanel messages={messages} onSend={onSend} />}
        whiteboard={<WhiteboardPanel apiRef={boardApiRef} />}
        controls={<SessionControlBar />}
      />

    </div>

  );

}
