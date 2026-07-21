---
titulo: Expert List — Sabina Deweik
area: 2-motor-de-crescimento
status: em-validacao
entradas:
  - 2-motor-de-crescimento/marketing/lp-comunidade-gratuita/
  - 2-motor-de-crescimento/vendas/funil-curso-low-ticket/
  - plataforma/docs/SPEC.md
skill: null
validado_por: null
data: 2026-07-19
portal: true
---

# Expert List — Sabina Deweik

> **O maior ativo do negócio.** Não é uma lista de e-mails: é o registro de quem já cruzou o caminho
> da Sabina, quanto essa relação vale e quão pronta ela está para a próxima conversa.

A planilha vive em [`expert-list-sabina-deweik.csv`](./expert-list-sabina-deweik.csv).

---

## 1 · De onde ela nasce

A base **começa do zero e cresce pelos funis** — não há importação de lista existente. Todo contato
entra por um ponto rastreável, e é por isso que cada linha já nasce com origem e atribuição:

| Entrada | Formulário | O que traz |
|---|---|---|
| LP da comunidade | `comunidade` | nome, e-mail, UTM de primeiro toque |
| Funil do curso | `checkout-curso` | nome, e-mail, WhatsApp, UTM, CTA que converteu |
| Compra (Kiwify) | — | receita, produto, data |
| Palestra / workshop B2B | `contato` | **lançado à mão** — é a maior receita e não passa por checkout |
| Interações | — | respostas, cliques, presenças, reuniões |

> **Por que isso importa:** uma lista comprada ou importada de fonte incerta não tem consentimento nem
> contexto — e sem contexto o RFV é chute. Nascer dos funis custa mais tempo e vale mais.

---

## 2 · RFV — como cada contato é pontuado

RFV clássico, calibrado para negócio de conhecimento (ciclos longos, ticket misto entre R$197 e
palestra corporativa).

### R — Recência *(dias desde a última interação)*

| Score | Faixa |
|:--:|---|
| 5 | até 15 dias |
| 4 | 16 a 45 |
| 3 | 46 a 90 |
| 2 | 91 a 180 |
| 1 | mais de 180 |

### F — Frequência *(total de touchpoints)*

Conta tudo que é interação registrada: entrada em funil, abertura/clique de e-mail, resposta no
WhatsApp, presença em evento, reunião, compra.

| Score | Faixa |
|:--:|---|
| 5 | 12 ou mais |
| 4 | 7 a 11 |
| 3 | 4 a 6 |
| 2 | 2 a 3 |
| 1 | 1 |

### V — Valor *(receita acumulada, R$)*

Inclui **receita B2B lançada à mão** — palestras e workshops são o ticket alto dela e não passam por
checkout. Ignorar isso faria a Expert List classificar como "sem valor" justamente os melhores clientes.

| Score | Faixa |
|:--:|---|
| 5 | R$ 10.000 ou mais |
| 4 | R$ 3.000 a 9.999 |
| 3 | R$ 197 a 2.999 *(comprou ao menos o curso)* |
| 2 | R$ 0, mas **chegou ao checkout** sem concluir |
| 1 | R$ 0 |

### Segmentos

Lidos na combinação dos três scores. A coluna `segmento_rfv` é derivada, não digitada.

| Segmento | Regra | O que fazer |
|---|---|---|
| **Campeão** | R≥4 · F≥4 · V≥4 | Convidar para o que for novo primeiro. Pedir indicação. |
| **Cliente fiel** | R≥3 · F≥4 · V≥3 | Oferta de nível acima (imersão, consultoria). |
| **Promissor** | R≥4 · F≤3 · V≥3 | Comprou pouco mas está quente — nutrir com profundidade. |
| **Novo** | R=5 · F≤2 · V≤2 | Onboarding. Ainda não sabe do que ela é capaz. |
| **Em risco** | R≤2 · F≥3 · V≥3 | Já foi bom cliente e sumiu. Contato pessoal, não campanha. |
| **Hibernando** | R≤2 · F≤2 | Campanha de reativação. Baixo custo, baixa expectativa. |
| **Perdido** | R=1 · F=1 | Manter só se houver consentimento. Não insistir. |

---

## 3 · Temperatura — prontidão para conversa AGORA

O RFV mede a relação ao longo do tempo. A temperatura mede o **momento**. Um Campeão pode estar frio;
um Novo pode estar quentíssimo. São eixos independentes, e é o cruzamento dos dois que diz o que fazer.

| Temperatura | Regra |
|---|---|
| 🔥 **Quente** | interagiu nos últimos 15 dias **e** demonstrou intenção — chegou ao checkout, respondeu, pediu proposta ou baixou o media kit |
| 🌤 **Morno** | interagiu nos últimos 45 dias, com 3 ou mais touchpoints |
| ❄️ **Frio** | sem interação há mais de 45 dias, **ou** apenas 1 touchpoint |

**A leitura que importa:** *Campeão + Frio* é o contato mais valioso e mais negligenciado da base.
*Novo + Quente* é o que responde hoje. Os dois pedem ação; nenhum aparece se você olhar só um eixo.

---

## 4 · Dicionário de campos

As 12 primeiras colunas são as que se olha no dia a dia; o resto é contexto e auditoria.

| Campo | Origem | Observação |
|---|---|---|
| `id` | sistema | uuid; não editar |
| `nome`, `email`, `whatsapp` | funil | WhatsApp em E.164 (`+5511999999999`) |
| `temperatura` | **derivado** | 🔥 / 🌤 / ❄️ |
| `segmento_rfv` | **derivado** | ver §2 |
| `rfv` | **derivado** | ex.: `545` |
| `situacao` | manual | novo · contatado · qualificado · em-negociacao · cliente · descartado |
| `ja_foi_cliente` | derivado | `sim` se houver qualquer receita |
| `valor_total` | misto | Kiwify automático + B2B manual |
| `touchpoints` | sistema | contagem de interações |
| `ultima_interacao` | sistema | data |
| `proxima_acao` | manual | o que fazer e quando — a coluna que transforma lista em trabalho |
| `empresa`, `cargo`, `cidade_uf` | manual/enriquecido | crítico para B2B |
| `origem`, `formulario`, `cta` | funil | qual ativo trouxe |
| `utm_*` | funil | **primeiro toque**, imutável |
| `referrer`, `entrada_em` | funil | |
| `r_score`, `f_score`, `v_score` | **derivado** | |
| `recencia_dias`, `num_compras`, `ultima_compra`, `produtos` | sistema | |
| `tags`, `nota` | manual | |
| `consentimento`, `consent_em` | funil | **LGPD** — ver §6 |

---

## 5 · Fórmulas (Google Sheets)

Enquanto a planilha for operada à mão, estas fórmulas mantêm as colunas derivadas corretas.
Assumindo cabeçalho na linha 1 e dados a partir da 2.

```
recencia_dias   =SE(É.CÉL.VAZIA(ultima_interacao); ""; HOJE()-ultima_interacao)

r_score         =SES(recencia_dias<=15;5; recencia_dias<=45;4; recencia_dias<=90;3;
                     recencia_dias<=180;2; VERDADEIRO;1)

f_score         =SES(touchpoints>=12;5; touchpoints>=7;4; touchpoints>=4;3;
                     touchpoints>=2;2; VERDADEIRO;1)

v_score         =SES(valor_total>=10000;5; valor_total>=3000;4; valor_total>=197;3;
                     chegou_checkout="sim";2; VERDADEIRO;1)

rfv             =r_score & f_score & v_score

segmento_rfv    =SES(E(r>=4;f>=4;v>=4);"Campeão";
                     E(r>=3;f>=4;v>=3);"Cliente fiel";
                     E(r>=4;f<=3;v>=3);"Promissor";
                     E(r=5;f<=2;v<=2);"Novo";
                     E(r<=2;f>=3;v>=3);"Em risco";
                     E(r<=2;f<=2);"Hibernando";
                     VERDADEIRO;"Perdido")

temperatura     =SES(E(recencia_dias<=15; intencao="sim");"🔥 Quente";
                     E(recencia_dias<=45; touchpoints>=3);"🌤 Morno";
                     VERDADEIRO;"❄️ Frio")

ja_foi_cliente  =SE(valor_total>0;"sim";"não")
```

> Substitua os nomes pelas referências de coluna reais (`H2`, `M2`…). Mantidos por nome aqui para
> legibilidade.

---

## 6 · LGPD

Cada linha carrega `consentimento` e `consent_em`. Contatos sem consentimento **só podem receber
comunicação transacional** (acesso ao curso, suporte) — não marketing.

Contato sem conversão e sem interação há 24 meses é **anonimizado**, não apagado: nome, e-mail e
telefone viram nulos, a linha e as métricas agregadas permanecem.

---

## 7 · O plano de sair da planilha

Este arquivo é **provisório por decisão consciente** (2026-07-19): a base ainda é pequena e o
Postgres não está no ar.

O schema do CSV é **exatamente** o da view `public.v_expert_list`
(`plataforma/db/migrations/0005_expert_list.sql`). Quando o banco entrar:

1. O CSV é importado uma vez para `pz.lead` / `pz.interacao`.
2. A planilha passa a ser **exportada** do painel, não mantida à mão.
3. RFV e temperatura passam a ser calculados pelo banco — as fórmulas do §5 deixam de existir.

**Enquanto os dois coexistirem, a planilha é a verdade.** Depois da importação, o banco é.
Não operar os dois ao mesmo tempo: foi assim que a planilha anterior se perdeu.

Acompanhamento: [`4-gestao-de-resultados/artefatos/painel-expert-list.md`](../../../4-gestao-de-resultados/artefatos/painel-expert-list.md)
