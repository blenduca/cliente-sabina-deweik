import React from "react";

/**
 * Button — campaign CTA pill. Two fills: dark (black pill, amarelo text) and
 * light (amarelo pill, black text). Reads tokens from styles.css.
 */
export function Button({
  variant = "dark",
  size = "md",
  icon = false,
  disabled = false,
  as = "button",
  href,
  children,
  onClick,
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6em",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    border: "none",
    fontFamily: "var(--font-display-pop)",
    letterSpacing: "0.1em",
    textDecoration: "none",
    borderRadius: "var(--radius-pill)",
    transition: "transform var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)",
    whiteSpace: "nowrap",
  };

  const sizes = {
    md: { padding: "16px 40px", fontSize: "1.1rem" },
    lg: { padding: "20px 52px", fontSize: "1.3rem" },
  };

  const variants = {
    dark: { background: "var(--pop-preto)", color: "var(--pop-amarelo)" },
    light: { background: "var(--pop-amarelo)", color: "var(--pop-preto)" },
  };

  const style = { ...base, ...sizes[size], ...variants[variant] };
  const Tag = as === "a" ? "a" : "button";

  return (
    <Tag
      style={style}
      href={as === "a" ? href : undefined}
      disabled={as === "button" ? disabled : undefined}
      onClick={disabled ? undefined : onClick}
    >
      <span>{children}</span>
      {icon && <span aria-hidden="true">→</span>}
    </Tag>
  );
}
