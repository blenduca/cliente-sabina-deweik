import React, { useState } from "react";

export function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{ borderTop: i === 0 ? "1px solid var(--border-default)" : "none", borderBottom: "1px solid var(--border-default)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "2.5rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                color: isOpen ? "var(--accent)" : "var(--text-primary)",
                transition: "color var(--duration-slow)",
              }}
            >
              {item.question}
              <span
                style={{
                  fontSize: "1.5rem",
                  color: "var(--accent)",
                  fontWeight: 300,
                  transition: `transform ${"var(--duration-slow)"}`,
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: `max-height var(--duration-slow) var(--ease-cinematic)` }}>
              <p style={{ paddingBottom: "2.5rem", color: "var(--text-subtle)" }}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
