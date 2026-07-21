import React, { useState } from "react";

/** Multi-line text field. */
export function Textarea({ label, hint, error, placeholder, value, defaultValue, onChange, rows = 4, disabled = false, id }) {
  const [focused, setFocused] = useState(false);
  const fieldId = id || (label ? `ta-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", fontFamily: "var(--font-ui)" }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "12px var(--control-pad-x)",
          background: "var(--surface-inset)",
          border: `var(--border-width-control) solid ${error ? "var(--danger)" : focused ? "var(--border-accent)" : "var(--border-strong)"}`,
          borderRadius: "var(--control-radius)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-ui)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
          outline: "none",
          resize: "vertical",
          boxShadow: focused ? "var(--focus-ring)" : "none",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color var(--duration-base), box-shadow var(--duration-base)",
          width: "100%",
        }}
      />
      {(hint || error) && <span style={{ fontSize: "0.75rem", color: error ? "var(--danger)" : "var(--text-subtle)" }}>{error || hint}</span>}
    </div>
  );
}
