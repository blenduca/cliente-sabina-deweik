import React from "react";

/** Testimonial — rosa color-block quote in DM Serif Display italic, with a cite. */
export function Testimonial({ quote, cite, accentBg = "var(--pop-rosa)", accentColor = "var(--pop-preto)" }) {
  return (
    <div style={{ background: accentBg, color: accentColor, padding: "64px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.5rem,3vw,2.2rem)", lineHeight: 1.5, marginBottom: 24, maxWidth: "800px", color: "inherit" }}>
        {quote}
      </p>
      {cite && (
        <cite style={{ fontStyle: "normal", fontFamily: "var(--font-sans-pop)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.05em", opacity: 0.65, textTransform: "uppercase" }}>
          {cite}
        </cite>
      )}
    </div>
  );
}
