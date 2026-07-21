# Prompts das capas — plataforma da Sabina

As peças que estão em `imagens/` hoje são **SVG desenhados por código** (`scripts/gerar-capas.mjs`),
não imagens geradas. Este arquivo existe para o caso de você querer trocá-las por arte da sua
ferramenta de imagem: **os nomes de arquivo e as proporções abaixo são os mesmos**, então a
substituição é 1:1 e nenhuma linha de HTML muda.

## Antes de gerar — o que não pode aparecer

Estas restrições vêm do design system (`recursos/design-system/design-system.md`), não são gosto:

- **Fotografia da marca é sempre P&B de alto contraste.** Se a capa tiver foto, ela entra
  dessaturada. Colorida quebra o padrão de todas as outras peças.
- **Paleta fechada:** âmbar `#E9974E` · verde `#50704B` · terracota `#D4866F` · azul `#ADC4CA` ·
  creme `#F7F2EC` · preto `#0D0D0D`. **Proibido** o POP saturado antigo (`#00A651`, `#5BC9D9`,
  `#F5D732`, `#F2A7C3`, `#E8683A`) e o azul-marinho do site.
- **Máximo 3 blocos de cor por peça.**
- **Sem TÍTULO embutido.** A plataforma escreve o título por cima, no rodapé; título na arte duplica
  e trava a peça quando a aula é renomeada. **A legenda no topo é outra coisa** (ver abaixo) e deve
  ser mantida — ela é o que faz a capa dizer do que o módulo trata.
- **Cor do texto ≠ cor do traço.** Sobre campo claro (terracota, azul, âmbar) o texto tem que ser
  preto; só sobre o verde o creme passa. Medido: creme sobre terracota dá **2,54:1**, reprova feio.
  E **nada de opacidade no texto** — creme a 62% sobre o verde cai para 2,99:1.
- **Nada de "futurista genérico":** headset de VR, cérebro de circuito, grade azul néon, malha de
  pontos ligados. É exatamente o que a plataforma tem hoje e o que estamos substituindo.

## Direção comum a todas as peças

> Editorial abstrato inspirado em **cartografia**: curvas de nível, cortes geológicos, isolinhas,
> cartas náuticas. Traço fino e regular sobre campo de cor chapada. Sem gradiente, sem brilho, sem
> profundidade falsa. A sensação é de mapa impresso, não de interface digital.

O porquê: o produto se chama *O Mapa das Convergências*, e um mapa é literalmente o que o aluno
recebe. A gramática cartográfica é do assunto, não emprestada.

### A composição em três faixas (vale para toda capa)

Ditada pelo componente real da Curseduca, não por gosto — ver a captura em `imagens/indice.md`:

```
┌─────────────────────┐  0%
│ LEGENDA             │     topo, 0–30%
│                     │
├─────────────────────┤ 30%
│                     │     meio, 30–62%
│      ✳ o cume       │     é o que se vê de relance
│                     │
├─────────────────────┤ 62%
│ TÍTULO DA PLATAFORMA│     base, 62–100% — RESERVADA
│ ▓▓ painel de hover  │     a plataforma escreve aqui, e no
└─────────────────────┘100%  hover um painel escuro cobre tudo
```

**Nada importante na base.** Ali a arte é coberta pelo título e, no hover, por um painel opaco. Quem
desenha algo bonito no rodapé desenha para ninguém ver.

### A legenda: três termos, e só

Todo mapa tem legenda. É o que impede a capa de ser bonita e muda — sem ela, cor e densidade
distinguem os cartões mas não dizem nada sobre SXSW, IA ou policrise.

**Três termos empilhados no topo à esquerda. Nada mais:**

```
policrise             ← 3 termos que o módulo ensina,
soberania cognitiva      como topônimos numa carta
modernidade gasosa
```

Os termos saem de `conteudo-plataforma.md`.

⚠️ **Não colocar rótulo nem contagem aqui.** Uma versão anterior trazia "MÓDULO 01" e "12 aulas" no
topo — e os dois já aparecem no rodapé, escritos pela plataforma. Era a mesma informação duas vezes
na mesma peça. **A regra: a capa só escreve o que a plataforma não escreve.**

**Corpo: 44px num canvas de 800.** Parece enorme aberto no editor, e é intencional — o cartão exibe
a ~282px, então **multiplique por 0,35 antes de julgar**: dá ~15px na tela. A primeira versão usava
27 e ficou pequena demais na vitrine. Se você gerar arte com legenda, aplique a mesma conta.

---

## 1 · `capa-comece-por-aqui.svg` — 800×1200 (2:3)

**Onde aparece:** primeiro cartão do percurso, na vitrine.

> Campo chapado âmbar `#E9974E`. Uma única curva de nível preta `#0D0D0D`, fina, irregular e
> fechada, ocupando o terço superior-esquerdo — como a primeira isolinha de uma carta, a cota mais
> baixa. Muito espaço vazio. Um pequeno asterisco de doze pontas em preto no centro da curva.
> Sensação: começo, uma única elevação, o mapa ainda quase em branco. Sem texto.

**Por que uma curva só:** é a porta de entrada, um item apenas. A escassez é a informação.

---

## 2 · `capa-modulo-01.svg` — 800×1200 (2:3)

**Onde aparece:** segundo cartão do percurso.

> Campo chapado verde musgo `#50704B`. **Doze** curvas de nível concêntricas em creme `#F7F2EC`,
> traço fino, contorno orgânico e irregular (nunca circular), aninhadas sem se cruzarem, apertando
> em direção a um ponto no terço superior-esquerdo. A cada quatro curvas, uma vem mais grossa e mais
> opaca — a cota mestra das cartas topográficas. Pequeno asterisco creme no ponto de convergência.
> Sensação: relevo, concentração, terreno sendo lido. Sem texto.

**Por que doze:** são as 12 aulas do módulo. O número é conteúdo, não estética.

---

## 3 · `capa-modulo-02.svg` — 800×1200 (2:3)

**Onde aparece:** terceiro cartão do percurso.

> Igual à anterior em gramática, trocando: campo terracota `#D4866F`, **treze** curvas em creme,
> e um relevo de forma visivelmente diferente do módulo 01 — mesma família, outro terreno.
> Asterisco creme no ponto de convergência. Sem texto.

**Por que treze:** são as 13 aulas do módulo 02.

---

## 4 · `capa-mapa-convergencias.svg` — 800×1200 (2:3)

**Onde aparece:** quarto cartão do percurso — a ferramenta, o destino.

> Campo azul acinzentado `#ADC4CA`. **Três cumes separados** de curvas de nível em azul-tinta
> `#4F6E76`, traço fino, cada cume com sua própria contagem — **4**, **4** e **9** curvas — dispostos
> em triângulo e **próximos o bastante para as curvas se cruzarem**. Onde se cruzam, lê como
> interferência: é a convergência acontecendo. Asterisco preto `#0D0D0D` no cume maior (o de 9).
> Legenda em **preto** no topo. Sem título.

**Por que três cumes e não um:** 4 forças de mudança + 4 eixos de policrise + 9 sintomas = os 17
nomes que formam o Mapa. Um cume de 17 apenas *conta*; três cumes **mostram a anatomia**. É também o
que faz o cartão do destino parecer diferente dos dois módulos — antes as quatro capas tinham a mesma
estrutura e só mudavam de cor. O README do funil diz que *"os 17 nomes completos são o produto"*.

---

## 5 · `banner-modulo-01.svg` — 2100×900 (21:9)

**Onde aparece:** abertura do Módulo 01.

> Mesma carta do módulo 01, em formato largo: campo verde, doze curvas em creme, mas com o ponto de
> convergência deslocado para o **terço direito** — a metade esquerda fica quase vazia, reservada
> para o título que a plataforma escreve por cima. Sem texto.

## 6 · `banner-modulo-02.svg` — 2100×900 (21:9)

> Idem, em terracota, com treze curvas.

---

## 7 · `banner-vitrine-tracos.svg` — 2100×900 (21:9), **fundo transparente**

**Onde aparece:** por cima da foto de palco, no bloco de retomada da vitrine.

> **Sem fundo — apenas as linhas, em PNG/SVG com transparência.** Dezessete curvas de nível em
> âmbar `#E9974E`, traço fino, convergindo para um ponto no terço direito. Vai sobreposta a uma
> fotografia em P&B, então precisa funcionar como camada: nada de área preenchida, só contorno.
> Pequeno asterisco âmbar no ponto de convergência.

**Cuidado:** se a sua ferramenta não exportar com alfa, esta peça não serve — ela existe para deixar
a foto aparecer por baixo.

---

## Se quiser as 25 miniaturas de aula

Ficaram fora deste lote (são +25 peças). A gramática seria: **16:9**, campo creme, curvas na cor do
módulo, e o número de curvas vindo do que a aula nomeia — 3 para "os três paradoxos da IA", 4 para
"os 4 Is humanos", 6 para "os 6 Cs do futuro". Onde a aula não nomeia número, usar a posição dela
no módulo. Os títulos reais estão em `conteudo-plataforma.md`.
