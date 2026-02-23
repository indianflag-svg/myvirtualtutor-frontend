"use client";

import React, { useRef, useState } from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import TutorPanel from "../../components/session/TutorPanel";
import SessionControlBar from "../../components/session/SessionControlBar";

export default function SessionPage() {
  const [messages, setMessages] = useState([]);
  const boardApiRef = useRef<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recording, setRecording] = useState(false);

  // Force backend URL for local testing
  const API_BASE = "http://127.0.0.1:3001";

  // Send text to backend safely
  const onSend = async (text?: string) => {
    if (!text || !text.trim()) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch(`${API_BASE}/chat-voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Backend error");

      const tutorMsg = { id: crypto.randomUUID(), role: "tutor", content: data.reply };
      setMessages(prev => [...prev, tutorMsg]);

      // Whiteboard
      boardApiRef.current?.clear?.();
      boardApiRef.current?.writeLines?.(data.reply.split("\n"));

      // Play audio
      if (voiceEnabled && data.audio_url) {
        const audio = new Audio(`${API_BASE}${data.audio_url}`);
        audio.autoplay = true;
        audio.play().catch(() => console.log("Autoplay blocked; click Send"));
      }

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: "tutor", content: "Error contacting tutor server." },
      ]);
    }
  };

  // Record microphone, send to Whisper
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

        const sttRes = await fetch(`${API_BASE}/speech-to-text`, { method: "POST", body: formData });
        const sttData = await sttRes.json();
        setRecording(false);

        if (!sttData.ok || !sttData.text) {
          alert("Speech-to-text failed or returned no text.");
        } else {
          onSend(sttData.text);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 10000); // 10 seconds recording

    } catch (e) {
      alert("Microphone access denied or error: " + e);
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
