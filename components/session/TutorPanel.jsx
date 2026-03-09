"use client";

import React, { useState, useRef, useEffect } from "react";

export default function TutorPanel({ messages, onSend }) {

  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >

        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#e6f0ff" : "#f4f4f4",
              padding: "10px 14px",
              borderRadius: "10px",
              maxWidth: "75%",
              whiteSpace: "pre-wrap"
            }}
          >
            {m.content}
          </div>
        ))}

      </div>

      <div style={{ display: "flex", borderTop: "1px solid #ddd", padding: "10px" }}>
        <input
          style={{ flex: 1, padding: "8px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a math question..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} style={{ marginLeft: "8px" }}>
          Send
        </button>
      </div>

    </div>
  );
}
