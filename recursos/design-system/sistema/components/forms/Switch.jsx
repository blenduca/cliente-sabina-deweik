import React, { useState } from "react";

/** Toggle switch. */
export function Switch({ label, checked, defaultChecked = false, onChange, disabled = false, id }) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || (label ? `sw-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal((v) => !v);
    onChange && onChange(!on);
  };
  return (
    <label htmlFor={fieldId} style={{ display: "inline-flex", alignItems: "center", gap: 12, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, fontFamily: "var(--font-ui)", userSelect: "none" }}>
      <span
        role="switch"
        aria-checked={on}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } }}
        style={{
          width: 46,
          height: 26,
          flexShrink: 0,
          borderRadius: "var(--radius-pill)",
          background: on ? "var(--accent)" : "var(--surface-inset)",
          border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
          position: "relative",
          transition: "background var(--duration-base), border-color var(--duration-base)",
        }}
      >
        <span style={{
          position: "absolute",
          top: "50%",
          left: on ? 22 : 2,
          transform: "translateY(-50%)",
          width: 20,
          height: 20,
          borderRadius: "var(--radius-circle)",
          background: on ? "var(--text-on-accent)" : "var(--text-subtle)",
          transition: "left var(--duration-base) var(--ease-out)",
        }} />
      </span>
      <input id={fieldId} type="checkbox" checked={on} onChange={() => {}} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
