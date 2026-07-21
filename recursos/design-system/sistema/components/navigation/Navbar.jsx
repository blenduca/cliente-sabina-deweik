import React, { useState } from "react";

/** Top navigation bar with wordmark, links and a CTA. */
export function Navbar({ brand = "Sabina Deweik", links = [], cta, active, sticky = false }) {
  return (
    <nav
      style={{
        position: sticky ? "sticky" : "relative",
        top: 0,
        zIndex: 40,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "16px clamp(1.25rem, 5vw, 2.5rem)",
        background: "var(--surface-overlay)",
        borderBottom: "1px solid var(--border-default)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: "var(--font-ui)",
      }}
    >
      <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", letterSpacing: "0.02em", color: "var(--text-primary)", textTransform: "uppercase" }}>{brand}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {links.map((l) => {
          const label = typeof l === "string" ? l : l.label;
          const href = typeof l === "string" ? "#" : l.href || "#";
          const on = active === label;
          return (
            <a key={label} href={href} style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: on ? "var(--accent-ink)" : "var(--text-muted)",
              letterSpacing: "0.02em",
              paddingBottom: 2,
              borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "color var(--duration-base)",
            }}>{label}</a>
          );
        })}
        {cta && (
          <button style={{
            background: "var(--accent)",
            color: "var(--text-on-accent)",
            border: "none",
            borderRadius: "var(--button-radius)",
            padding: "10px 22px",
            fontFamily: "var(--font-heading)",
            fontSize: "0.95rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}>{cta}</button>
        )}
      </div>
    </nav>
  );
}
