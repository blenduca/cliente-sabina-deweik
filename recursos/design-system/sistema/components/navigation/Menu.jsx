import React, { useState, useRef, useEffect } from "react";

/** Dropdown menu: a trigger button + a popover list of items. */
export function Menu({ label = "Menu", items = [], align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const norm = items.map((i) => (typeof i === "string" ? { label: i } : i));
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", fontFamily: "var(--font-ui)" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "var(--surface-raised)", color: "var(--text-primary)",
        border: "1px solid var(--border-strong)", borderRadius: "var(--radius-pill)",
        padding: "9px 18px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
      }}>
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-base)" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", [align]: 0, minWidth: 200, zIndex: 30,
          background: "var(--surface-raised)", border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", padding: 6, overflow: "hidden",
        }}>
          {norm.map((it, i) => (
            it.divider ? (
              <div key={i} style={{ height: 1, background: "var(--border-default)", margin: "6px 0" }} />
            ) : (
              <button key={i} onClick={() => { it.onClick && it.onClick(); setOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                background: "none", border: "none", borderRadius: "var(--radius-sm)",
                padding: "10px 12px", fontSize: "0.9rem", cursor: "pointer",
                color: it.danger ? "var(--danger)" : "var(--text-primary)", fontFamily: "var(--font-ui)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-raised-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                {it.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}
