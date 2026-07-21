---
titulo: Design System — Sabina Deweik
area: design-system
status: em-validacao
entradas:
  - recursos/design-system/assets/paleta-guia.jpeg   # guia de cores oficial da Sabina
  - recursos/design-system/sistema/                   # DS existente (Claude Design), paleta corrigida
  - https://sabinadeweik.com/                          # posicionamento/tom
skill: design-system
validado_por: null
data: 2026-07-17
portal: false
---

# Design System — Sabina Deweik

> Fonte da verdade **VISUAL**. É o que o Claude Code lê para construir LP/funil/criativo.
> **Portão:** nenhum trabalho de design começa sem isto validado. Sistema aplicado em `sistema/` (tokens + componentes).
> **Página navegável (entrega final):** `design-system.html` — showcase estilo rail-nav com capa, cores, tipografia, voz, componentes e fotografia.
> **Status: em-validacao** — paleta corrigida para o guia oficial; falta o "OK" conjunto do mapeamento de papéis.

Marca: **Sabina Deweik** — futurista, caçadora de tendências, palestrante (SXSW/Web Summit), coach ontológica.
Assinatura: *"Me Leva pro Futuro™"* · essência: *"rastrear, ler e digerir o futuro"*. Tom: prospectivo, investigativo, humanista.
Estética-alvo: **terrosa e sofisticada** (não a POP saturada antiga) — color-blocking editorial sobre creme.

## Cores (paleta oficial — do guia da Sabina)

| Token | Hex | Papel | Ink (texto sobre creme) |
|---|---|---|---|
| âmbar | **#E9974E** | accent / CTA / destaque quente | `#B26A24` |
| verde | **#50704B** | brand-primary (bloco de marca / hero) | `#3A5236` |
| terracota | **#D4866F** | brand-secondary (apoio quente) | `#B0573D` |
| azul acinzentado | **#ADC4CA** | apoio frio / info / superfícies calmas | `#4F6E76` |
| creme | **#F7F2EC** | fundo (surface-bg) | — |
| preto | **#0D0D0D** | texto primário | — |
| branco | **#FAFAFA** | superfície elevada | — |

**Gradiente-assinatura:** `linear-gradient(160deg, #ECAA4C, #D6886D, #6C8972, #99B5B6)` — âmbar → terracota → verde → azul (usar em heros/momentos de destaque).

> ⚠️ O que estava errado: o DS usava a paleta "POP" saturada (`#00A651`, `#5BC9D9`, `#F5D732`, `#F2A7C3`, `#E8683A`) puxada de uma LP de campanha — **não** o guia de marca. Corrigido em `sistema/tokens/colors.css` (nomes `--pop-*` agora aliasam a paleta da marca; nada quebra).

## Tipografia (mantida — estrutura já boa)

- **Display / títulos:** `Bebas Neue` (condensada, caixa-alta, com tracking) — `--font-display-pop`.
- **Corpo / UI:** `Space Grotesk` (300–700) — `--font-sans-pop`.
- **Acento / assinatura:** `DM Serif Display` (itálico) — palavra-assinatura dentro do título Bebas.
- Escala: `--text-display` clamp(3.5rem, 9vw, 8rem) → `--text-caption` 0.75rem. Leading 0.95–1.8. Tracking label 0.22em.

## Espaçamento, grid, efeitos (mantidos)

- Container 1080px (wide 1280 / narrow 720); padding de seção 100px; gap entre blocos **2px** (color-blocking, sem hairline).
- Escala `--space-1` (4px) → `--space-10` (128px). Raios: `--button-radius` = pill (100px); blocos quadrados.
- Sombras suaves; movimento contido (ticker + ★ girando); easing cinematográfico.

## Componentes-base (em `sistema/components/`)

Core (Button pill, Badge, SectionLabel) · Content (Card, PriceCard, StatBlock, Testimonial) ·
Forms (Input, Textarea, Select, Checkbox, Radio, Switch) · Navigation (Navbar, Menu, Tabs, Accordion, Breadcrumb, Footer, Ticker).
Todos consomem os **tokens semânticos** (`--accent`, `--brand-primary`, …) → herdam a paleta corrigida automaticamente.

## Do / Don't

- **Do:** color-blocking editorial com a paleta terrosa; âmbar para CTA; verde como marca; gradiente-assinatura em heros; Bebas caixa-alta + palavra em DM Serif itálico.
- **Don't:** usar a paleta POP saturada antiga; azul-marinho do site atual; misturar mais de 3 blocos de cor por seção; hairlines (usar gap de 2px).

## Pendências de validação (o "OK" conjunto)
- [ ] Confirmar o **mapeamento de papéis** (âmbar=CTA, verde=marca, terracota=apoio quente, azul=apoio frio).
- [ ] Definir **danger** funcional (hoje terracota-ink; um vermelho real pode ser melhor para erro de formulário).
- [ ] Logo/wordmark: hoje o nome em Bebas Neue faz as vezes de marca (sem arquivo de logo).
