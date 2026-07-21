import React from "react";

/**
 * Card — the color-block content card (dor-item / persona-card / sxsw-card).
 * Flat, square, filled with one brand hue. Pass accentBg/accentColor per section.
 */
export function Card({ title, description, accentBg = "var(--pop-preto)", accentColor = "var(--pop-branco)", children }) {
  return (
    <div style={{ background: accentBg, color: accentColor, padding: "40px 32px", fontFamily: "var(--font-sans-pop)" }}>
      {title && (
        <strong style={{ display: "block", fontFamily: "var(--font-display-pop)", fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: 12, textTransform: "uppercase" }}>
          {title}
        </strong>
      )}
      {description && <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "inherit", opacity: 0.9, maxWidth: "none" }}>{description}</p>}
      {children}
    </div>
  );
}
