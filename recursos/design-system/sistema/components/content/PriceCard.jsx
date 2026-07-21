import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * PriceCard — the access/offer block. "free" = verde block (community offer),
 * "premium" = dark #1a1a1a block (companies / paid). Both pop.
 */
export function PriceCard({ variant = "free", tag, title, price, description, ctaLabel }) {
  const premium = variant === "premium";
  return (
    <div
      style={{
        padding: "64px 48px",
        background: premium ? "#1a1a1a" : "var(--pop-verde)",
        color: premium ? "var(--pop-branco)" : "var(--pop-preto)",
        border: premium ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display-pop)",
          fontSize: "0.85rem",
          letterSpacing: "0.25em",
          background: premium ? "var(--pop-amarelo)" : "var(--pop-preto)",
          color: premium ? "var(--pop-preto)" : "var(--pop-amarelo)",
          padding: "6px 14px",
          borderRadius: "var(--radius-pill)",
          display: "inline-block",
          marginBottom: 24,
        }}
      >
        {tag}
      </span>
      <h3 style={{ fontFamily: "var(--font-display-pop)", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1, marginBottom: 16, color: "inherit" }}>{title}</h3>
      {price && (
        <div style={{ fontFamily: "var(--font-display-pop)", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, marginBottom: 24, color: premium ? "var(--pop-amarelo)" : "var(--pop-preto)" }}>
          {price}
        </div>
      )}
      <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: 32, opacity: 0.85, color: "inherit", maxWidth: "none" }}>{description}</p>
      <Button variant={premium ? "light" : "dark"} icon>{ctaLabel}</Button>
    </div>
  );
}
