# Funil — "O Mapa das Convergências" (curso low ticket) — Sabina Deweik

Página de vendas do curso online + página de obrigado pós-pagamento.
Refatoração completa de 2026-07-18.

- **Origem:** github.com/blenduca/mapa-sabina (legado Blenduca).
- **Deploy:** Vite multipágina; na Vercel Root Directory = esta pasta.
- Papel no funil: **vendas** → conversão do curso low ticket.
- **Plataforma de entrega:** https://sabinadeweik.curseduca.pro/m/courses (Curseduca).

## O que mudou na refatoração

A versão anterior tinha estética forte mas estava **vazia como página de venda de curso**: o nome do
produto não aparecia no hero, não se dizia que era um curso online gravado, não havia nenhuma aula
listada nem carga horária nem período de acesso, o público era "para todas as pessoas" e o depoimento
era anônimo ("Feedback Executivo"). A FAQ ainda prometia um "Plano de Ação" que não existe.

O time também apontou que o visual escuro afastava a Sabina do posicionamento dela — "positiva, solar
e ao mesmo tempo forte" — e que faltavam os grafismos e as demais cores da paleta.

**Princípio da refatoração:** a página ficou curta em *tempo de leitura*, não em *quantidade de fatos*.
Todo dado tangível virou objeto escaneável (chip, card, número), nunca parágrafo. O que mata low ticket
não é comprimento, é ambiguidade — a versão anterior era curta **e** vaga. Hoje: ~1.500 palavras.

## Regras de copy (decisões que não devem ser desfeitas sem intenção)

| Regra | Por quê |
|---|---|
| **Nada datado em "2026" isolado** | Sempre "2026 **e os próximos anos**". A página não pode envelhecer como a LP do SXSW envelheceu. |
| **"6 meses de acesso"**, nunca uma data fixa | Data fixa datava a oferta e obrigava manutenção. |
| **"ferramenta", nunca "PDF"** | O formato não é o argumento; a aplicação é. |
| **Não entregar o ouro** | Ver abaixo. |
| **A oferta é um trio** | 2 módulos · a ferramenta · comunidade (privada + aberta). |

## Estrutura (13 seções)

| # | Seção | Papel | Cor |
|---|---|---|---|
| 1 | Hero — nome + formato + promessa + chips + preço | Promise | creme + faixa do gradiente-assinatura |
| 2 | Faixa de palcos e marcas | Proof | branco |
| 3 | O cenário — Modernidade Gasosa | O problema | creme |
| 4 | A virada — "a pergunta mudou" | Promise expandida | **verde (escuro 1/2)** |
| 5 | O que você recebe — 2 módulos · 25 aulas | Delivery | creme |
| 6 | O Mapa das Convergências — a ferramenta | Delivery (o ativo) | azul |
| 7 | O caminho — prazo → marco → projeto | Path | creme |
| 8 | Para quem é / não é | Objeções | creme |
| 9 | Quem te leva — Sabina | Proof | âmbar |
| 10 | Já incluído: a comunidade | Bônus | terracota |
| 11 | Investimento + garantia + why now | Investment | **verde (escuro 2/2)** |
| 12 | FAQ (6) | Objeções residuais | creme |
| 13 | Fechamento | — | âmbar |

**Só 2 blocos escuros** (antes eram ~35% da página). Grafismos da marca em uso: `sol-1.svg` (a virada),
`meia-lua.svg` (comunidade), `asterisco.svg` (fechamento e favicon).

**Ordem deliberada:** prova social subiu para a 2ª posição e o *delivery* vem **antes** da autoridade.
Em low ticket a ordem é *o que é* → *é bom?* → *quem faz*; a versão anterior seguia lógica de high
ticket (narrativa e autoridade antes do produto) num produto de R$ 197.

### Não entregar o ouro

Decisão deliberada de 2026-07-18: a página **mostra o volume e tematiza, mas não entrega o conteúdo**.

- **Aulas:** os módulos exibem 4 **chips temáticos** cada, não a lista das 25 aulas. (Uma versão anterior
  tinha as 25 em acordeão — foi removida: era currículo aberto de graça.)
- **O Mapa:** a anatomia mostra as contagens (**4 forças · 4 eixos de policrise · 9 sintomas**) com a
  definição de cada camada e só **2–3 exemplos** por grupo. Os 17 nomes completos são o produto.
- **O exercício final:** a página diz que a última página é uma pergunta e o que ela provoca, sem
  imprimir a pergunta.

Se as aulas mudarem na Curseduca, revisar os chips aqui.

### O Mapa como protagonista

É o ativo mais tangível da oferta e antes era uma linha perdida. Agora tem seção própria (anatomia +
**exercício final em card âmbar**). O exercício é o único entregável que o aluno *produz*, e é o
substituto legítimo do "Plano de Ação" fantasma que a FAQ antiga prometia.

**Nunca chamar de "PDF"** — é a *ferramenta de aplicação*. O formato não é o argumento.

## Checkout: captura de lead antes do pagamento

Nenhum CTA vai direto para a Kiwify. Os **6 CTAs** (`hero`, `conteudo`, `para-quem`, `investimento`,
`fechamento`, `sticky`) abrem o **modal de captura** (nome · e-mail · WhatsApp) e só então redirecionam.

```
[data-checkout] → modal → POST do lead (keepalive) → Kiwify com os campos preenchidos
```

- **Checkout:** `https://pay.kiwify.com.br/82Bzgdr`
- **Prefill** (verificado no checkout real): `name`, `email`, `phone`. O telefone vai **só com dígitos**
  (`11991778022`) — a Kiwify tem o seletor `+55` à parte e não aceita a máscara.
- **UTMs são repassadas** para o checkout, preservando a atribuição.
- O `data-cta` de cada botão vai no payload, então dá para saber **qual CTA converteu**.

### ⚠️ O `tipo` precisa ser roteado no n8n

O lead vai para o **mesmo webhook da comunidade** (o fluxo n8n não está versionado no repo), com
`origem: "Funil Curso — O Mapa das Convergências"` e **`tipo: "Checkout Curso"`**. Se o fluxo não tratar
esse tipo, compradores do curso caem no fluxo da comunidade. **Conferir no n8n antes de publicar.**

### O envio nunca bloqueia a venda

O POST usa `keepalive: true` e sobrevive à navegação: o comprador é redirecionado na hora e a requisição
termina em segundo plano. Se o n8n estiver fora do ar, a compra acontece do mesmo jeito — o `.catch()` é
silencioso de propósito. **A venda tem prioridade sobre o registro do lead.**

## Página de obrigado

`obrigado.html` é o **redirect pós-pagamento configurado na Kiwify**. Um CTA dominante (acessar a
plataforma), 3 passos de acesso, 4 dicas de aproveitamento e as duas comunidades (a privada fica na aba
*Comunidade* da plataforma; a aberta tem o link do WhatsApp).

**Build multipágina:** o Vite só empacota `index.html` por padrão. O `vite.config.js` declara as duas
entradas — **sem ele a `obrigado.html` não entra no `dist/` e o comprador cai num 404 logo depois de
pagar.** O `rewrites` catch-all do `vercel.json` foi removido pelo mesmo motivo (engolia a rota).

## Instrumentação

Ganchos prontos, aguardando GA4/Pixel: `abriu_modal` (com o CTA de origem), `foi_checkout` (com valor) e,
na obrigado, `purchase` + `acessou_plataforma`.

**A métrica que importa é modal → checkout → compra**, e hoje ela não é medida — não há analytics em
nenhum ativo do cliente. Qualquer teste A/B antes de instrumentar é opinião com HTML.

## Riscos assumidos (candidatos a teste)

- **"25 aulas" pode ler como "não vou ter tempo"** — o número que tangibiliza volume pode assustar quem
  já está em dívida cognitiva, que é exatamente o público. Mitigado com "aulas curtas e independentes".
- **O bloco "não é para você se"** derruba conversão bruta; a aposta é que se paga em reembolso evitado.
  Primeiro candidato a sair se a conversão cair.
- **Preço no hero** acelera ou trava dependendo do tráfego — e ninguém sabe qual.
- **A comunidade é dupla** — a privada (na plataforma, exclusiva de aluno) e a aberta "Futuro Com
  Sabina" (WhatsApp + newsletter, gratuita para qualquer um). A página apresenta as duas com papéis
  distintos. **Não vender a aberta como exclusiva:** ela é gratuita e qualquer um descobre em dez
  segundos — a exclusividade real está só na privada.

## Pendências

- Sem analytics/pixel (ver acima).
- O `hero-sxsw.webp` (279K) é servido igual para desktop e mobile.
- Prova social é institucional (palcos e marcas). Quando houver depoimentos reais de alunos, eles são
  mais fortes e devem entrar perto do investimento.
