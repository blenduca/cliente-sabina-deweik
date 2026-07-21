import React from "react";

/** Breadcrumb trail. Last item is the current page (not a link). */
export function Breadcrumb({ items = [] }) {
  const norm = items.map((i) => (typeof i === "string" ? { label: i } : i));
  return (
    <nav aria-label="breadcrumb" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, fontFamily: "var(--font-ui)", fontSize: "0.8rem" }}>
      {norm.map((item, i) => {
        const last = i === norm.length - 1;
        return (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {last ? (
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.label}</span>
            ) : (
              <a href={item.href || "#"} style={{ color: "var(--text-subtle)" }}>{item.label}</a>
            )}
            {!last && <span style={{ color: "var(--text-faint)" }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
