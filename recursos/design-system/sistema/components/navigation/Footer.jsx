import React from "react";

/** Site footer: wordmark + link columns + contact. */
export function Footer({ brand = "Sabina Deweik", tagline, columns = [], contact = [] }) {
  return (
    <footer style={{
      background: "var(--surface-raised-alt)",
      borderTop: "1px solid var(--border-default)",
      padding: "clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,2.5rem)",
      fontFamily: "var(--font-ui)",
    }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
        <div style={{ maxWidth: 280 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "var(--accent-ink)", textTransform: "uppercase", letterSpacing: "0.02em" }}>{brand}</div>
          {tagline && <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", marginTop: 10 }}>{tagline}</p>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 4 }}>{col.title}</div>
              {col.links.map((l) => {
                const label = typeof l === "string" ? l : l.label;
                const href = typeof l === "string" ? "#" : l.href || "#";
                return <a key={label} href={href} style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{label}</a>;
              })}
            </div>
          ))}
          {contact.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 4 }}>Contato</div>
              {contact.map((c, i) => <span key={i} style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{c}</span>)}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
