#!/usr/bin/env node
/**
 * gerar-capas — desenha as capas e banners da plataforma como SVG.
 *
 * A IDEIA
 * O produto se chama "O Mapa das Convergências", e um mapa é literalmente o que o
 * aluno recebe. Cada peça é uma carta topográfica: N curvas de nível apertando em
 * torno de um cume — e N NÃO é decoração, é a contagem que o próprio conteúdo
 * nomeia (12 aulas, 13 aulas, e 17 nomes do Mapa em três cumes de 4, 4 e 9).
 * Trocar o conteúdo troca o desenho.
 *
 * DETERMINISMO
 * O jitter usa um PRNG com semente fixa por peça, não `Math.random`. Rodar de novo
 * produz byte-a-byte o mesmo arquivo — senão cada regeneração viraria ruído no diff
 * e ninguém saberia se a capa mudou de verdade.
 *
 * O QUE A CAPA ESCREVE
 * Só o que a plataforma NÃO escreve. No rodapé do cartão a Curseduca já põe título,
 * módulo, contagem e estado; a capa traz apenas os 3 termos do módulo, no topo.
 * Título embutido, além de duplicar, obrigaria a regerar arte a cada renomeação.
 *
 * ONDE PODE DESENHAR
 * A base do cartão (62%–100%) é coberta pelo título e, no hover, por um painel
 * opaco. Nada importante ali — ver a composição em três faixas no PROMPTS-CAPAS.md.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');

/* Tokens da marca. Duplicados aqui porque isto é um gerador Node, que não lê CSS —
   se a paleta mudar em sistema/tokens/colors.css, estes quatro valores mudam junto. */
const COR = {
  ambar: '#E9974E',
  verde: '#50704B',
  terracota: '#D4866F',
  azul: '#ADC4CA',
  azulInk: '#4F6E76',
  creme: '#F7F2EC',
  preto: '#0D0D0D',
};

/* Asterisco oficial (assets/grafismos/asterisco-1.svg), viewBox 471.9 × 476.19.
   Copiado como path porque a peça precisa ser autocontida — capa que depende de
   outro arquivo quebra quando alguém move a pasta. */
const ASTERISCO = '471.9 193.96 461.4 159.52 307.1 206.55 407.89 121.24 384.63 93.77 290.69 173.28 349.56 65.2 317.95 47.98 254.78 163.94 269.64 3.32 233.79 0 214.95 203.73 104.16 67.83 76.26 90.58 159.69 192.92 16.63 118.39 0 150.32 181.45 244.85 13.73 295.98 24.23 330.41 150.54 291.91 27.41 396.13 50.67 423.61 166.95 325.18 94.08 458.97 125.69 476.19 202.85 334.53 190.7 466.01 226.54 469.33 242.69 294.73 371.97 453.32 399.87 430.57 297.95 305.54 415.05 366.55 431.68 334.63 276.18 253.61 471.9 193.96';

/** mulberry32 — PRNG pequeno e determinístico. */
function prng(semente) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * CURVAS DE NÍVEL.
 *
 * A primeira versão foi um feixe de traços radiais convergindo para o asterisco.
 * Na tela virou quatro starbursts — traço radial mais estrela no meio lê como
 * explosão, e é exatamente o clichê de arte gerada que se vê em todo lugar.
 *
 * A correção veio do próprio produto: isto é um MAPA. Curvas de nível que se
 * apertam em torno de um ponto são o vocabulário nativo de cartografia, dizem
 * "aqui a coisa se concentra" sem nenhuma seta, e não se parecem com nada de
 * banco de imagem. N anéis = a contagem que o conteúdo nomeia.
 *
 * As curvas partilham a MESMA função de relevo (harmônicos com fase fixa por
 * peça) e a amplitude escala com o raio — é o que garante que os anéis nunca se
 * cruzem, como em topografia de verdade.
 */
function curvasDeNivel({ n, cx, cy, semente, cor, largura, passo = 62, r0 = 78 }) {
  const rnd = prng(semente);

  /* Quatro harmônicos com fase e peso sorteados: dão um contorno orgânico e
     reconhecível, sem virar círculo nem mancha. */
  const harm = [1, 2, 3, 5].map((h) => ({
    h,
    fase: rnd() * Math.PI * 2,
    peso: (1 / h) * (0.55 + rnd() * 0.75),
  }));
  const normal = harm.reduce((s, x) => s + x.peso, 0);
  const relevo = (t) => harm.reduce((s, x) => s + x.peso * Math.sin(x.h * t + x.fase), 0) / normal;

  const PONTOS = 120;
  const AMPLITUDE = 0.2;
  const partes = [];

  for (let k = 1; k <= n; k++) {
    const raio = r0 + k * passo;
    const d = [];

    for (let p = 0; p <= PONTOS; p++) {
      const t = (p / PONTOS) * Math.PI * 2;
      const r = raio * (1 + AMPLITUDE * relevo(t));
      const x = cx + Math.cos(t) * r;
      const y = cy + Math.sin(t) * r * 0.92;   // leve achatamento: menos "alvo"
      /* Inteiro basta num canvas de 800×1200 e corta ~30% do peso do arquivo —
         a diferença é sub-pixel e o SVG escala igual. */
      d.push(`${p === 0 ? 'M' : 'L'}${Math.round(x)} ${Math.round(y)}`);
    }
    d.push('Z');

    /* Um a cada quatro anéis é a "cota mestra" e vem mais forte — hierarquia
       sem precisar de segunda cor, e é como carta topográfica marca altitude. */
    const mestra = k % 4 === 0;
    const op = mestra ? 0.9 : 0.42;

    partes.push(
      `    <path d="${d.join(' ')}" fill="none" stroke="${cor}" ` +
      `stroke-width="${(mestra ? largura * 1.9 : largura).toFixed(1)}" stroke-opacity="${op}"/>`
    );
  }
  return partes.join('\n');
}

/**
 * LEGENDA.
 *
 * A crítica que este bloco responde: as capas distinguiam (por cor e densidade)
 * mas eram MUDAS — nada nelas dizia SXSW, IA ou policrise. Era o único ponto em
 * que uma foto ganharia. Todo mapa tem legenda, então a legenda fecha a lacuna
 * dentro da própria gramática, sem depender de foto nem de imagem gerada.
 *
 * Os termos vêm de `conteudo-plataforma.md` — são os nomes que o módulo ensina,
 * como topônimos numa carta. Não são o TÍTULO: o título quem escreve é a
 * plataforma, no rodapé, e por isso a legenda mora no topo.
 *
 * FONTE: um SVG usado como <img> não carrega webfont. Por isso a pilha termina
 * em system-ui em vez de depender de Bebas — caixa-alta e tracking largo seguram
 * o caráter da marca mesmo quando o fallback entra.
 */
const PILHA = "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif";

function legenda({ x, y, termos, cor, escala = 1 }) {
  /* SÓ OS TERMOS.
     A versão anterior trazia também o rótulo ("MÓDULO 01") e a contagem
     ("12 aulas") — e os dois já aparecem no rodapé do cartão, escritos pela
     plataforma. Era repetição pura: a mesma informação duas vezes na mesma peça.
     Ficou o que NÃO se repete em lugar nenhum, que é justamente o que faz a capa
     dizer do que o módulo trata. Sem eles a capa volta a ser bonita e muda.

     Um filete separando também saiu: ele existia para dividir rótulo de termos,
     e sem rótulo não há o que dividir.

     CORPO. O cartão exibe a ~282px e o canvas tem 800: tudo encolhe 0,35×. 44
     aqui dá ~15px na tela. Regra prática: multiplicar por 0,35 antes de decidir
     se o corpo serve — foi assim que a primeira versão saiu pequena demais.

     OPACIDADE 1. Uma versão anterior rebaixava para .62 e as quatro capas
     reprovaram AA — creme a .62 sobre o verde dá 2,99:1. Sobre campo de cor
     chapada não sobra margem para transparência. */
  const e = (v) => Math.round(v * escala);
  return termos
    .map((t, i) =>
      `    <text x="${x}" y="${y + i * e(56)}" font-family="${PILHA}" font-size="${e(44)}" ` +
      `fill="${cor}">${t}</text>`
    )
    .join('\n');
}

function asterisco({ cx, cy, tamanho, cor, opacidade = 1 }) {
  const escala = tamanho / 476.19;
  const ox = cx - (471.9 * escala) / 2;
  const oy = cy - (476.19 * escala) / 2;
  return `    <g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${escala.toFixed(4)})">
      <polygon points="${ASTERISCO}" fill="${cor}" fill-opacity="${opacidade}"/>
    </g>`;
}

function svg({ w, h, fundo, conteudo, titulo }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${titulo}">
  <title>${titulo}</title>
${fundo ? `  <rect width="${w}" height="${h}" fill="${fundo}"/>\n` : ''}  <g>
${conteudo}
  </g>
</svg>
`;
}

/* ── As peças ───────────────────────────────────────────────────────────────
   `tracos` sai do conteúdo real (ver conteudo-plataforma.md). Mudou a grade,
   muda aqui e a arte acompanha. */
const CAPAS = [
  {
    arquivo: 'capa-comece-por-aqui.svg',
    titulo: 'Comece por aqui — a entrada do percurso',
    fundo: COR.ambar,
    traco: COR.preto,
    marca: COR.preto,
    corLegenda: COR.preto,        // 8,33:1 sobre âmbar
    largura: 3.4,
    /* Um cume só, raio grande: é a porta de entrada, e a escassez é a
       informação. Com a legenda no topo ele deixa de parecer inacabado. */
    cumes: [{ n: 1, fx: 0.60, fy: 0.46, semente: 101, passo: 150, r0: 150 }],
    legenda: {
      termos: ['como aproveitar', 'o percurso', 'a ferramenta'],
    },
  },
  {
    arquivo: 'capa-modulo-01.svg',
    titulo: 'Módulo 01, 2026: O Ano das Convergências — 12 aulas',
    fundo: COR.verde,
    traco: COR.creme,
    marca: COR.creme,
    corLegenda: COR.creme,        // 5,02:1 sobre verde
    largura: 2.6,
    cumes: [{ n: 12, fx: 0.62, fy: 0.46, semente: 202, passo: 58 }],  // as 12 aulas
    legenda: {
      termos: ['policrise', 'soberania cognitiva', 'modernidade gasosa'],
    },
  },
  {
    arquivo: 'capa-modulo-02.svg',
    titulo: 'Módulo 02, Futuro com Sabina: SXSW 2026 — 13 aulas',
    fundo: COR.terracota,
    traco: COR.creme,
    marca: COR.creme,
    // creme sobre terracota dá 2,54:1 — o texto TEM que ser preto (6,88:1),
    // mesmo com as curvas em creme. Cor de traço e cor de texto são decisões
    // separadas quando o campo é claro.
    corLegenda: COR.preto,
    largura: 2.6,
    cumes: [{ n: 13, fx: 0.62, fy: 0.46, semente: 303, passo: 55 }],  // as 13 aulas
    legenda: {
      termos: ['apocaloptimismo', 'internet morta', 'intimidade artificial'],
    },
  },
  {
    arquivo: 'capa-mapa-convergencias.svg',
    titulo: 'Mapa de Convergências 2026 — 4 forças, 4 eixos e 9 sintomas',
    fundo: COR.azul,
    traco: COR.azulInk,
    marca: COR.preto,
    corLegenda: COR.preto,        // 10,67:1 sobre azul; azul-ink daria 3,01:1
    largura: 2.3,
    /* TRÊS cumes, não um. Somam os mesmos 17, mas agora a capa MOSTRA a
       anatomia do Mapa em vez de só contá-la — e o cartão do destino fica
       estruturalmente diferente dos dois módulos, que era o que faltava.
       Onde as curvas se cruzam, lê como interferência: é convergência. */
    cumes: [
      { n: 4, fx: 0.30, fy: 0.42, semente: 404, passo: 38 },  // 4 forças de mudança
      { n: 4, fx: 0.76, fy: 0.40, semente: 414, passo: 38 },  // 4 eixos de policrise
      { n: 9, fx: 0.55, fy: 0.55, semente: 424, passo: 36 },  // 9 sintomas
    ],
    legenda: {
      termos: ['4 forças de mudança', '4 eixos de policrise', '9 sintomas'],
    },
  },
];

const L_CAPA = 800;
const A_CAPA = 1200;              // 2:3 retrato, como os cards da vitrine

mkdirSync(join(RAIZ, 'imagens', 'capas'), { recursive: true });
mkdirSync(join(RAIZ, 'imagens', 'banners'), { recursive: true });

for (const c of CAPAS) {
  const partes = [];

  /* COMPOSIÇÃO EM TRÊS FAIXAS, ditada pelo componente real da Curseduca:
       topo (0–30%)    → a legenda
       meio (30–62%)   → o cume; é o que se vê de relance
       base (62–100%)  → RESERVADA. A plataforma escreve o título aqui, e no
                         hover um painel escuro sobe e cobre tudo isso.
     Desenhar algo importante na base é desenhar para ninguém ver. */
  for (const cume of c.cumes) {
    partes.push(curvasDeNivel({
      n: cume.n,
      cx: L_CAPA * cume.fx,
      cy: A_CAPA * cume.fy,
      semente: cume.semente,
      cor: c.traco,
      largura: c.largura,
      passo: cume.passo,
      r0: cume.r0,
    }));
  }

  /* O asterisco é assinatura, não protagonista: pequeno, no cume principal —
     o de mais curvas, que é onde a leitura se concentra. */
  const principal = c.cumes.reduce((a, b) => (b.n > a.n ? b : a));
  partes.push(asterisco({
    cx: L_CAPA * principal.fx,
    cy: A_CAPA * principal.fy,
    tamanho: c.cumes.length > 1 ? 54 : 66,
    cor: c.marca,
  }));

  partes.push(legenda({ x: 62, y: 112, ...c.legenda, cor: c.corLegenda }));

  const total = c.cumes.reduce((s, x) => s + x.n, 0);
  writeFileSync(
    join(RAIZ, 'imagens', 'capas', c.arquivo),
    svg({ w: L_CAPA, h: A_CAPA, fundo: c.fundo, conteudo: partes.join('\n'), titulo: c.titulo })
  );
  console.log(
    `  capas/${c.arquivo} — ${total} ${total > 1 ? 'curvas' : 'curva'}` +
    (c.cumes.length > 1 ? ` em ${c.cumes.length} cumes` : '')
  );
}

/* ── Banners de abertura de módulo (21:9) ───────────────────────────────────
   Mesma gramática, formato largo: o ponto de convergência sai do centro para o
   terço direito, deixando a esquerda livre para o título da plataforma. */
const L_BAN = 2100;
const A_BAN = 900;

for (const c of CAPAS.slice(1, 3)) {
  const cume = c.cumes[0];
  const cx = L_BAN * 0.74;
  const cy = A_BAN * 0.44;
  const conteudo = [
    curvasDeNivel({
      n: cume.n, cx, cy, semente: cume.semente + 1, cor: c.traco,
      largura: c.largura * 1.2, passo: cume.passo * 1.15, r0: cume.r0,
    }),
    asterisco({ cx, cy, tamanho: 74, cor: c.marca }),
    legenda({ x: 96, y: 150, ...c.legenda, cor: c.corLegenda }),
  ].join('\n');

  const arquivo = c.arquivo.replace('capa-', 'banner-');
  writeFileSync(
    join(RAIZ, 'imagens', 'banners', arquivo),
    svg({ w: L_BAN, h: A_BAN, fundo: c.fundo, conteudo, titulo: c.titulo })
  );
  console.log(`  banners/${arquivo} — ${cume.n} curvas`);
}

/* ── Sobreposição do banner da vitrine ──────────────────────────────────────
   Sem fundo: entra POR CIMA da foto de palco em P&B. O feixe em âmbar é o único
   ponto de cor sobre a foto, que é o que o design system pede (foto sempre P&B,
   âmbar como acento). 17 traços = o Mapa, que é o destino do percurso. */
{
  const cx = L_BAN * 0.78;
  const cy = A_BAN * 0.42;
  const conteudo = [
    curvasDeNivel({ n: 17, cx, cy, semente: 505, cor: COR.ambar, largura: 2.8, passo: 52 }),
    asterisco({ cx, cy, tamanho: 70, cor: COR.ambar }),
  ].join('\n');

  writeFileSync(
    join(RAIZ, 'imagens', 'banners', 'banner-vitrine-tracos.svg'),
    svg({ w: L_BAN, h: A_BAN, fundo: null, conteudo, titulo: 'Feixe de convergência sobre a foto de palco' })
  );
  console.log('  banners/banner-vitrine-tracos.svg — 17 curvas, sem fundo (vai sobre a foto)');
}

console.log('\ngerar-capas: 7 peças escritas.');
