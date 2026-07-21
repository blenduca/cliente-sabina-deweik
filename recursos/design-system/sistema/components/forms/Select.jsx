import React, { useState } from "react";

/** Native select styled to match Input, with a custom caret. */
export function Select({ label, hint, error, options = [], value, defaultValue, onChange, size = "md", disabled = false, id }) {
  const [focused, setFocused] = useState(false);
  const heights = { sm: "var(--control-height-sm)", md: "var(--control-height-md)", lg: "var(--control-height-lg)" };
  const fieldId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", fontFamily: "var(--font-ui)" }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative", width: "100%" }}>
        <select
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: heights[size],
            padding: "0 40px 0 var(--control-pad-x)",
            background: "var(--surface-inset)",
            border: `var(--border-width-control) solid ${error ? "var(--danger)" : focused ? "var(--border-accent)" : "var(--border-strong)"}`,
            borderRadius: "var(--control-radius)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.95rem",
            outline: "none",
            boxShadow: focused ? "var(--focus-ring)" : "none",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            transition: "border-color var(--duration-base), box-shadow var(--duration-base)",
          }}
        >
          {opts.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {(hint || error) && <span style={{ fontSize: "0.75rem", color: error ? "var(--danger)" : "var(--text-subtle)" }}>{error || hint}</span>}
    </div>
  );
}
