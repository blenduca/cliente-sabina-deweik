#!/usr/bin/env node
/**
 * sync-tokens — distribui os tokens e as fontes do design system para cada ativo web.
 *
 * POR QUE COPIAR EM VEZ DE IMPORTAR
 * Cada página é publicada a partir da própria pasta (é a raiz do deploy dela). Um
 * `@import "../../recursos/design-system/..."` resolve no servidor local — que serve o
 * repo inteiro — e morre em produção, porque nada acima da pasta da página é publicado.
 * Hoje `painel.css` faz exatamente esse import e só funciona por sorte do ambiente local.
 *
 * Então: o design system continua sendo a ÚNICA fonte da verdade, e este script projeta
 * uma cópia para dentro de cada ativo. A cópia é marcada `GENERATED` e não se edita à mão —
 * mudou a marca, mexe em `sistema/tokens/` e roda `npm run sync:tokens`.
 *
 * O ÚNICO PONTO QUE NÃO É CÓPIA LITERAL
 * `fonts.css` aponta para `../assets/fonts/*.woff2`, caminho que só existe na árvore do
 * design system. No destino as fontes ficam em `ds/fonts/`, então o `url()` é reescrito
 * para `../fonts/`. Sem isso os `@font-face` apontam para o vazio e as páginas caem em
 * fonte de sistema silenciosamente — sem erro no console, só feias.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DS = resolve(AQUI, '..', 'sistema');
const REPO = resolve(AQUI, '..', '..', '..');

const ORIGEM_TOKENS = join(DS, 'tokens');
const ORIGEM_FONTES = join(DS, 'assets', 'fonts');

/** Pastas que são raiz de deploy e portanto precisam da cópia.
 *  '.' é a raiz do repo: o hub de validação (index.html na raiz) que a Pages serve. */
const ATIVOS = [
  '.',
  '2-motor-de-crescimento/marketing/linktree',
  '2-motor-de-crescimento/marketing/lp-comunidade-gratuita',
  '2-motor-de-crescimento/vendas/funil-curso-low-ticket',
  '4-gestao-de-resultados/painel',
  '3-produto-escalavel/design-plataforma',
];

const CABECALHO = (arquivo) =>
  `/* GENERATED por recursos/design-system/scripts/sync-tokens.mjs — NÃO EDITAR À MÃO.\n` +
  `   Fonte: recursos/design-system/sistema/tokens/${arquivo}\n` +
  `   Para mudar: edite a fonte e rode \`npm run sync:tokens\`. */\n\n`;

/**
 * `fonts.css` é o único arquivo reescrito. Falha ruidosamente se o caminho esperado
 * sumir — um sync que "passou" mas quebrou os @font-face é pior que um sync que parou.
 */
function ajustarCaminhoDasFontes(css, arquivo) {
  if (arquivo !== 'fonts.css') return css;

  const DE = '../assets/fonts/';
  const PARA = '../fonts/';
  const ocorrencias = css.split(DE).length - 1;

  if (ocorrencias === 0) {
    throw new Error(
      `fonts.css não contém nenhum "${DE}". O layout do design system mudou e este script ` +
      `ficou para trás — conferir sistema/tokens/fonts.css antes de seguir.`
    );
  }
  return css.split(DE).join(PARA);
}

function copiarPara(ativo) {
  const destino = join(REPO, ativo, 'ds');
  const destinoTokens = join(destino, 'tokens');
  const destinoFontes = join(destino, 'fonts');

  mkdirSync(destinoTokens, { recursive: true });
  mkdirSync(destinoFontes, { recursive: true });

  const tokens = readdirSync(ORIGEM_TOKENS).filter((f) => f.endsWith('.css'));
  for (const arquivo of tokens) {
    const css = readFileSync(join(ORIGEM_TOKENS, arquivo), 'utf8');
    writeFileSync(join(destinoTokens, arquivo), CABECALHO(arquivo) + ajustarCaminhoDasFontes(css, arquivo));
  }

  const fontes = readdirSync(ORIGEM_FONTES).filter((f) => f.endsWith('.woff2'));
  for (const arquivo of fontes) {
    copyFileSync(join(ORIGEM_FONTES, arquivo), join(destinoFontes, arquivo));
  }

  return { tokens: tokens.length, fontes: fontes.length };
}

let total = 0;
for (const ativo of ATIVOS) {
  const { tokens, fontes } = copiarPara(ativo);
  console.log(`  ${ativo}/ds — ${tokens} tokens, ${fontes} fontes`);
  total += tokens + fontes;
}
console.log(`\nsync-tokens: ${total} arquivos escritos em ${ATIVOS.length} ativos.`);
