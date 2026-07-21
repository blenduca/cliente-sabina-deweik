import React from "react";

/** StatBlock — a bare oversized number with a one-line caption (7 · 100% · 0). */
export function StatBlock({ value, label, valueColor = "var(--pop-amarelo)" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display-pop)", color: valueColor, fontSize: "3.5rem", lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ fontFamily: "var(--font-sans-pop)", color: "var(--text-subtle)", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}
