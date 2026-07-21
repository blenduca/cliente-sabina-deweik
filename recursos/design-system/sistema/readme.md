# Sabina Deweik — Design System

A single-identity design system extracted from the **Me Leva pro Futuro™** campaign — the free community offering of live, real-time curation of SXSW 2026 (Austin, March 12–18) by **Sabina Deweik**, Brazilian futurist, coolhunter and behavior researcher (25 years; pioneer of coolhunting in Brazil, ex-partner of Future Concept Lab Milan, SXSW 2022 speaker).

The visual identity is **pop color-blocking**: saturated hues cycling section-by-section on near-black and cream, condensed all-caps Bebas Neue headlines, Space Grotesk for copy, and a DM Serif Display italic accent word as the one signature move. Bold, punchy, zine/festival-flyer energy — flat by design, no gradients, no photography, no film-grain.

## Source

- `uploads/lp-me-leva-pro-futuro.html` — the complete, self-contained campaign landing page. **Ground truth for every token, font, color and layout rule in this system.** Colors, type scale, spacing, the ticker and the color-block grids were all read 1:1 from it.
- `uploads/Curadoria Sabina Deweik - SXSW 2026.pdf` — sales deck used **only for content** (credentials, program facts, Sabina's words). No reusable visual system inside.

> An earlier version of this system also carried a second "Visão 2026" editorial-luxury mode (dark navy + champagne). It has been fully removed — this system is now Me Leva pro Futuro only.

## Content fundamentals

**Language:** Brazilian Portuguese (pt-BR). **Address:** direct "você"; Sabina's bio copy is first-person.

**Signature rhetorical device — reframe-through-negation** ("X não é Y, é Z"): *"Isso não é um resumo. É outra coisa."* · *"Tendência todo mundo comenta. Discernimento é escolha."* The single most load-bearing copy move — use deliberately, not on every line.

**Sentence rhythm:** short, declarative, stacked for percussion ("O feed não para." / "O ruído virou rotina."). Long flowing paragraphs are reserved for Sabina's own bio/credibility copy.

**Casing:** section eyebrows are ALL CAPS with wide tracking. Headlines are caps by Bebas Neue's nature.

**Emphasis:** **bold** and color changes; plus DM Serif Display *italic* for one accent word ("O que acontece em *Austin*..."). No underlines except one deliberate `<strong>` underline in the bio block.

**Numbers as proof, not decoration:** stats are bare — a big number over a one-line caption (7 dias · 100% ao vivo · 0 de ruído). Never wrapped in an icon or chrome beyond the color block.

**Vibe:** confident, editorial, anti-hype ("sem hype, sem ruído, sem superficialidade"). Positions Sabina as the filter between noise and signal. Scarcity appears once, briefly, near the final CTA.

## Visual foundations

**Palette (pop):** six saturated hues — verde `#00A651`, rosa `#F2A7C3`, laranja `#E8683A`, azul `#5BC9D9`, amarelo `#F5D732` — color-blocking section-by-section over preto `#0D0D0D`, branco `#FAFAFA`, creme `#F7F2EC`. Amarelo is the signature accent/highlight. Ships full dark (default) + light (`[data-theme="light"]`) semantic themes.

**Type:** Bebas Neue (condensed all-caps headlines + tracked eyebrows), Space Grotesk 300–700 (body/UI), DM Serif Display italic (one accent word). All three were the exact families in the source — self-hosted woff2, Latin subset (covers pt-BR diacritics).

**Backgrounds:** pure flat color. Zero gradients, textures, or photography — the color blocking *is* the texture.

**Borders & gaps:** no hairline borders. Color blocks touch via a 1–2px background gap (grid `gap`), never a stroked border. Sections can open with a 4px amarelo top-stripe.

**Corner radii:** color-block cards and image containers are square (0px); buttons and meta badges are full pills (`100px`).

**Shadows:** none on static elements — flatness is the point. Shadow tokens exist only for elevated UI (overlays/menus) and the amarelo focus ring on form controls.

**Motion:** exactly two — an infinite horizontal ticker marquee and one decorative spinning ★. Smooth in/out easing (`--ease-out`, `--ease-smooth`), never bounce or overshoot. Hover: CTA swaps black↔amarelo + `translateY(-2px)`.

**Layout:** 1080px container, 100px fixed vertical section padding, dense 2/3/4-column color-block grids.

## Iconography

No formal icon system. Iconographic duty is carried by unicode glyphs: **→** (every CTA), **★** (flourish, spinning accent, bullet), **+ / ✓ / ✕** (accordion toggle / positive & negative list bullets). A small, closed emoji set (🎓 🌍 📡 🏛️) marks Sabina's four credential categories — do not extend it.

**No logo/brand mark was supplied.** Everywhere a mark would go, "Sabina Deweik" is set in Bebas Neue (see `guidelines/brand-wordmark.html`). If a real logo exists, attach it and refresh.

## Components

- **core/** — Button, Badge, SectionLabel
- **content/** — Card, StatBlock, Testimonial, PriceCard
- **navigation/** — Ticker, Accordion, Navbar, Tabs, Breadcrumb, Menu, Footer
- **forms/** — Input, Textarea, Select, Checkbox, Radio, Switch

Each was extracted as a *recurring pattern already present in the source page* (every CTA pill, meta badge, color-block card, stat, quote block, price block, marquee and FAQ). Nothing invented beyond what the page repeats.

## Page anatomy (extracted from Me Leva pro Futuro™)

Long-form pages follow this 10-section rhythm — see `guidelines/brand-page-anatomy.html` for the full breakdown:

1. **Ticker** — amarelo marquee, dates + phrases.
2. **Hero** — verde block, oversized H1 with one `<em>` accent word, badges row, CTA pill; radial + giant ★ watermark decoration.
3. **Problem (dor)** — creme background, eyebrow + bold lede, 2×2 color-block grid (each block a distinct hue), italic laranja pull-quote closing the section.
4. **Context/stats** — rosa background, H2, 3-col stat/credential cards, dark `#1a1a1a` quote block with an external source `<cite>`.
5. **Credibility** — laranja background, 2-col split: bio copy left, 2×2 credential grid right (creme cards on preto grid gap).
6. **How it works** — near-black `#111111` with a 4px amarelo top-stripe, 4-col process cards.
7. **Social proof** — preto with a rosa top-stripe, quote block (rosa fill) + 3-col bare-number stat row (`#1a1a1a` cards).
8. **Offer** — preto background, 2-col PriceCard grid (free/verde vs premium/dark).
9. **Final CTA** — full amarelo block, centered, oversized H2, big pill CTA, scarcity badge below.
10. **Footer** — preto, wordmark + tagline left, contact info right, hairline top-border.

Recurring rules: sections alternate through the six brand hues in sequence (never repeat a neighbor); grids always use `--block-gap` (2px), never a stroked border; only sections 6–8 use a top-border-accent stripe to mark a tonal shift; exactly one quote block per major section, always in DM Serif Display italic.

## Caveats

- No logo/brand mark was supplied — name-in-type stands in.

## Index

- `readme.md` — this file · `styles.css` — import-only entry point
- `tokens/` — colors, fonts, typography, spacing, effects, base
- `assets/fonts/` — self-hosted woff2 (DM Serif Display, Space Grotesk, Bebas Neue)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand, Page Anatomy)
- `components/` — React primitives + card demos
- `SKILL.md` — portable skill definition
