---
titulo: Auditoria de instrumentação dos funis (atribuição → Expert List)
area: 2-motor-de-crescimento/marketing
status: em-validacao
entradas:
  - 2-motor-de-crescimento/vendas/funil-curso-low-ticket/script.js
  - 2-motor-de-crescimento/marketing/lp-comunidade-gratuita/index.html
  - plataforma/docs/SPEC.md
  - plataforma/db/migrations/0005_expert_list.sql
skill: null
validado_por: null
data: 2026-07-19
portal: true
---

# Auditoria de instrumentação dos funis

Pergunta: **os funis do curso low-ticket e da comunidade cadastram o lead na Expert List com UTM?**

> **Atualização 19/07/2026 — passo 1 aplicado.** Os dois funis agora enviam atribuição
> (`atribuicao.js`, primeiro toque persistido + `visitor_id` + `event_id`). O veredito abaixo
> descreve o estado **anterior** à correção e fica registrado como diagnóstico. O que ainda falta
> está nos passos 2 a 6 — em especial: **o dado já sai do navegador, mas ainda não é gravado na
> Expert List**, porque o fluxo n8n não está versionado.

## Veredito (estado em 19/07/2026, antes da correção)

**Não.** Os dois funis capturam o lead e o entregam ao n8n, mas nenhum dos dois envia atribuição.
Das 42 colunas da Expert List, **seis nascem permanentemente vazias**: `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term`, `referrer`.

A consequência não é cosmética. Toda a fatia "por campanha / por origem" da Torre de Controle —
CPL por campanha, ROAS por criativo, qual anúncio traz Campeão e qual traz Perdido — é
**impossível de calcular a partir do dado que está sendo gravado hoje**. Ligar tráfego e analytics
depois não recupera nada: atribuição não é retroativa. Cada dia rodando assim é um dia de leads
sem origem, para sempre.

---

## O que cada funil faz hoje

| | Curso — O Mapa das Convergências | Comunidade — Futuro Com Sabina |
|---|---|---|
| Campos do formulário | nome · e-mail · WhatsApp | nome · e-mail |
| Destino | webhook n8n `a286c9fc…` | **o mesmo** webhook `a286c9fc…` |
| Discriminação | só o campo `tipo` | só o campo `tipo` |
| UTM no payload | ❌ nenhuma | ❌ nenhuma |
| UTM em algum lugar | repassa ao querystring da Kiwify (`script.js:203-206`) | ❌ em lugar nenhum |
| Persistência de 1º toque | ❌ morre no refresh | ❌ inexistente |
| Consentimento LGPD | ❌ não coletado | ❌ não coletado |
| `visitor_id` / `event_id` | ❌ | ❌ |
| `fbclid` / `gclid` / `fbp` / `fbc` | ❌ | ❌ |
| GA4 / Pixel | só ganchos `gtag` inertes | ❌ |
| Trata erro de envio | não (`.catch()` silencioso, proposital) | sim (checa `response.ok`) |

### Detalhes que importam

**O curso chega perto e não fecha.** `script.js:203-206` lê as UTMs da URL e as repassa para a
Kiwify. Ou seja: o dado **existe no navegador no momento do envio** e simplesmente não é colocado
no `payload` que vai para o n8n (`script.js:179-186`). É a correção mais barata de todo o backlog —
o valor já está na mão.

**A comunidade não tem nada.** `grep` por `utm|gclid|fbclid|URLSearchParams|localStorage` em
`lp-comunidade-gratuita/index.html` não retorna uma linha.

**Sem primeiro toque, o pouco que houver será errado.** Sem persistir em `localStorage`, quem
chega por anúncio, sai, e volta pelo Instagram no dia seguinte é gravado como orgânico. O anúncio
que pagou pelo lead fica sem crédito — o erro de atribuição mais comum e o que mais distorce
decisão de verba.

**Um webhook para dois funis, sem fluxo versionado.** `ia/n8n/` tem só `.gitkeep`. Não há como
auditar se o roteamento por `tipo` existe. O README do curso já registra o risco: se o fluxo não
rotear `tipo: "Checkout Curso"`, comprador cai na régua da comunidade.

**O desenho contraria o SPEC.** `plataforma/docs/SPEC.md:72-107` define `POST` em `pz.lead_intake`
com `tenant_slug`, `ativo_slug`, `formulario`, `visitor_id`, `consentimento`, honeypot
`empresa_site`, `event_id` e o bloco `attr.ft`/`attr.lt`. Os dois funis seguem o desenho antigo
`browser → n8n`, que o próprio SPEC (linha 119) declara invertido.

---

## Correção

### 1. Um módulo de atribuição compartilhado (resolve 80% do problema)

Um arquivo usado pelos dois funis. Grava o **primeiro toque** de forma imutável e o **último toque**
a cada visita — que é exatamente o par `ft`/`lt` que a migration `0004` já sabe consumir.

```js
/* atribuicao.js — primeiro toque imutável + último toque por visita */
const CHAVE_FT = 'pz_ft', CHAVE_LT = 'pz_lt', CHAVE_VID = 'pz_vid';
const CAMPOS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term',
                'gclid','fbclid'];

function tocoAtual() {
  const q = new URLSearchParams(location.search);
  const t = { referrer: document.referrer || '', em: new Date().toISOString() };
  CAMPOS.forEach((c) => { const v = q.get(c); if (v) t[c] = v; });
  return t;
}

export function atribuicao() {
  const atual = tocoAtual();
  /* Primeiro toque: grava UMA vez e nunca mais. É o que dá crédito à mídia
     que realmente trouxe a pessoa, mesmo que ela volte por outro caminho. */
  if (!localStorage.getItem(CHAVE_FT)) {
    localStorage.setItem(CHAVE_FT, JSON.stringify(atual));
  }
  /* Último toque: sobrescreve, mas só quando a visita traz atribuição nova —
     senão uma volta direta apagaria o crédito da campanha anterior. */
  const temUtm = CAMPOS.some((c) => atual[c]);
  if (temUtm) localStorage.setItem(CHAVE_LT, JSON.stringify(atual));

  let vid = localStorage.getItem(CHAVE_VID);
  if (!vid) { vid = crypto.randomUUID(); localStorage.setItem(CHAVE_VID, vid); }

  return {
    visitor_id: vid,
    ft: JSON.parse(localStorage.getItem(CHAVE_FT)),
    lt: JSON.parse(localStorage.getItem(CHAVE_LT) || localStorage.getItem(CHAVE_FT)),
  };
}
```

No envio, dos dois funis:

```js
const attr = atribuicao();
const payload = {
  ...camposDoFormulario,
  origem, tipo, cta,
  attr,                                  // ← ft/lt/visitor_id
  consentimento: chkConsent.checked,     // ← campo novo no form
  consent_texto: TEXTO_CONSENTIMENTO,
  event_id: crypto.randomUUID(),         // ← deduplicação
  empresa_site: honeypot.value,          // ← anti-spam, tem que vir vazio
};
```

### 2. Ordem de execução

| # | Ação | Por quê nessa ordem |
|---|---|---|
| 1 | ✅ **`atribuicao.js` nos dois funis** — feito em 19/07/2026 | Para de perder dado a cada dia que passa. Nada é retroativo. |
| 2 | Consentimento + honeypot no form | Coluna obrigatória do schema; e `spam_score` sem honeypot não funciona. |
| 3 | Versionar o fluxo n8n em `ia/n8n/` | Hoje o roteamento por `tipo` é inauditável. |
| 4 | Gravar em `pz.lead_intake` (SPEC §72-107) | Tira a Expert List do CSV manual. |
| 5 | GA4 nas duas páginas | Destrava as etapas 1–4 do funil da Torre de Controle. |
| 6 | Webhook de pagamento da Kiwify | Fecha o ciclo: receita reconciliada com o lead. |

O passo 1 é isolado, cabe em uma sessão e não toca no fluxo de venda. Os passos 4–6 dependem de
Supabase no ar.

### 3. Detalhe a não errar no passo 1

Manter o `keepalive: true` e o `.catch()` silencioso do funil do curso. A regra "falha de registro
nunca impede a compra" está certa e não deve ser trocada pelo tratamento de erro da comunidade —
lá o cadastro *é* a conversão, aqui não é.

---

## Enquanto isso

A Torre de Controle (`4-gestao-de-resultados/painel/`) já está construída com esse diagnóstico
embutido: a coluna **Fonte** de cada etapa do funil e o bloco **Saúde da instrumentação** mostram,
na própria tela, o que está ligado e o que não está. Ela roda com números demonstrativos e passa a
refletir a realidade conforme os passos acima forem entregues — sem mudança de layout, só a troca
de `dados.js`.
