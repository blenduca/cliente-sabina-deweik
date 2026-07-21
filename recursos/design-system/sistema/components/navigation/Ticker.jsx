import React from "react";

/** Ticker — the amarelo marquee banner with ★ separators. Infinite horizontal scroll. */
export function Ticker({ items = [], speed = 22 }) {
  const track = [...items, ...items];
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "var(--pop-amarelo)", padding: "10px 0" }}>
      <style>{`@keyframes dc-ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          whiteSpace: "nowrap",
          animation: `dc-ticker-scroll ${speed}s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 1rem",
              fontSize: "1.1rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display-pop)",
              color: "var(--pop-preto)",
            }}
          >
            {item}
            <span style={{ margin: "0 12px" }}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
