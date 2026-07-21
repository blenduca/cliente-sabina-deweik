# Design da plataforma — área de membros da Sabina

Protótipo navegável do tema da área de membros de **O Mapa das Convergências**, no design system
oficial. Serve de referência visual e de especificação para quem for aplicar o tema.

```bash
# a partir da raiz do repo, com o servidor estático de pé
http://localhost:8788/3-produto-escalavel/design-plataforma/          # vitrine
http://localhost:8788/3-produto-escalavel/design-plataforma/aula.html # player + lista

npm run capas         # regera as 7 peças SVG (determinístico)
npm run sync:tokens   # atualiza ds/ a partir do design system
```

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `index.html` | Vitrine — o percurso de 4 estações |
| `aula.html` | Player + lista das 12 aulas do Módulo 01 |
| `style.css` | Importa `ds/tokens/`, zero hex cru |
| `conteudo-plataforma.md` | **Os 25 títulos reais**, extraídos da Curseduca |
| `PROMPTS-CAPAS.md` | 1 prompt por peça, para trocar os SVG por arte gerada |
| `imagens/` | 4 capas, 3 banners, 1 foto — ver `imagens/indice.md` |
| `scripts/gerar-capas.mjs` | O gerador das peças |
| `ds/` | **GERADO** por `npm run sync:tokens`. Não editar. |

---

## As três decisões de design

### 1 · Base clara, contra o hábito de área de membros

O `colors.css` do design system é light-only, e a plataforma atual é preta com dourado genérico.
Optamos por **ser fiel ao DS**: quem compra numa LP creme entra numa plataforma creme.

A consequência virou a decisão central da tela: com tudo em creme, **o vídeo é o único retângulo
escuro da interface**. Ele não precisa de moldura, brilho nem seta — o contraste sozinho leva o olho.
É a mesma lógica que o DS aplica à fotografia (P&B de alto contraste sobre base clara).

### 2 · A vitrine é um percurso, não uma prateleira

São 4 cursos, não 40 — carrossel horizontal para 4 itens é teatro. E eles **são uma sequência real**:
Comece por aqui → Módulo 01 → Módulo 02 → o Mapa. Por isso um caminho numerado, com o progresso
preenchendo o fio em âmbar. A numeração se justifica porque a ordem carrega informação que o aluno
precisa; se fossem 4 itens independentes, numerar seria enfeite.

O hero também muda de função: numa área de membros ele **não vende, reorienta**. Diz exatamente onde
a pessoa parou e devolve ela ao vídeo em um clique. A única tarefa desta tela é fazer apertar play.

### 3 · As capas são cartas topográficas — e não são foto nem IA

O produto se chama *O Mapa das Convergências*. As capas usam a gramática nativa de cartografia —
curvas de nível que se apertam em torno de um ponto — e **o número de curvas é a contagem que o
conteúdo nomeia**: 12 e 13 aulas nos módulos, e **17** no Mapa, em **três cumes de 4, 4 e 9** (as
forças, os eixos de policrise e os sintomas). Mudou a grade, muda o desenho.

Cada capa tem uma **legenda** no topo — rótulo, contagem e três termos que o módulo ensina. É o que
impede a capa de ser bonita e muda: sem ela, cor e densidade distinguem os cartões mas não dizem
nada sobre SXSW, IA ou policrise.

**Por que não fotografia:** o acervo não sustenta. Só `sabina-palco-vertical` é retrato, e tem
**342×513** — menor que o cartão em tela retina (564×846 @2×). As duas paisagens utilizáveis
(1600×1066) viram ~711px cortadas em 2:3, e são planos de palco parecidos entre si. Quatro capas com
a mesma pessoa distinguiriam pior que quatro campos de cor.

**Por que não imagem de IA:** é exatamente o que a Curseduca tem hoje — headset de VR sépia, malha de
pontos — e é o gênero mais clichê da imagem gerada. Sete peças geradas separadamente derivam de
estilo entre si, e nenhuma é a linguagem da marca, que é foto P&B da Sabina + os grafismos da
agência. Trocaríamos um banco de imagem genérico por outro.

> **Viés declarado.** Com os originais em alta do Drive eu recomendaria **híbrido** — foto em duotone
> nas duas capas de módulo, gráfico puro nas outras duas. Esta é a resposta certa para o acervo de
> hoje, não uma verdade permanente.
>
> **Gatilho para revisitar:** existir retrato em alta com **≥1600×2400** e respiro no rodapé para o
> título. Se houver ensaio novo, pedir enquadramento **vertical 2:3**, Sabina descentralizada, fundo
> limpo, e luz que aguente conversão para **P&B de alto contraste** — que é a regra do DS.

> **Nota de processo:** a primeira versão eram traços radiais convergindo para o asterisco. Na tela
> virou quatro *starbursts* — traço radial mais estrela no meio lê como explosão, e é o clichê de
> arte gerada que aparece em todo lugar. As curvas de nível resolveram: dizem "aqui a coisa se
> concentra" sem nenhuma seta, e vêm do vocabulário do próprio produto.

### 4 · O cartão imita o componente real da Curseduca

O protótipo **não** usa o card mais comum (imagem em cima, faixa branca com título embaixo). Ele
replica o que a plataforma faz de fato: **título sobre a capa** e, no hover, um **painel escuro que
sobe da base** com a ação, a data de acesso e o progresso.

Isso não é capricho: é o que define onde a arte pode existir. A base do cartão é coberta pelo título
e depois pelo painel, então as capas reservam o terço inferior. Se o protótipo mostrasse uma faixa
branca embaixo, as capas teriam sido desenhadas para um componente que não existe.

O painel abre no **hover e no foco de teclado** — se abrisse só no hover, a ação principal ficaria
inacessível para quem navega por Tab.

### 5 · Duas comunidades, uma só peça

O produto tem **duas** comunidades e elas não podem ser confundidas — o
`funil-curso-low-ticket/README.md` é explícito: *"Não vender a aberta como exclusiva."*

- **A paga** (privada, exclusiva de aluno) vive **dentro** da plataforma e já tem porta própria no
  menu lateral. Não ganha banner: é parte do que a pessoa comprou, não uma oferta.
- **A aberta** ("Futuro Com Sabina", gratuita) ganha o banner horizontal no fim da vitrine,
  repetindo o padrão do banner do linktree — foto da plateia em P&B, véu quente, etiqueta "Gratuito".
  **O destino é o convite do grupo de WhatsApp**, direto, sem passar por captura: aqui dentro a
  pessoa já é aluna e já deu os dados na compra. (No linktree o destino é outro de propósito — lá o
  visitante é frio e precisa passar pelo cadastro.) Por isso o botão diz "Entrar no grupo do
  WhatsApp", e não "Entrar na comunidade": o rótulo tem que dizer onde o clique leva.

O banner fica mais baixo que o bloco de retomada de propósito: a tarefa desta tela é fazer apertar
play, e ele não pode competir com aquele botão.

---

## Aplicar na Curseduca

⚠️ **Não verifiquei se a Curseduca aceita CSS ou tema customizado a este nível.** Esta é a pendência
que decide o valor prático do protótipo — checar no painel do fornecedor antes de prometer prazo.

Os três cenários:

1. **Aceita CSS customizado** → portar `style.css` mapeando os seletores dela. As capas SVG entram
   como upload normal de imagem de curso.
2. **Aceita só logo, cores e capas** → aplicar a paleta oficial e subir as 4 capas. Já resolve o
   pior problema atual, que são as capas de banco de imagem fora da marca.
3. **Não aceita nada** → o protótipo vira insumo de decisão: ou negociar customização, ou avaliar
   migração de plataforma.

**Ordem sugerida, independente do cenário:** trocar as 4 capas primeiro. É o item de maior retorno
visual e o menos dependente de suporte técnico do fornecedor.

### Divergência proposital de nomenclatura

Na Curseduca os módulos se chamam **"Aula 01"** e **"Aula 02"**, mas contêm 12 e 13 aulas cada —
"Aula 01" é um módulo, não uma aula. O protótipo usa **"Módulo 01/02"** de propósito, para a conversa
acontecer. Se a decisão for manter, é só trocar o texto; nada no design depende disso.

---

## A revisão da Kiron confirma a direção

`Sabina Deweik _ Pontos de ajuste _ Plataforma.pdf` (2026-07-20) critica o tema atual da Curseduca
por *"cores mais escuras e apagadas"* que levam a Sabina para *"um território bastante diferente"* do
que ela construiu, e pede de volta **os símbolos da marca**, **as demais cores da paleta** e uma
energia *"luminosa, inspiradora e propositiva"*, alinhada à ideia de **futuros positivos**.

É exatamente o que este protótipo faz — base creme, paleta completa, asterisco em todas as capas — e
a crítica chegou **depois** dessas decisões, sem contato entre as duas. Vale como validação
independente da escolha de base clara, que era a decisão mais arriscada do projeto.

As correções de copy do mesmo documento, e o que ainda precisa de dono, estão em
`conteudo-plataforma.md`.

## Defeitos do design system encontrados aqui

Achados enquanto construía, que valem para **todos** os ativos, não só para este:

- **`--accent-ink` (#B26A24) sobre creme dá 3,79:1 — reprova AA** para texto pequeno. O `base.css`
  usa exatamente essa combinação em `.ds-label`, que tem 0,8rem. Aqui o rótulo foi trocado por
  `--marca-verde-ink` (7,73:1), o que também é mais fiel à regra do próprio DS: âmbar é a cor de
  CTA, e gastá-la em eyebrow enfraquece o botão.
- **`--marca-terracota-ink` (#B0573D) sobre creme dá 4,41:1** — reprova por pouco. Ou seja, **dois
  dos quatro tokens `-ink`**, que existem justamente para ser texto sobre creme, não passam no fundo
  padrão. Vale recalcular os quatro no design system.
- **Creme sobre terracota dá 2,54:1** — reprova feio, e nem opacidade 1 salva. O DS trata
  `--marca-terracota` como cor de superfície, mas não diz que ela **não carrega texto claro**. Nas
  capas isso obrigou a separar cor de traço de cor de texto (curvas creme, legenda preta). Vale
  documentar no DS quais campos aceitam texto claro: pela medição, só o verde.
- **O anel de foco global não pode ser âmbar em botão âmbar** — some. Aqui os botões usam anel duplo
  (aro preto + halo creme), que funciona sobre fundo claro e escuro.

## O que este protótipo não é

- **Não é um app.** Não há autenticação, player real, progresso persistido nem back-end. Os estados
  (concluída / assistindo / a seguir) são marcação estática, para mostrar como cada um se apresenta.
- **As durações das aulas são exemplo.** A Curseduca não expõe esse dado e ele não foi inventado com
  aparência de medido — está só na aula em foco, como placeholder de layout.
- **Não toca a Curseduca.** O conteúdo foi lido de lá; nada foi publicado nem alterado.

## Verificação — o que passou e o que falta

Passou, conferido no navegador: zero requisições ao Google Fonts nas duas telas · zero recursos 404 ·
um `<h1>` por tela e nenhum salto de nível · nenhuma imagem sem `alt` · tokens `--marca-*` resolvendo
(nada de hex cru) · contraste AA em todos os pares medidos, depois das correções (rótulo 7,73:1 ·
lista 19,44:1 · nota sobre o player 5,16:1 · botão 8,33:1 · texto da comunidade 5,02:1) ·
`prefers-reduced-motion` declarado · geração das capas determinística (rodar duas vezes dá o mesmo
byte).

**Falta conferência manual** — não consegui reproduzir pela automação:

1. **Varredura de teclado.** As regras `:focus-visible` existem e um foco programático confirmou o
   anel âmbar, mas a aba não sustentou foco de janela para eu tabular as telas inteiras. Vale um
   passe manual de Tab nas duas.
2. **Mobile em 390px.** Os três breakpoints (1080 / 860 / 560) estão no CSS e parseados, mas não
   consegui redimensionar a janela nesta sessão. Conferir no DevTools que o percurso vira coluna e
   que não há rolagem horizontal.
