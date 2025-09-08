import React, { useState } from "react";

// Dummy data for demonstration
const initialMessages = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    message: "Hola, ¿tienen vinilos de Queen?",
    date: "2024-06-10",
    replied: false,
    reply: ""
  },
  {
    id: 2,
    name: "Ana López",
    email: "ana@email.com",
    message: "¿Cuánto cuesta el box set de Beatles?",
    date: "2024-06-11",
    replied: true,
    reply: "Hola Ana, el box set cuesta $2500 MXN."
  }
];

const MessagesDashboard = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (id: number) => {
    setMessages(msgs =>
      msgs.map(m =>
        m.id === id ? { ...m, replied: true, reply: replyText } : m
      )
    );
    setReplyText("");
    setSelected(null);
  };

  return (
    <section style={{
      background: "var(--section)",
      color: "var(--text)",
      borderRadius: 16,
      margin: "40px auto",
      maxWidth: 900,
      padding: "48px 32px",
      boxShadow: "var(--shadow)",
      minHeight: 400,
    }}>
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2rem", marginBottom: 24 }}>
        Mensajes de clientes
      </h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h3 style={{ color: "var(--accent)", fontSize: "1.15rem", marginBottom: 12 }}>Recibidos</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map(msg => (
              <li key={msg.id} style={{
                background: msg.replied ? "#f6f6f6" : "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                marginBottom: 14,
                padding: "16px 18px",
                boxShadow: "0 2px 8px var(--shadow)",
                cursor: "pointer",
                transition: "background 0.2s",
                fontWeight: msg.replied ? "normal" : "bold",
              }}
                onClick={() => setSelected(msg.id)}
              >
                <div style={{ fontSize: "1.08rem", color: "var(--accent)" }}>{msg.name}</div>
                <div style={{ fontSize: "0.98rem", color: "var(--muted)" }}>{msg.email}</div>
                <div style={{ fontSize: "0.98rem", marginTop: 6 }}>{msg.message}</div>
                <div style={{ fontSize: "0.92rem", color: "var(--muted)", marginTop: 4 }}>{msg.date}</div>
                {msg.replied && <span style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.95rem" }}>Respondido</span>}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 2, minWidth: 320 }}>
          {selected && (
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px var(--shadow)", padding: 24, border: "1.5px solid var(--border)" }}>
              {(() => {
                const msg = messages.find(m => m.id === selected);
                if (!msg) return null;
                return (
                  <>
                    <h3 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.15rem" }}>Mensaje de {msg.name}</h3>
                    <div style={{ color: "var(--muted)", fontSize: "0.98rem", marginBottom: 8 }}>{msg.email}</div>
                    <div style={{ fontSize: "1.08rem", marginBottom: 12 }}>{msg.message}</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: 12 }}>{msg.date}</div>
                    {msg.replied ? (
                      <div style={{ background: "#f6f6f6", borderRadius: 8, padding: 12, color: "var(--accent)", fontWeight: "bold", marginBottom: 8 }}>
                        <span>Respuesta enviada:</span>
                        <div style={{ color: "var(--text)", fontWeight: "normal", marginTop: 6 }}>{msg.reply}</div>
                      </div>
                    ) : (
                      <div style={{ marginTop: 18 }}>
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Escribe tu respuesta..."
                          rows={4}
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: 8,
                            border: "2px solid var(--accent)",
                            background: "#fff",
                            color: "var(--text)",
                            fontSize: "1rem",
                            marginBottom: 12,
                            boxShadow: "0 2px 8px var(--shadow)",
                          }}
                        />
                        <button
                          onClick={() => handleReply(msg.id)}
                          style={{
                            padding: "12px 28px",
                            borderRadius: 8,
                            border: "none",
                            background: "var(--accent)",
                            color: "var(--bg)",
                            fontWeight: "bold",
                            fontSize: "1.08rem",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px var(--shadow)",
                            transition: "background 0.2s, color 0.2s",
                          }}
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagesDashboard;
