/* @ds-bundle: {"format":4,"namespace":"SabinaDeweikDesignSystem_a9d1c1","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"PriceCard","sourcePath":"components/content/PriceCard.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Testimonial","sourcePath":"components/content/Testimonial.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Menu","sourcePath":"components/navigation/Menu.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Ticker","sourcePath":"components/navigation/Ticker.jsx"}],"sourceHashes":{"components/content/Card.jsx":"daf3c882238e","components/content/PriceCard.jsx":"71dbdae22301","components/content/StatBlock.jsx":"fc01b548378f","components/content/Testimonial.jsx":"71ac605ec6df","components/core/Badge.jsx":"a18f217855b7","components/core/Button.jsx":"c093ffe889d9","components/core/SectionLabel.jsx":"edc75d374c3a","components/forms/Checkbox.jsx":"3a546bad37e9","components/forms/Input.jsx":"75bb7e43c9dc","components/forms/Radio.jsx":"73cd9c77fab0","components/forms/Select.jsx":"b3b09893dda3","components/forms/Switch.jsx":"936cd5369dfc","components/forms/Textarea.jsx":"a7207820c02e","components/navigation/Accordion.jsx":"d4c8c11bd9c0","components/navigation/Breadcrumb.jsx":"ba51645aa65f","components/navigation/Footer.jsx":"fbe74e7ae1d9","components/navigation/Menu.jsx":"109184193a53","components/navigation/Navbar.jsx":"10f36549215c","components/navigation/Tabs.jsx":"23fc89bfe9e7","components/navigation/Ticker.jsx":"8ad7f742071c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SabinaDeweikDesignSystem_a9d1c1 = window.SabinaDeweikDesignSystem_a9d1c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
/**
 * Card — the color-block content card (dor-item / persona-card / sxsw-card).
 * Flat, square, filled with one brand hue. Pass accentBg/accentColor per section.
 */
function Card({
  title,
  description,
  accentBg = "var(--pop-preto)",
  accentColor = "var(--pop-branco)",
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: accentBg,
      color: accentColor,
      padding: "40px 32px",
      fontFamily: "var(--font-sans-pop)"
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontFamily: "var(--font-display-pop)",
      fontSize: "1.5rem",
      letterSpacing: "0.05em",
      marginBottom: 12,
      textTransform: "uppercase"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.05rem",
      lineHeight: 1.6,
      color: "inherit",
      opacity: 0.9,
      maxWidth: "none"
    }
  }, description), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
/** StatBlock — a bare oversized number with a one-line caption (7 · 100% · 0). */
function StatBlock({
  value,
  label,
  valueColor = "var(--pop-amarelo)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-pop)",
      color: valueColor,
      fontSize: "3.5rem",
      lineHeight: 1,
      marginBottom: 8
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans-pop)",
      color: "var(--text-subtle)",
      fontSize: "0.9rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/Testimonial.jsx
try { (() => {
/** Testimonial — rosa color-block quote in DM Serif Display italic, with a cite. */
function Testimonial({
  quote,
  cite,
  accentBg = "var(--pop-rosa)",
  accentColor = "var(--pop-preto)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: accentBg,
      color: accentColor,
      padding: "64px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "clamp(1.5rem,3vw,2.2rem)",
      lineHeight: 1.5,
      marginBottom: 24,
      maxWidth: "800px",
      color: "inherit"
    }
  }, quote), cite && /*#__PURE__*/React.createElement("cite", {
    style: {
      fontStyle: "normal",
      fontFamily: "var(--font-sans-pop)",
      fontSize: "0.9rem",
      fontWeight: 600,
      letterSpacing: "0.05em",
      opacity: 0.65,
      textTransform: "uppercase"
    }
  }, cite));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/** Badge — meta pill (dates, "GRATUITO", tags). Full pill, Bebas Neue, tracked. */
function Badge({
  variant = "dark",
  children
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-display-pop)",
    borderRadius: "var(--radius-pill)",
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    padding: "8px 16px"
  };
  const variants = {
    dark: {
      background: "var(--pop-preto)",
      color: "var(--pop-amarelo)"
    },
    light: {
      background: "var(--pop-amarelo)",
      color: "var(--pop-preto)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...variants[variant]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — campaign CTA pill. Two fills: dark (black pill, amarelo text) and
 * light (amarelo pill, black text). Reads tokens from styles.css.
 */
function Button({
  variant = "dark",
  size = "md",
  icon = false,
  disabled = false,
  as = "button",
  href,
  children,
  onClick
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6em",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    border: "none",
    fontFamily: "var(--font-display-pop)",
    letterSpacing: "0.1em",
    textDecoration: "none",
    borderRadius: "var(--radius-pill)",
    transition: "transform var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out)",
    whiteSpace: "nowrap"
  };
  const sizes = {
    md: {
      padding: "16px 40px",
      fontSize: "1.1rem"
    },
    lg: {
      padding: "20px 52px",
      fontSize: "1.3rem"
    }
  };
  const variants = {
    dark: {
      background: "var(--pop-preto)",
      color: "var(--pop-amarelo)"
    },
    light: {
      background: "var(--pop-amarelo)",
      color: "var(--pop-preto)"
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  const Tag = as === "a" ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    style: style,
    href: as === "a" ? href : undefined,
    disabled: as === "button" ? disabled : undefined,
    onClick: disabled ? undefined : onClick
  }, /*#__PURE__*/React.createElement("span", null, children), icon && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/PriceCard.jsx
try { (() => {
/**
 * PriceCard — the access/offer block. "free" = verde block (community offer),
 * "premium" = dark #1a1a1a block (companies / paid). Both pop.
 */
function PriceCard({
  variant = "free",
  tag,
  title,
  price,
  description,
  ctaLabel
}) {
  const premium = variant === "premium";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "64px 48px",
      background: premium ? "#1a1a1a" : "var(--pop-verde)",
      color: premium ? "var(--pop-branco)" : "var(--pop-preto)",
      border: premium ? "1px solid rgba(255,255,255,0.08)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display-pop)",
      fontSize: "0.85rem",
      letterSpacing: "0.25em",
      background: premium ? "var(--pop-amarelo)" : "var(--pop-preto)",
      color: premium ? "var(--pop-preto)" : "var(--pop-amarelo)",
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      display: "inline-block",
      marginBottom: 24
    }
  }, tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display-pop)",
      fontSize: "clamp(2rem,4vw,3.5rem)",
      lineHeight: 1,
      marginBottom: 16,
      color: "inherit"
    }
  }, title), price && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display-pop)",
      fontSize: "clamp(2.5rem,6vw,5rem)",
      lineHeight: 1,
      marginBottom: 24,
      color: premium ? "var(--pop-amarelo)" : "var(--pop-preto)"
    }
  }, price), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1rem",
      lineHeight: 1.7,
      marginBottom: 32,
      opacity: 0.85,
      color: "inherit",
      maxWidth: "none"
    }
  }, description), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: premium ? "light" : "dark",
    icon: true
  }, ctaLabel));
}
Object.assign(__ds_scope, { PriceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PriceCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
/** SectionLabel — the tracked all-caps Bebas eyebrow above every section title. */
function SectionLabel({
  color = "var(--pop-amarelo)",
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display-pop)",
      fontSize: "0.85rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color,
      display: "block"
    }
  }, children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const {
  useState
} = React;
/** Checkbox with label. Controlled (checked/onChange) or uncontrolled (defaultChecked). */
function Checkbox({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  id
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-ui)",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      borderRadius: "var(--radius-xs)",
      border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
      background: on ? "var(--accent)" : "var(--surface-inset)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-base), border-color var(--duration-base)"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-on-accent)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("input", {
    id: fieldId,
    type: "checkbox",
    checked: on,
    onChange: () => {},
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.95rem",
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** Text input with label, hint and error states. Reskins across dark/light themes via tokens. */
function Input({
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
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height-md)",
    lg: "var(--control-height-lg)"
  };
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%",
      fontFamily: "var(--font-ui)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
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
      width: "100%"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      color: error ? "var(--danger)" : "var(--text-subtle)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group. Pass options + value + onChange. */
function Radio({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  disabled = false
}) {
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const groupName = name || `radio-${Math.random().toString(36).slice(2, 7)}`;
  const select = v => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      fontFamily: "var(--font-ui)"
    }
  }, opts.map(o => {
    const on = current === o.value;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      role: "radio",
      "aria-checked": on,
      tabIndex: disabled ? -1 : 0,
      onClick: () => select(o.value),
      onKeyDown: e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          select(o.value);
        }
      },
      style: {
        width: 22,
        height: 22,
        flexShrink: 0,
        borderRadius: "var(--radius-circle)",
        border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
        background: "var(--surface-inset)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color var(--duration-base)"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: "var(--radius-circle)",
        background: "var(--accent)"
      }
    })), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      value: o.value,
      checked: on,
      onChange: () => {},
      disabled: disabled,
      style: {
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.95rem",
        color: "var(--text-primary)"
      }
    }, o.label));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState
} = React;
/** Native select styled to match Input, with a custom caret. */
function Select({
  label,
  hint,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  size = "md",
  disabled = false,
  id
}) {
  const [focused, setFocused] = useState(false);
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height-md)",
    lg: "var(--control-height-lg)"
  };
  const fieldId = id || (label ? `sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%",
      fontFamily: "var(--font-ui)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: fieldId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
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
      transition: "border-color var(--duration-base), box-shadow var(--duration-base)"
    }
  }, opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--accent-ink)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      color: error ? "var(--danger)" : "var(--text-subtle)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
const {
  useState
} = React;
/** Toggle switch. */
function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  id
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || (label ? `sw-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-ui)",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      width: 46,
      height: 26,
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: on ? "var(--accent)" : "var(--surface-inset)",
      border: `var(--border-width-control) solid ${on ? "var(--accent)" : "var(--border-strong)"}`,
      position: "relative",
      transition: "background var(--duration-base), border-color var(--duration-base)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "50%",
      left: on ? 22 : 2,
      transform: "translateY(-50%)",
      width: 20,
      height: 20,
      borderRadius: "var(--radius-circle)",
      background: on ? "var(--text-on-accent)" : "var(--text-subtle)",
      transition: "left var(--duration-base) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    id: fieldId,
    type: "checkbox",
    checked: on,
    onChange: () => {},
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.95rem",
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
const {
  useState
} = React;
/** Multi-line text field. */
function Textarea({
  label,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  rows = 4,
  disabled = false,
  id
}) {
  const [focused, setFocused] = useState(false);
  const fieldId = id || (label ? `ta-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%",
      fontFamily: "var(--font-ui)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    id: fieldId,
    rows: rows,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
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
      width: "100%"
    }
  }), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      color: error ? "var(--danger)" : "var(--text-subtle)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  items = []
}) {
  const [openIndex, setOpenIndex] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 800,
      margin: "0 auto"
    }
  }, items.map((item, i) => {
    const isOpen = openIndex === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i === 0 ? "1px solid var(--border-default)" : "none",
        borderBottom: "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpenIndex(isOpen ? null : i),
      style: {
        width: "100%",
        background: "none",
        border: "none",
        padding: "2.5rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-serif)",
        fontSize: "1.4rem",
        color: isOpen ? "var(--accent)" : "var(--text-primary)",
        transition: "color var(--duration-slow)"
      }
    }, item.question, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "1.5rem",
        color: "var(--accent)",
        fontWeight: 300,
        transition: `transform ${"var(--duration-slow)"}`,
        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 400 : 0,
        overflow: "hidden",
        transition: `max-height var(--duration-slow) var(--ease-cinematic)`
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        paddingBottom: "2.5rem",
        color: "var(--text-subtle)"
      }
    }, item.answer)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
/** Breadcrumb trail. Last item is the current page (not a link). */
function Breadcrumb({
  items = []
}) {
  const norm = items.map(i => typeof i === "string" ? {
    label: i
  } : i);
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "breadcrumb",
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      fontFamily: "var(--font-ui)",
      fontSize: "0.8rem"
    }
  }, norm.map((item, i) => {
    const last = i === norm.length - 1;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, last ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-primary)",
        fontWeight: 600
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href || "#",
      style: {
        color: "var(--text-subtle)"
      }
    }, item.label), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)"
      }
    }, "/"));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/** Site footer: wordmark + link columns + contact. */
function Footer({
  brand = "Sabina Deweik",
  tagline,
  columns = [],
  contact = []
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-raised-alt)",
      borderTop: "1px solid var(--border-default)",
      padding: "clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,2.5rem)",
      fontFamily: "var(--font-ui)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      gap: 48,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontSize: "1.6rem",
      color: "var(--accent-ink)",
      textTransform: "uppercase",
      letterSpacing: "0.02em"
    }
  }, brand), tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.85rem",
      color: "var(--text-subtle)",
      marginTop: 10
    }
  }, tagline)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 48
    }
  }, columns.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-label)",
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      marginBottom: 4
    }
  }, col.title), col.links.map(l => {
    const label = typeof l === "string" ? l : l.label;
    const href = typeof l === "string" ? "#" : l.href || "#";
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: href,
      style: {
        fontSize: "0.9rem",
        color: "var(--text-muted)"
      }
    }, label);
  }))), contact.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-label)",
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      marginBottom: 4
    }
  }, "Contato"), contact.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: "0.9rem",
      color: "var(--text-muted)"
    }
  }, c))))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Menu.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
/** Dropdown menu: a trigger button + a popover list of items. */
function Menu({
  label = "Menu",
  items = [],
  align = "left"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const norm = items.map(i => typeof i === "string" ? {
    label: i
  } : i);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block",
      fontFamily: "var(--font-ui)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "var(--surface-raised)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      padding: "9px 18px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer"
    }
  }, label, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-base)"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      [align]: 0,
      minWidth: 200,
      zIndex: 30,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      padding: 6,
      overflow: "hidden"
    }
  }, norm.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: "var(--border-default)",
      margin: "6px 0"
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      it.onClick && it.onClick();
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      textAlign: "left",
      background: "none",
      border: "none",
      borderRadius: "var(--radius-sm)",
      padding: "10px 12px",
      fontSize: "0.9rem",
      cursor: "pointer",
      color: it.danger ? "var(--danger)" : "var(--text-primary)",
      fontFamily: "var(--font-ui)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--surface-raised-hover)",
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, it.label))));
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Menu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
const {
  useState
} = React;
/** Top navigation bar with wordmark, links and a CTA. */
function Navbar({
  brand = "Sabina Deweik",
  links = [],
  cta,
  active,
  sticky = false
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: sticky ? "sticky" : "relative",
      top: 0,
      zIndex: 40,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      padding: "16px clamp(1.25rem, 5vw, 2.5rem)",
      background: "var(--surface-overlay)",
      borderBottom: "1px solid var(--border-default)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      fontFamily: "var(--font-ui)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontSize: "1.5rem",
      letterSpacing: "0.02em",
      color: "var(--text-primary)",
      textTransform: "uppercase"
    }
  }, brand), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, links.map(l => {
    const label = typeof l === "string" ? l : l.label;
    const href = typeof l === "string" ? "#" : l.href || "#";
    const on = active === label;
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: href,
      style: {
        fontSize: "0.9rem",
        fontWeight: 500,
        color: on ? "var(--accent-ink)" : "var(--text-muted)",
        letterSpacing: "0.02em",
        paddingBottom: 2,
        borderBottom: on ? "2px solid var(--accent)" : "2px solid transparent",
        transition: "color var(--duration-base)"
      }
    }, label);
  }), cta && /*#__PURE__*/React.createElement("button", {
    style: {
      background: "var(--accent)",
      color: "var(--text-on-accent)",
      border: "none",
      borderRadius: "var(--button-radius)",
      padding: "10px 22px",
      fontFamily: "var(--font-heading)",
      fontSize: "0.95rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, cta)));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
/** Tab bar. variant "line" (underline) or "pill". */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = "line"
}) {
  const items = tabs.map(t => typeof t === "string" ? {
    value: t,
    label: t
  } : t);
  const [internal, setInternal] = useState(defaultValue || items[0] && items[0].value);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  if (variant === "pill") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        gap: 4,
        padding: 4,
        background: "var(--surface-inset)",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-ui)"
      }
    }, items.map(t => {
      const on = current === t.value;
      return /*#__PURE__*/React.createElement("button", {
        key: t.value,
        onClick: () => select(t.value),
        style: {
          border: "none",
          borderRadius: "var(--radius-pill)",
          padding: "8px 18px",
          fontSize: "0.85rem",
          fontWeight: 600,
          cursor: "pointer",
          background: on ? "var(--accent)" : "transparent",
          color: on ? "var(--text-on-accent)" : "var(--text-muted)",
          transition: "background var(--duration-base), color var(--duration-base)"
        }
      }, t.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      borderBottom: "1px solid var(--border-default)",
      fontFamily: "var(--font-ui)"
    }
  }, items.map(t => {
    const on = current === t.value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => select(t.value),
      style: {
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
        transition: "color var(--duration-base), border-color var(--duration-base)"
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Ticker.jsx
try { (() => {
/** Ticker — the amarelo marquee banner with ★ separators. Infinite horizontal scroll. */
function Ticker({
  items = [],
  speed = 22
}) {
  const track = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      overflow: "hidden",
      background: "var(--pop-amarelo)",
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes dc-ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      width: "max-content",
      whiteSpace: "nowrap",
      animation: `dc-ticker-scroll ${speed}s linear infinite`
    }
  }, track.map((item, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",
      fontSize: "1.1rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontFamily: "var(--font-display-pop)",
      color: "var(--pop-preto)"
    }
  }, item, /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 12px"
    }
  }, "\u2605")))));
}
Object.assign(__ds_scope, { Ticker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Ticker.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.PriceCard = __ds_scope.PriceCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Ticker = __ds_scope.Ticker;

})();
