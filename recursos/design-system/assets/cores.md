# Cores — paleta codificada (Sabina Deweik)

> Paleta oficial (do guia enviado pela Sabina), extraída por amostragem de pixel. Espelha `../design-system.md`
> e `../sistema/tokens/colors.css`. Fundo de referência para contraste: creme `#F7F2EC`.

## Paleta da marca
| Nome | Hex | rgb | Papel | Ink (texto/creme) |
|---|---|---|---|---|
| Âmbar | `#E9974E` | 233,151,78 | accent / CTA / destaque | `#B26A24` |
| Verde | `#50704B` | 80,112,75 | brand-primary / hero | `#3A5236` |
| Terracota | `#D4866F` | 212,134,111 | apoio quente / secundária | `#B0573D` |
| Azul acinzentado | `#ADC4CA` | 173,196,202 | apoio frio / info | `#4F6E76` |

## Neutros
| Nome | Hex | Uso |
|---|---|---|
| Creme | `#F7F2EC` | fundo (surface-bg) |
| Preto | `#0D0D0D` | texto primário |
| Branco | `#FAFAFA` | superfície elevada |

## Gradiente-assinatura
`linear-gradient(160deg, #ECAA4C 0%, #D6886D 38%, #6C8972 68%, #99B5B6 100%)` — âmbar → terracota → verde → azul.

## Contraste (sobre creme #F7F2EC)
| Cor | Como texto | Observação |
|---|---|---|
| Preto `#0D0D0D` | ✅ AA/AAA | texto de corpo |
| Verde-ink `#3A5236` | ✅ AA | ok para texto e títulos |
| Âmbar-ink `#B26A24` | ⚠️ AA só em texto grande/labels | usar o hue cheio só em blocos/ícones, não em corpo pequeno |
| Terracota-ink `#B0573D` | ⚠️ AA em texto grande | idem |
| Azul-ink `#4F6E76` | ✅/⚠️ ~AA | ok para labels; conferir em corpo pequeno |

> Hues cheios (âmbar/terracota/azul) são para **blocos de cor, botões e ícones** — para texto pequeno, usar o `*-ink`.
> Validar com ferramenta (Lighthouse/axe) antes de publicar.
