import React from "react";

/** SectionLabel — the tracked all-caps Bebas eyebrow above every section title. */
export function SectionLabel({ color = "var(--pop-amarelo)", children }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display-pop)",
        fontSize: "0.85rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color,
        display: "block",
      }}
    >
      {children}
    </span>
  );
}
