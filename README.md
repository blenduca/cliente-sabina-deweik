# Sabina Deweik — ativos web

Páginas de marketing, vendas e produto da Sabina Deweik. Este README é o guia de desenvolvimento para o
time de design.

**Pré-visualização (validação):** https://blenduca.github.io/cliente-sabina-deweik/

O `index.html` da raiz é o **hub**: um índice de todos os ativos com o estado de cada um. É o que a
Pages serve na URL acima.

---

## Os ativos

| Página | Pasta | O que é |
|---|---|---|
| Linktree | `2-motor-de-crescimento/marketing/linktree/` | Página de links da bio |
| LP da Comunidade | `2-motor-de-crescimento/marketing/lp-comunidade-gratuita/` | Comunidade gratuita "Futuro Com Sabina" |
| Funil do Curso | `2-motor-de-crescimento/vendas/funil-curso-low-ticket/` | Curso "O Mapa das Convergências" (low-ticket) |
| Protótipo da Plataforma | `3-produto-escalavel/design-plataforma/` | Área de membros (protótipo) |
| Painel de Resultados | `4-gestao-de-resultados/painel/` | Torre de controle (interno) |

Cada pasta é a **raiz do próprio deploy** — os caminhos internos são relativos, então a página funciona
tanto aberta localmente quanto num subcaminho da Pages.

---

## Rodar localmente

As páginas são estáticas (HTML/CSS/JS, sem build). Suba um servidor estático na raiz do repo:

```bash
npx serve .
```

Abra `http://localhost:3000/` para o hub, ou vá direto a uma página, ex.:
`http://localhost:3000/2-motor-de-crescimento/marketing/lp-comunidade-gratuita/`.

> **Formulários por ambiente.** Em `localhost` os formulários tentam um serviço de ingestão local
> (`localhost:8787`). No host de validação (`*.github.io`) o envio fica **desativado** — é só design.
> Só no domínio final o cadastro vira lead de verdade.

O **Painel** busca dados de um serviço de ingestão local. Sem esse serviço no ar ele mostra "sem
conexão" — é o comportamento esperado aqui; ele é ferramenta interna, não página de público.

---

## Design system — não editar o `ds/` à mão

A fonte da verdade da marca (cores, fontes, espaçamentos) vive em
`recursos/design-system/sistema/tokens/`. Cada ativo recebe uma **cópia gerada** em `<ativo>/ds/`,
porque um `@import` para fora da pasta do ativo morreria em produção.

Mudou a marca? Edite a fonte e regenere:

```bash
npm run sync:tokens
```

Isso reescreve todos os `ds/` (inclusive o da raiz, usado pelo hub). **Nunca edite arquivos dentro de
`ds/`** — eles estão marcados `GENERATED` e são sobrescritos.

---

## Não versionar

- **Base de leads** (`expert-list-*.csv`) — dado pessoal, fica fora do repo (já no `.gitignore`).
- **Segredos** (tokens, chaves) — não entram no repositório.
- Conteúdo pesado (vídeo, PDF, PSD) — fica no Drive/CMS; o repo guarda só índices e links.
