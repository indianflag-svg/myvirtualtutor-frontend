"use client";

import React, { useRef, useState } from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import TutorPanel from "../../components/session/TutorPanel";
import SessionControlBar from "../../components/session/SessionControlBar";

export default function SessionPage() {

  const [messages, setMessages] = useState<any[]>([]);
  const boardApiRef = useRef<any>(null);

  const API_BASE = "https://myvirtualtutor-backend-2.onrender.com";

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
        headers: {
          "Content-Type": "application/json"
        },
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

      if (boardApiRef.current?.clear) {
        boardApiRef.current.clear();
      }

      if (boardApiRef.current?.writeLines) {
        boardApiRef.current.writeLines(reply.split("\n"));
      }

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

  return (

    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      <SessionShell
        tutor={<TutorPanel messages={messages} onSend={onSend} />}
        whiteboard={<WhiteboardPanel apiRef={boardApiRef} />}
        controls={<SessionControlBar />}
      />

    </div>

  );

}
