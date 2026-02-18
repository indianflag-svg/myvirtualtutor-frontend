"use client";

import React, { useRef, useState } from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import TutorPanel from "../../components/session/TutorPanel";
import SessionControlBar from "../../components/session/SessionControlBar";

export default function SessionPage() {
  const [messages, setMessages] = useState([]);
  const boardApiRef = useRef<any>(null);

  const [mode, setMode] = useState<"chat" | "voice" | "both">("both");
  const [recording, setRecording] = useState(false);

  const API_BASE = "http://127.0.0.1:3001";

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

      const tutorMsg = {
        id: crypto.randomUUID(),
        role: "tutor",
        content: data.explanation
      };

      setMessages(prev => [...prev, tutorMsg]);

      setTimeout(() => {
        boardApiRef.current?.clear?.();
        boardApiRef.current?.writeLines?.(data.board || []);
      }, 100);

      if ((mode === "voice" || mode === "both") && data.audio_url) {
        const audio = new Audio(`${API_BASE}${data.audio_url}`);
        audio.play();
      }

    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  const startVoiceInput = async () => {
    if (recording || mode === "chat") return;

    setRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });

        const formData = new FormData();
        formData.append("audio", blob, "speech.webm");

        const sttRes = await fetch(`${API_BASE}/speech-to-text`, {
          method: "POST",
          body: formData,
        });

        const sttData = await sttRes.json();
        setRecording(false);

        if (sttData.ok && sttData.text) {
          onSend(sttData.text);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000);

    } catch (e) {
      console.error("Voice error:", e);
      setRecording(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: 8, textAlign: "center", background: "#f3f3f3" }}>
        <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
          <option value="chat">Chat Only</option>
          <option value="voice">Voice Only</option>
          <option value="both">Chat + Voice</option>
        </select>

        {(mode === "voice" || mode === "both") && (
          <button
            onClick={startVoiceInput}
            disabled={recording}
            style={{ marginLeft: 12 }}
          >
            {recording ? "Recording..." : "🎤 Speak"}
          </button>
        )}
      </div>

      <SessionShell
        tutor={
          <TutorPanel
            messages={messages}
            onSend={mode === "voice" ? undefined : onSend}
          />
        }
        whiteboard={<WhiteboardPanel apiRef={boardApiRef} />}
        controls={<SessionControlBar />}
      />
    </div>
  );
}
