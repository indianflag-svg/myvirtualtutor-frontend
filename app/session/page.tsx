"use client";

import React from "react";
import SessionShell from "../../components/session/SessionShell";
import WhiteboardPanel from "../../components/whiteboard/WhiteboardPanel";
import SessionControlBar from "../../components/session/SessionControlBar";
import TutorPanel from "../../components/session/TutorPanel";

export default function SessionPage() {
  const [messages, setMessages] = React.useState([]);
  const boardApiRef = React.useRef(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_SERVER_BASE || "http://127.0.0.1:3001";

  const onSend = async (text: string) => {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!data.ok) throw new Error("Backend error");

      const tutorMsg = {
        id: crypto.randomUUID(),
        role: "tutor",
        content: data.reply,
      };

      setMessages((prev) => [...prev, tutorMsg]);

      boardApiRef.current?.clear?.();
      boardApiRef.current?.writeLines?.(data.reply.split("\n"));
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "tutor",
          content: "Error contacting tutor server.",
        },
      ]);
    }
  };

  return (
    <SessionShell
      tutor={<TutorPanel messages={messages} onSend={onSend} />}
      whiteboard={<WhiteboardPanel apiRef={boardApiRef} />}
      controls={<SessionControlBar />}
    />
  );
}
