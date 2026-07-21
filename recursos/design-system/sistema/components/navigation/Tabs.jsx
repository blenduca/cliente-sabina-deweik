import React, { useState } from "react";

/** Tab bar. variant "line" (underline) or "pill". */
export function Tabs({ tabs = [], value, defaultValue, onChange, variant = "line" }) {
  const items = tabs.map((t) => (typeof t === "string" ? { value: t, label: t } : t));
  const [internal, setInternal] = useState(defaultValue || (items[0] && items[0].value));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };

  if (variant === "pill") {
    return (
      <div style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--surface-inset)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-ui)" }}>
        {items.map((t) => {
          const on = current === t.value;
          return (
            <button key={t.value} onClick={() => select(t.value)} style={{
              border: "none",
              borderRadius: "var(--radius-pill)",
              padding: "8px 18px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              background: on ? "var(--accent)" : "transparent",
              color: on ? "var(--text-on-accent)" : "var(--text-muted)",
              transition: "background var(--duration-base), color var(--duration-base)",
            }}>{t.label}</button>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 28, borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-ui)" }}>
      {items.map((t) => {
        const on = current === t.value;
        return (
          <button key={t.value} onClick={() => select(t.value)} style={{
            background: "none",
            border: "none",
            borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent",
            marginBottom: -1,
            padding: "12px 2px",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            cursor: "pointer",
            color: on ? "var(--text-primary)" : "var(--text-subtle)",
            transition: "color var(--duration-base), border-color var(--duration-base)",
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}
