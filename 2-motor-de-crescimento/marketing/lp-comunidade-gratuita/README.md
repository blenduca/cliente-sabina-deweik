# LP — comunidade gratuita "Futuro Com Sabina"

Landing page **perene** da comunidade gratuita (isca digital de topo de funil) + página de obrigado.
Relançamento de 2026-07-18: substituiu a versão anterior, que vendia a cobertura do SXSW 12–18/mar/2026
(evento datado — a página estava morta desde março).

**Origem:** github.com/blenduca/sabinadeweik-lp (legado Blenduca).

## O que é

Captação para um **duplo canal**, com um cadastro só:

| Canal | Papel | Cadência |
|---|---|---|
| Grupo de WhatsApp | tempo real — bastidores, sinais quentes, conversa | sem frequência prometida |
| Newsletter "Me Leva Para O Futuro" (Substack) | leitura longa — contexto e sentido | quinzenal |
| Eventos | a comunidade acompanha por dentro | conforme calendário |

A copy resolve o duplo canal com verbos não-sobreponíveis: **ver** (WhatsApp) × **entender** (newsletter).

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | LP (10 seções) + modal de cadastro de 2 campos |
| `obrigado.html` | pós-cadastro: CTA único de entrada no WhatsApp + valor imediato |
| `assets/` | asterisco oficial + fotos locais (avif + webp) |

**Deploy: estático puro, sem build.** Não há `package.json` — o README anterior afirmava "Vite" e estava
errado. Na Vercel, Root Directory = esta pasta. **Não copiar o `vercel.json` do `funil-curso-low-ticket`:**
o `rewrites` catch-all para `/index.html` faria toda rota cair na home e quebraria `/obrigado`.

## Fluxo de conversão

```
LP → modal (nome + e-mail) → POST webhook n8n → obrigado.html → clique no grupo do WhatsApp
```

O formulário tem 2 campos de propósito (1 campo converte ~18%, 4 campos ~10%). O WhatsApp é capturado
como **clique** na página de obrigado, não como campo.

A métrica que importa **não é cadastro, é a taxa cadastro → WhatsApp** — é ela que valida a arquitetura
de duplo canal. Ganchos de evento já estão no código (`data-origem` por CTA em `index.html`,
`entrou_whatsapp` em `obrigado.html`), aguardando GA4/Meta Pixel — hoje não há analytics em nenhum ativo.

## Contrato do webhook (⚠️ não quebrar)

O fluxo n8n em `automacao.bagents.cloud` **não está versionado no repo** — o payload preserva o contrato
antigo. Os campos removidos do formulário seguem como string vazia de propósito:

```json
{ "nome": "…", "email": "…", "whatsapp": "", "cidade": "", "cargo": "", "empresa": "",
  "como_conheceu": "", "interesse": "",
  "origem": "LP Comunidade Futuro Com Sabina", "tipo": "Entrar na comunidade", "cta": "hero|agenda|final|sticky" }
```

`tipo` é a chave que discrimina os fluxos no n8n — **preservada literalmente**. `origem` mudou (era
`"Landing Page SXSW 2026"`): conferir se algum nó filtra por essa string antes de publicar.

O envio agora checa `response.ok` — antes, um 500 do n8n mostrava tela de sucesso e o lead se perdia
em silêncio.

## Manutenção

- **Agenda** (`section.agenda` em `index.html`) — atualizar o próximo evento e mover o anterior para
  "por onde a comunidade já passou". Próximo registrado: **Rio Innovation Week 2026, 04/08**.
  O card do próximo evento também aparece em `obrigado.html` — atualizar nos dois lugares.
- **"Workslop"** (seção dos 3 vilões) é um termo com prazo de validade curto — revisar em ~6 meses.
- Design system: paleta oficial em `recursos/design-system/assets/cores.md`. Atenção: `sistema/readme.md`
  e `sistema/SKILL.md` descrevem a paleta POP antiga e **estão desatualizados**.

## Pendências

- **Domínio.** A LP ainda não tem URL publicada (`visao2026.sabinadeweik.com.br` é do funil do curso).
  Enquanto isso, o card do linktree aponta direto ao Substack, o que pula o cadastro e não entrega o
  WhatsApp — ver o TODO em `../linktree/index.html`.
- **Bloco B2B removido** (palestra/workshop/imersão + o botão do PDF de curadoria, que apontava para um
  arquivo inexistente). A página tem propósito único; o B2B segue no linktree e merece página própria.
- **Modo do grupo de WhatsApp.** A copy promete "é onde você pode responder" — confirmar que o grupo
  não está em modo somente-admin antes de publicar.
- **E-mail de boas-vindas** deve repetir o link do WhatsApp como CTA único, para recuperar quem fechou
  a `obrigado.html` sem clicar.
- **Teste do webhook** com um lead real ainda não foi feito (evitei poluir o n8n do cliente).
