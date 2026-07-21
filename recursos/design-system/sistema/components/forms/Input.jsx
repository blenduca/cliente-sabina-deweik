import React, { useState } from "react";

/** Text input with label, hint and error states. Reskins across dark/light themes via tokens. */
export function Input({
  label,
  hint,
  error,
  size = "md",
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  id,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const heights = { sm: "var(--control-height-sm)", md: "var(--control-height-md)", lg: "var(--control-height-lg)" };
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", fontFamily: "var(--font-ui)" }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <input
        id={fieldId}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: heights[size],
          padding: "0 var(--control-pad-x)",
          background: "var(--surface-inset)",
          border: `var(--border-width-control) solid ${error ? "var(--danger)" : focused ? "var(--border-accent)" : "var(--border-strong)"}`,
          borderRadius: "var(--control-radius)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-ui)",
          fontSize: "0.95rem",
          outline: "none",
          boxShadow: focused ? "var(--focus-ring)" : "none",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color var(--duration-base), box-shadow var(--duration-base)",
          width: "100%",
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: "0.75rem", color: error ? "var(--danger)" : "var(--text-subtle)" }}>{error || hint}</span>
      )}
    </div>
  );
}
