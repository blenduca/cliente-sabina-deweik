import React from "react";

/** Radio group. Pass options + value + onChange. */
export function Radio({ name, options = [], value, defaultValue, onChange, disabled = false }) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const groupName = name || `radio-${Math.random().toString(36).slice(2, 7)}`;
  const select = (v) => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-ui)" }}>
      {opts.map((o) => {
        const on = current === o.value;
        return (
          <label key={o.value} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, userSelect: "none" }}>
            <span
              role="radio"
              aria-checked={on}
              tabIndex={disabled ? -1 : 0}
              onClick={() => select(o.value)}
              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); select(o.value); } }}
              style={{
                width: 22,
                height: 22,
                flexShrink: 0,
                borderRadius: "var(--radius-circle)",
                border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
                background: "var(--surface-inset)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color var(--duration-base)",
              }}
            >
              {on && <span style={{ width: 11, height: 11, borderRadius: "var(--radius-circle)", background: "var(--accent)" }} />}
            </span>
            <input type="radio" name={groupName} value={o.value} checked={on} onChange={() => {}} disabled={disabled} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
            <span style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
