# Índice das imagens — plataforma da Sabina

Peças visuais da área de membros. **As capas e banners são SVG gerados por código**
(`../scripts/gerar-capas.mjs`), não arte manual: rodar `npm run capas` reescreve todas.
Para trocar por imagens da sua ferramenta, ver `../PROMPTS-CAPAS.md` — os nomes e proporções
abaixo são os mesmos, a substituição é 1:1.

## capas/ — cartões da vitrine, 800×1200 (2:3)

| Arquivo | Curvas | De onde vem o número | Campo | Texto da legenda |
|---|---|---|---|---|
| `capa-comece-por-aqui.svg` | 1 | uma porta de entrada | âmbar `#E9974E` | preto (8,33:1) |
| `capa-modulo-01.svg` | 12 | as 12 aulas do módulo | verde `#50704B` | creme (5,02:1) |
| `capa-modulo-02.svg` | 13 | as 13 aulas do módulo | terracota `#D4866F` | **preto** (6,88:1) |
| `capa-mapa-convergencias.svg` | 17 em **3 cumes** (4+4+9) | forças · eixos · sintomas | azul `#ADC4CA` | **preto** (10,67:1) |

**A capa só escreve o que a plataforma não escreve.** No rodapé do cartão a plataforma já põe título,
módulo, contagem e estado — então a capa traz apenas **3 termos** do módulo, no topo, que não
aparecem em nenhum outro lugar. É o que a faz dizer do que trata em vez de só distinguir por cor.

Uma versão anterior repetia "MÓDULO 01" e "12 aulas" no topo, duplicando o rodapé. Removido.

⚠️ **A cor do texto não acompanha a cor do traço.** No módulo 02 as curvas são creme mas a legenda é
preta, porque creme sobre terracota dá 2,54:1 e reprova AA. Mesma lógica no Mapa (azul-ink daria
3,01:1). E o texto da legenda **não usa opacidade** — campo de cor chapada não deixa margem.

## banners/ — 2100×900 (21:9)

| Arquivo | Uso | Fundo |
|---|---|---|
| `banner-modulo-01.svg` | abertura do Módulo 01 | verde, chapado |
| `banner-modulo-02.svg` | abertura do Módulo 02 | terracota, chapado |
| `banner-vitrine-tracos.svg` | **camada** sobre a foto de palco, na retomada | **transparente** |

`banner-vitrine-tracos.svg` só funciona com alfa: ele existe para a fotografia aparecer por baixo.

## fotos/

| Arquivo | Origem | Usada em | Observação |
|---|---|---|---|
| `sabina-palco-sxsw.avif` / `.webp` | cópia de `recursos/design-system/.../fotos-e-produtos/` | bloco de retomada | 1600×1066, a de maior resolução da biblioteca |
| `sabina-plateia.avif` / `.webp` | idem | banner da comunidade aberta | 1227×800, palco visto da plateia — "prova de comunidade" |

`sabina-plateia` é a mesma foto que o linktree usa no banner da comunidade, de propósito: a peça da
plataforma repete o padrão do linktree, só que no formato horizontal.

O arquivo é colorido; **o P&B é aplicado no uso** (`filter: grayscale(1)` no `style.css`), como manda
o índice da biblioteca oficial. Não converter o binário.

⚠️ **`sabina-plateia` tem restrição de direitos.** O original (`DSC_4740.jpg`) contém marca da
Blenduca e **não pode ser usado bruto** — ver `recursos/design-system/assets/fotos-e-produtos/indice.md`.
O arquivo copiado aqui é a versão **já recortada**, que é a versionada no design system. Se algum dia
alguém repuxar do original, tem que recortar de novo.

## Peso

Total do diretório: ~540 KB, dos quais ~430 KB são as duas fotos (avif + webp). Os sete SVG somam
~150 KB e escalam sem perda em qualquer densidade de tela.
