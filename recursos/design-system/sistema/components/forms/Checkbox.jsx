import React, { useState } from "react";

/** Checkbox with label. Controlled (checked/onChange) or uncontrolled (defaultChecked). */
export function Checkbox({ label, checked, defaultChecked = false, onChange, disabled = false, id }) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal((v) => !v);
    onChange && onChange(!on);
  };
  return (
    <label htmlFor={fieldId} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, fontFamily: "var(--font-ui)", userSelect: "none" }}>
      <span
        role="checkbox"
        aria-checked={on}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } }}
        style={{
          width: 22,
          height: 22,
          flexShrink: 0,
          borderRadius: "var(--radius-xs)",
          border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
          background: on ? "var(--accent)" : "var(--surface-inset)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--duration-base), border-color var(--duration-base)",
        }}
      >
        {on && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-on-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <input id={fieldId} type="checkbox" checked={on} onChange={() => {}} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
