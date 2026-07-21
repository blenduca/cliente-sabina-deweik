---
titulo: Painel — acompanhamento da Expert List
area: 4-gestao-de-resultados
status: rascunho
entradas:
  - 2-motor-de-crescimento/marketing/artefatos/expert-list-sabina-deweik.md
  - plataforma/db/migrations/0005_expert_list.sql
  - plataforma/docs/SPEC.md
skill: null
validado_por: null
data: 2026-07-19
portal: true
---

# Painel — acompanhamento da Expert List

Especificação da tela onde a Sabina trabalha a base. Implementação em
`plataforma/app/` (deploy multi-tenant; ver `plataforma/docs/SPEC.md` §1).

> **O que essa tela precisa responder, em ordem:**
> 1. Com quem eu falo hoje?
> 2. Quem eu estou deixando esfriar?
> 3. A base está crescendo e esquentando, ou só crescendo?

---

## 1 · Faixa de topo — a saúde da base

Cinco números, sem gráfico:

| Indicador | Leitura |
|---|---|
| **Contatos na base** | total, com variação nos 30 dias |
| **🔥 Quentes** | prontos para conversa agora |
| **Campeões + Fiéis** | o núcleo que sustenta a receita |
| **Em risco** | já compraram e estão sumindo — **o número mais caro da tela** |
| **Receita da base** | soma do `valor_total`, com quanto veio de B2B manual |

*Em risco* vem antes de *receita* de propósito: é o único indicador aqui que representa dinheiro
saindo em silêncio.

---

## 2 · Matriz temperatura × RFV

O cruzamento é a tela. Nenhum dos dois eixos sozinho diz o que fazer.

|              | ❄️ Frio | 🌤 Morno | 🔥 Quente |
|---|---|---|---|
| **Campeão / Fiel** | ⚠️ reativar — *o mais valioso e mais negligenciado* | manter | **falar hoje** |
| **Promissor** | nutrir | nutrir com profundidade | **falar hoje** |
| **Novo** | onboarding | onboarding | **falar hoje** |
| **Em risco / Hibernando** | campanha de reativação | contato pessoal | **falar hoje** |
| **Perdido** | arquivar | — | reavaliar |

Cada célula é clicável e filtra a tabela abaixo. A coluna 🔥 inteira é a fila do dia.

---

## 3 · A tabela

Colunas visíveis por padrão (as 12 primeiras da Expert List):
`temperatura · nome · empresa · cargo · segmento_rfv · situacao · valor_total · touchpoints ·
ultima_interacao · proxima_acao · data_proxima_acao · origem`

- **Filtros:** temperatura, segmento, situação, origem/funil, campanha (`utm_campaign`), período de
  entrada, tem/não tem próxima ação.
- **Busca:** nome, e-mail, empresa.
- **Edição inline:** `situacao`, `proxima_acao`, `data_proxima_acao`, `nota`, `tags`, `empresa`,
  `cargo`, `cidade_uf`. Toda alteração vai para `pz_ops.audit_log`.
- **Registrar interação:** botão por linha → tipo, canal, data, descrição. Alimenta o F do RFV.
- **Lançar receita B2B:** `pz.lancar_receita_manual()` — palestra e workshop não passam por checkout,
  e sem esse lançamento os melhores clientes aparecem como V=1.
- **Exportar CSV:** exporta exatamente o filtro aplicado, no schema de
  `expert-list-sabina-deweik.csv`. Cada export é registrado (LGPD).

Leads com `spam_score >= 50` ficam ocultos por padrão, com alternador.

---

## 4 · Agenda — "com quem eu falo hoje"

Lista separada, ordenada por `data_proxima_acao`:

- **Atrasadas** (vencidas) — em destaque
- **Hoje**
- **Próximos 7 dias**
- **Sem próxima ação** e temperatura 🔥 — *a lista que revela dinheiro parado*

O último grupo é o mais importante: contato quente sem próximo passo definido é a falha operacional
mais comum e a mais cara.

---

## 5 · Evolução

Três séries, 12 meses:

1. **Crescimento** — contatos novos por mês, empilhados por funil de origem.
2. **Composição por temperatura** — % da base em cada faixa ao longo do tempo. Base que cresce com o
   percentual de frios subindo está inchando, não crescendo.
3. **Conversão por segmento** — quanto cada segmento RFV gerou de receita.

---

## 6 · Como a Sabina usa (o ritual)

**Semanal (15 min).** Abrir a coluna 🔥 e a agenda. Definir próxima ação para todo quente sem ação.

**Quinzenal (no acompanhamento).** Olhar *Em risco* e escolher 3 para contato pessoal — não campanha.

**Mensal.** Olhar a composição por temperatura. Se o percentual de frios sobe dois meses seguidos, o
problema não é captação, é nutrição.

---

## 7 · Métricas de sucesso do painel

O painel funciona se, em 90 dias:

- Nenhum contato 🔥 fica mais de 7 dias sem próxima ação definida.
- O grupo *Em risco* encolhe, ou pelo menos deixa de crescer.
- A Sabina abre a tela sem ninguém pedir.

O terceiro é o único que importa de verdade. Painel que só é aberto quando cobrado é relatório, não
ferramenta.

---

## 8 · Dependências

| Item | Estado |
|---|---|
| Schema e RFV no Postgres | ✅ `0005_expert_list.sql`, com testes |
| Projeto Supabase no ar | ⏳ depende de conta (região `sa-east-1`) |
| Funis gravando no banco | ⏳ fase 1 do rollout |
| Auth do painel (magic link) | ⏳ fase 2 |
| Receita B2B lançada à mão | ⏳ precisa da tela |

Enquanto o banco não estiver no ar, a operação é a planilha
[`expert-list-sabina-deweik.csv`](../../2-motor-de-crescimento/marketing/artefatos/expert-list-sabina-deweik.csv),
com as fórmulas do artefato. **Não operar os dois ao mesmo tempo** — foi assim que a planilha
anterior se perdeu.
