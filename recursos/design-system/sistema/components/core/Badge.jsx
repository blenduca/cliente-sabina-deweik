import React from "react";

/** Badge — meta pill (dates, "GRATUITO", tags). Full pill, Bebas Neue, tracked. */
export function Badge({ variant = "dark", children }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-display-pop)",
    borderRadius: "var(--radius-pill)",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    padding: "8px 16px",
  };
  const variants = {
    dark: { background: "var(--pop-preto)", color: "var(--pop-amarelo)" },
    light: { background: "var(--pop-amarelo)", color: "var(--pop-preto)" },
  };
  return <span style={{ ...base, ...variants[variant] }}>{children}</span>;
}
