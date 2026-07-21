# Linktree — página inicial de marketing (Sabina Deweik)

Hub de links (topo de marketing): WhatsApp (orçamento de palestra/treinamento), Substack, Visão 2026, Instagram, LinkedIn.
Site estático (HTML/CSS/JS).

- **Origem:** github.com/blenduca/sabina-linktree (legado Blenduca).
- **Deploy:** estático; na Vercel apontar Root Directory para esta pasta.
- Papel no funil: **marketing / topo** (distribui para os demais ativos).

## Estrutura: um banner por oferta, uma cor por banner

A pilha percorre a paleta da marca de propósito — quente no topo (proximidade), frio no meio
(análise), preto no fim (fechamento). Cada banner tem **uma** cor dominante; nenhum repete a do vizinho.

| # | Banner | Cor | Papel |
|---|---|---|---|
| 1 | Palestras & Media Kit (`.hero`) | verde → azul + faixa do **gradiente-assinatura** | **principal** — é o que gera receita |
| 2 | Futuro Com Sabina (`.banner--comunidade`) | terracota / âmbar (quente = comunidade) | isca gratuita |
| 3 | O Mapa das Convergências (`.banner--curso`) | verde | curso pago |
| 4 | Coluna na VejaSP (`.banner--midia`) | azul (frio = leitura/análise) | autoridade |
| 5 | Fale com a Sabina (`.contatos`) | preto + faixa do gradiente | redes e contato |

**Hierarquia é deliberada:** o hero tem `min-height` maior, título maior e mais respiro; os demais
banners são menores (`.banner { min-height: 300px }`). Se aumentar os outros, o principal deixa de
se destacar sozinho.

O **gradiente-assinatura** (`--gradient-assinatura`, âmbar → terracota → verde → azul) percorre a
paleta inteira e aparece como faixa fina no topo do banner 1 e do 5, emoldurando a página. Como
fundo de texto ele não passaria em contraste — por isso é só assinatura, nunca superfície.

### Regras de contraste aprendidas na prática

- **No banner da comunidade os acentos são creme, não âmbar.** Sobre fundo quente o âmbar
  desaparece; o creme é que pulsa. Vale para selo, eyebrow, `<b>` e CTA.
- **No mobile (≤640px) o véu vira vertical.** O texto passa a ocupar a largura toda e o degradê
  horizontal deixaria a leitura sobre a parte clara da foto.

### Banners com foto (`.banner`)

Comunidade, curso e mídia usam a **mesma base** `.banner`. Ao mexer nela, confira os três.

| | Comunidade | Curso | Mídia |
|---|---|---|---|
| Foto | `comunidade-sabina.webp` | `curso-sabina.webp` | `midia-sabina.webp` |
| Layout | full-bleed | full-bleed | **retrato à direita (48%)** |
| Enquadramento | `center 66%` (mantém a plateia) | `center 20%` | `center 16%` |

`midia-sabina` é recortada da arte da VejaSP (`SabinaVejaSP.jpg`, 394×507) **para remover os textos
embutidos** — o badge vermelho, o "COLUNISTA @VEJASP" e a tarja com o nome — que colidiriam com a
copy do banner. Como a origem é pequena, ela **não** vai full-bleed: seria esticada ~2,8×. Vira
retrato à direita com a borda esquerda dissolvida por `mask-image`.

- **Sem preço no banner do curso** (decisão de 2026-07-18) — o valor aparece só na LP de vendas.
  O nome do curso é o título; o benefício ("uma nova forma de ler o mundo") desceu para o corpo.

### Media Kit

Aponta para o PDF **hospedado no site** (`sabinadeweik.com/_files/ugd/…`, ~31 MB) — o mesmo arquivo que
a página de palestras oferece. **Não versionar esse PDF aqui:** sozinho ele mais que dobraria o repo
(`.git` inteiro tem ~30 MB) e blob em git é irreversível. Ver `raw/links.md` para o espelho na CDN.

## Pendências

- O banner da comunidade aponta para o **Substack**, o que pula o cadastro e não entrega o WhatsApp —
  redirecionar para a LP (`../lp-comunidade-gratuita/`) assim que ela tiver domínio. Ver `raw/links.md`.
- Não há mais agregador de "entrevistas e podcasts" na página: só a coluna da VejaSP em destaque.
