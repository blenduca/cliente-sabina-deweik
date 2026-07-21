/* ==========================================================================
   painel.js — render da Torre de Controle
   Sem dependências. SVG desenhado à mão para não amarrar a plataforma futura
   a uma lib de gráfico antes da decisão de stack.
   ========================================================================== */

import { carregarDados, ESTADO } from './dados.js';
import { iniciar as iniciarExpert } from './expert-list.js';

const $ = (sel) => document.querySelector(sel);
const css = (nome) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();

/* --- Formatação (pt-BR em tudo que a Sabina lê) --- */
const nf = new Intl.NumberFormat('pt-BR');
const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const moedaCent = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
const pct = (v, casas = 1) => `${(v * 100).toFixed(casas).replace('.', ',')}%`;

const SERIES = {
  curso: { rotulo: 'Curso', cor: () => css('--serie-curso') },
  comunidade: { rotulo: 'Comunidade', cor: () => css('--serie-comunidade') },
  outros: { rotulo: 'Outros', cor: () => css('--serie-outros') },
};

/* Temperatura: escala divergente. O ícone é parte da identidade, não enfeite —
   é o canal secundário que torna a leitura independente de cor. */
const TEMPS = {
  quente: { rotulo: 'Quente', icone: '🔥', cor: () => css('--temp-quente') },
  morno: { rotulo: 'Morno', icone: '🌤', cor: () => css('--temp-morno') },
  frio: { rotulo: 'Frio', icone: '❄️', cor: () => css('--temp-frio') },
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}) => {
  const n = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};

/* ══════════════════════ Tooltip ══════════════════════ */

const dica = $('#dica');
function mostrarDica(html, evt) {
  dica.innerHTML = html;
  dica.classList.add('visivel');
  dica.setAttribute('aria-hidden', 'false');
  moverDica(evt);
}
function moverDica(evt) {
  const r = dica.getBoundingClientRect();
  let x = evt.clientX + 14;
  let y = evt.clientY - r.height - 10;
  if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
  if (y < 8) y = evt.clientY + 18;
  dica.style.left = `${x}px`;
  dica.style.top = `${y}px`;
}
function esconderDica() {
  dica.classList.remove('visivel');
  dica.setAttribute('aria-hidden', 'true');
}
/* Alvo de hover sempre maior que a marca: liga a dica no elemento inteiro. */
function ligarDica(node, html) {
  node.addEventListener('mouseenter', (e) => mostrarDica(html, e));
  node.addEventListener('mousemove', moverDica);
  node.addEventListener('mouseleave', esconderDica);
}

/* ══════════════════════ Estado ══════════════════════ */

let D = null;
let funilAtual = null;

/* ══════════════════════ Derivações ══════════════════════
   Nada de taxa guardada: tudo derivado do volume das etapas.        */

/* Taxa só existe quando as DUAS etapas têm número real. Uma etapa sem fonte
   não vira zero nem é pulada em silêncio — a taxa simplesmente não existe. */
const taxaEtapa = (etapas, i) => {
  if (i === 0) return null;
  const a = etapas[i - 1].valor, b = etapas[i].valor;
  if (a === null || b === null || !a) return null;
  return b / a;
};

/* Ticks em números redondos: o passo sai de 1/2/2,5/5/10 × 10^k, nunca de
   uma divisão do máximo (que produz eixo com 1.125 e ninguém lê isso). */
function escalaRedonda(bruto, alvoTicks = 4) {
  const cru = bruto / alvoTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(cru)));
  const passo = [1, 2, 2.5, 5, 10].find((m) => cru <= m * mag) * mag;
  return { passo, max: Math.ceil(bruto / passo) * passo };
}

function resumo(funil) {
  const e = funil.etapas;
  const leads = e.find((x) => x.chave === 'lead').valor;
  const final = e[e.length - 1].valor;
  const pago = funil.investimento !== null && funil.investimento > 0;
  const receita = funil.ticket > 0 && final !== null ? final * funil.ticket : null;

  return {
    leads,
    final,
    receita,
    investimento: funil.investimento,
    cpl: pago && leads ? funil.investimento / leads : null,
    convLeadFim: final !== null && leads ? final / leads : null,
    roas: pago && receita ? receita / funil.investimento : null,
    metaLeads: funil.metaLeads,
    progresso: leads === null ? 0 : Math.min(leads / funil.metaLeads, 1),
  };
}

/* ══════════════════════ Herói + tiles ══════════════════════ */

function renderTopo(funil) {
  const r = resumo(funil);

  $('#heroi-valor').textContent = r.leads === null ? '—' : nf.format(r.leads);
  $('#heroi-medidor').style.width = `${r.progresso * 100}%`;
  $('#heroi-meta').textContent = r.leads === null
    ? `sem fonte conectada · ${funil.nome}`
    : `${pct(r.progresso, 0)} da meta de ${nf.format(r.metaLeads)} leads · ${funil.nome}`;

  const etapaFinal = funil.etapas[funil.etapas.length - 1];

  /* Cada tile diz POR QUE não tem número quando não tem. "—" sem explicação
     faz a Sabina achar que é bug; com a nota, ela sabe o que falta ligar. */
  const semMidia = funil.investimento === null;

  const tiles = [
    semMidia
      ? { rotulo: 'Investimento', valor: '—', nota: 'nenhuma conta de mídia conectada' }
      : { rotulo: 'Investimento', valor: funil.investimento > 0 ? moeda(funil.investimento) : '—',
          nota: funil.investimento > 0 ? 'no período' : 'funil sem mídia paga' },
    { rotulo: 'CPL', valor: r.cpl !== null ? moedaCent(r.cpl) : '—',
      nota: r.cpl !== null ? 'custo por lead' : (semMidia ? 'depende do investimento' : 'sem investimento, sem CPL') },
    { rotulo: `Lead → ${etapaFinal.rotulo}`,
      valor: r.convLeadFim !== null ? pct(r.convLeadFim) : '—',
      nota: r.convLeadFim !== null
        ? `${nf.format(r.final)} de ${nf.format(r.leads)}`
        : `${etapaFinal.rotulo} sem fonte conectada` },
    r.roas !== null
      ? { rotulo: 'ROAS', valor: `${r.roas.toFixed(2).replace('.', ',')}×`, nota: `${moeda(r.receita)} de receita` }
      : { rotulo: 'Receita', valor: r.receita ? moeda(r.receita) : '—',
          nota: funil.ticket > 0 ? 'depende do webhook de pagamento' : 'funil de topo, não de venda' },
  ];

  $('#tiles').innerHTML = tiles.map((t) => `
    <div class="tile">
      <p class="tile__rotulo">${t.rotulo}</p>
      <p class="tile__valor">${t.valor}</p>
      <p class="tile__delta">${t.nota}</p>
    </div>`).join('');
}

/* ══════════════════════ Funil ══════════════════════ */

function renderFunil(funil) {
  const etapas = funil.etapas;
  const corpo = $('#funil-corpo');
  corpo.innerHTML = '';

  /* Largura em log: linear faria "Compra: 47" sumir ao lado de 148.500.
     A largura ordena; o número e a taxa carregam a leitura real.
     Etapas sem fonte ficam fora da escala — não têm número para posicionar. */
  const comValor = etapas.filter((e) => e.valor !== null);
  const logs = new Map(comValor.map((e) => [e.chave, Math.log10(Math.max(e.valor, 1))]));
  const vals = [...logs.values()];
  const maxL = Math.max(...vals, 0), minL = Math.min(...vals, 0);
  const largura = (l) => 42 + ((l - minL) / (maxL - minL || 1)) * 58;   // 42%..100%

  etapas.forEach((etapa, i) => {
    const taxa = taxaEtapa(etapas, i);
    const est = ESTADO[etapa.estado];
    const cor = css(`--funil-${Math.min(i + 1, 7)}`);
    const vazia = etapa.valor === null;

    const linha = document.createElement('div');
    linha.className = 'funil__linha';

    let comparativo = '<span class="funil__media">—</span>';
    if (taxa !== null && etapa.media != null) {
      const diff = taxa - etapa.media;
      const classe = diff >= 0 ? 'acima' : 'abaixo';
      comparativo = `<span class="funil__media funil__media--${classe}">${diff >= 0 ? '▲' : '▼'} ${pct(Math.abs(diff))}</span>`;
    }

    /* Etapa sem fonte vira trilho fantasma: mantém o lugar na sequência (a
       etapa existe, só não é medida) sem desenhar volume que não foi medido. */
    let trilho;
    if (vazia) {
      trilho = `<div class="funil__trilho">
          <div class="funil__barra funil__barra--vazia" style="width:100%"></div>
          <span class="funil__valor funil__valor--vazio">não instrumentado</span>
        </div>`;
    } else {
      const larg = largura(logs.get(etapa.chave));
      const texto = nf.format(etapa.valor);
      const cabeDentro = larg > 50 || texto.length <= 4;
      const claro = i < 3;   /* os 3 primeiros degraus da rampa são claros */
      trilho = `<div class="funil__trilho">
          <div class="funil__barra" style="width:${larg}%;background:${cor};${cabeDentro ? '' : 'justify-content:flex-start;padding-right:0'}">
            ${cabeDentro ? `<span class="funil__valor" style="color:${claro ? 'var(--marca-preto)' : 'var(--marca-branco)'}">${texto}</span>` : ''}
          </div>
          ${cabeDentro ? '' : `<span class="funil__valor" style="margin-left:var(--space-3)">${texto}</span>`}
        </div>`;
    }

    linha.innerHTML = `
      <div class="funil__etapa">${etapa.rotulo}</div>
      ${trilho}
      <div class="${taxa === null ? 'funil__taxa funil__taxa--vazia' : 'funil__taxa'}">${taxa === null ? '—' : pct(taxa)}</div>
      <div>${comparativo}</div>
      <div class="fonte"><span class="fonte__ponto ${est.classe}" role="img" aria-label="${est.rotulo}">${est.icone}</span> ${etapa.fonte}</div>`;

    const anterior = etapas[i - 1];
    const perda = taxa === null ? null : anterior.valor - etapa.valor;
    ligarDica(linha, `
      <span class="dica__titulo">${etapa.rotulo}</span>
      ${vazia ? 'sem fonte conectada' : `${nf.format(etapa.valor)} ${etapa.chave === 'impressoes' ? 'impressões' : 'pessoas'}`}<br>
      ${taxa === null
        ? (i === 0 ? 'topo do funil' : 'taxa indisponível — falta medir uma das etapas')
        : `${pct(taxa)} da etapa anterior · perdeu ${nf.format(perda)}`}<br>
      <span style="opacity:.7">Fonte: ${etapa.fonte} — ${est.rotulo.toLowerCase()}</span>`);

    corpo.appendChild(linha);
  });

  /* Tabela equivalente — o canal de alívio para contraste e para leitura sem cor. */
  $('#funil-tabela').innerHTML = `
    <thead><tr>
      <th>Etapa</th><th class="num">Volume</th><th class="num">Conversão</th>
      <th class="num">Média</th><th>Fonte</th><th>Estado</th>
    </tr></thead>
    <tbody>${etapas.map((e, i) => {
      const t = taxaEtapa(etapas, i);
      return `<tr>
        <td>${e.rotulo}</td>
        <td class="num">${e.valor === null ? '<span class="sem-dado">—</span>' : nf.format(e.valor)}</td>
        <td class="num">${t === null ? '<span class="sem-dado">—</span>' : pct(t)}</td>
        <td class="num">${e.media == null ? '<span class="sem-dado">—</span>' : pct(e.media)}</td>
        <td>${e.fonte}</td>
        <td>${ESTADO[e.estado].rotulo}</td>
      </tr>`;
    }).join('')}</tbody>`;
}

/* ══════════════════════ Evolução (colunas empilhadas) ══════════════════════ */

function renderEvolucao() {
  const dados = D.EVOLUCAO;
  const svg = $('#g-evolucao');
  svg.innerHTML = '';

  const W = 620, H = 260, M = { t: 14, r: 14, b: 30, l: 44 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  const chaves = ['curso', 'comunidade', 'outros'];

  const totais = dados.map((d) => chaves.reduce((s, k) => s + d[k], 0));
  const { max, passo } = escalaRedonda(Math.max(...totais, 1));
  const y = (v) => M.t + ih - (v / max) * ih;

  /* Grade recessiva: 1px sólida, um passo fora da superfície. */
  for (let v = 0; v <= max; v += passo) {
    svg.appendChild(el('line', { class: 'linha-grade', x1: M.l, x2: M.l + iw, y1: y(v), y2: y(v) }));
    const t = el('text', { x: M.l - 8, y: y(v) + 4, 'text-anchor': 'end' });
    t.textContent = nf.format(v);
    svg.appendChild(t);
  }

  const banda = iw / dados.length;
  const larguraCol = Math.min(24, banda * 0.5);              /* nunca preencher a banda */

  dados.forEach((d, i) => {
    const cx = M.l + banda * i + banda / 2;
    const x = cx - larguraCol / 2;
    let acc = 0;

    chaves.forEach((k) => {
      const v = d[k];
      if (v <= 0) return;
      const y0 = y(acc), y1 = y(acc + v);
      /* gap de 2px em superfície separando os segmentos empilhados */
      const alt = Math.max(y0 - y1 - 2, 1);
      const r = el('rect', {
        class: 'segmento', x, y: y1, width: larguraCol, height: alt,
        fill: SERIES[k].cor(), rx: 2,
      });
      ligarDica(r, `
        <span class="dica__titulo">${d.mes}</span>
        <span class="dica__linha"><span class="dica__chave" style="background:${SERIES[k].cor()}"></span>
        ${SERIES[k].rotulo}: ${nf.format(v)} leads</span>
        <span style="opacity:.7">total do mês: ${nf.format(totais[i])}</span>`);
      svg.appendChild(r);
      acc += v;
    });

    const rotMes = el('text', { x: cx, y: H - 10, 'text-anchor': 'middle' });
    rotMes.textContent = d.mes;
    svg.appendChild(rotMes);

    /* Rótulo direto só no topo da coluna — nunca um número por segmento. */
    if (totais[i] > 0) {
      const tt = el('text', { class: 'rotulo-valor', x: cx, y: y(totais[i]) - 7, 'text-anchor': 'middle' });
      tt.textContent = nf.format(totais[i]);
      svg.appendChild(tt);
    }
  });

  svg.appendChild(el('line', { class: 'eixo', x1: M.l, x2: M.l + iw, y1: y(0), y2: y(0) }));

  $('#legenda-evolucao').innerHTML = chaves.map((k) =>
    `<span class="legenda__item"><span class="chave" style="background:${SERIES[k].cor()}"></span>${SERIES[k].rotulo}</span>`).join('');

  $('#evolucao-tabela').innerHTML = `
    <thead><tr><th>Mês</th>${chaves.map((k) => `<th class="num">${SERIES[k].rotulo}</th>`).join('')}<th class="num">Total</th></tr></thead>
    <tbody>${dados.map((d, i) =>
      `<tr><td>${d.mes}</td>${chaves.map((k) => `<td class="num">${nf.format(d[k])}</td>`).join('')}<td class="num">${nf.format(totais[i])}</td></tr>`).join('')}</tbody>`;
}

/* ══════════════════════ Temperatura (100% empilhado) ══════════════════════ */

function renderTemperatura() {
  const dados = D.TEMPERATURA;
  const svg = $('#g-temperatura');
  svg.innerHTML = '';

  const W = 380, H = 260, M = { t: 14, r: 14, b: 30, l: 38 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  const chaves = ['quente', 'morno', 'frio'];
  const y = (v) => M.t + ih - (v / 100) * ih;

  for (let v = 0; v <= 100; v += 25) {
    svg.appendChild(el('line', { class: 'linha-grade', x1: M.l, x2: M.l + iw, y1: y(v), y2: y(v) }));
    const t = el('text', { x: M.l - 8, y: y(v) + 4, 'text-anchor': 'end' });
    t.textContent = `${v}%`;
    svg.appendChild(t);
  }

  const banda = iw / dados.length;
  const larguraCol = Math.min(24, banda * 0.46);

  dados.forEach((d, i) => {
    const cx = M.l + banda * i + banda / 2;
    const x = cx - larguraCol / 2;
    let acc = 0;

    chaves.forEach((k) => {
      const v = d[k];
      const y0 = y(acc), y1 = y(acc + v);
      const alt = Math.max(y0 - y1 - 2, 1);
      const r = el('rect', { class: 'segmento', x, y: y1, width: larguraCol, height: alt, fill: TEMPS[k].cor(), rx: 2 });
      ligarDica(r, `
        <span class="dica__titulo">${d.mes}</span>
        <span class="dica__linha"><span class="dica__chave" style="background:${TEMPS[k].cor()}"></span>
        ${TEMPS[k].icone} ${TEMPS[k].rotulo}: ${v}% da base</span>`);
      svg.appendChild(r);
      acc += v;
    });

    const rotMes = el('text', { x: cx, y: H - 10, 'text-anchor': 'middle' });
    rotMes.textContent = d.mes;
    svg.appendChild(rotMes);
  });

  svg.appendChild(el('line', { class: 'eixo', x1: M.l, x2: M.l + iw, y1: y(0), y2: y(0) }));

  $('#legenda-temperatura').innerHTML = chaves.map((k) =>
    `<span class="legenda__item"><span class="chave" style="background:${TEMPS[k].cor()}"></span>${TEMPS[k].icone} ${TEMPS[k].rotulo}</span>`).join('');

  $('#temperatura-tabela').innerHTML = `
    <thead><tr><th>Mês</th>${chaves.map((k) => `<th class="num">${TEMPS[k].icone} ${TEMPS[k].rotulo}</th>`).join('')}</tr></thead>
    <tbody>${dados.map((d) =>
      `<tr><td>${d.mes}</td>${chaves.map((k) => `<td class="num">${d[k]}%</td>`).join('')}</tr>`).join('')}</tbody>`;
}

/* ══════════════════════ Campanhas ══════════════════════ */

function renderCampanhas(slugFunil) {
  const linhas = D.CAMPANHAS
    .filter((c) => slugFunil === 'todos' || c.funil === slugFunil)
    .sort((a, b) => b.leads - a.leads);

  const corFunil = (f) => (f === 'curso-low-ticket' ? SERIES.curso.cor() : SERIES.comunidade.cor());
  const nomeFunil = (f) => (f === 'curso-low-ticket' ? 'Curso' : 'Comunidade');

  $('#campanhas-tabela').innerHTML = `
    <thead><tr>
      <th>Origem / mídia</th><th>Campanha</th><th>Funil</th>
      <th class="num">Leads</th><th class="num">Custo</th><th class="num">CPL</th>
      <th class="num">Vendas</th><th class="num">Conv.</th>
    </tr></thead>
    <tbody>${linhas.map((c) => {
      const cpl = c.custo > 0 ? moedaCent(c.custo / c.leads) : '<span class="sem-dado">—</span>';
      const conv = c.vendas > 0 ? pct(c.vendas / c.leads) : '<span class="sem-dado">—</span>';
      return `<tr>
        <td>${c.source} <span class="sem-dado">/ ${c.medium}</span></td>
        <td>${c.campaign}</td>
        <td><span class="pilula"><span class="chave" style="background:${corFunil(c.funil)}"></span>${nomeFunil(c.funil)}</span></td>
        <td class="num">${nf.format(c.leads)}</td>
        <td class="num">${c.custo > 0 ? moeda(c.custo) : '<span class="sem-dado">—</span>'}</td>
        <td class="num">${cpl}</td>
        <td class="num">${c.vendas > 0 ? nf.format(c.vendas) : '<span class="sem-dado">—</span>'}</td>
        <td class="num">${conv}</td>
      </tr>`;
    }).join('')}</tbody>`;
}

/* ══════════════════════ Exportar ══════════════════════ */

function exportarCSV() {
  const f = D.FUNIS[funilAtual];
  const linhas = [['etapa', 'volume', 'conversao', 'media', 'fonte', 'estado']];
  f.etapas.forEach((e, i) => {
    const t = taxaEtapa(f.etapas, i);
    linhas.push([e.rotulo, e.valor, t === null ? '' : (t * 100).toFixed(2), e.media == null ? '' : (e.media * 100).toFixed(2), e.fonte, ESTADO[e.estado].rotulo]);
  });
  const csv = linhas.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `torre-${funilAtual}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════ Boot ══════════════════════ */

function selecionar(slug) {
  funilAtual = slug;
  renderTopo(D.FUNIS[slug]);
  renderFunil(D.FUNIS[slug]);
  renderCampanhas(slug);
}

/* O aviso do topo descreve o estado REAL da fonte. Dois estados agora: ligado
   (lendo do Postgres) ou sem conexão (serviço fora do ar). Nunca "demonstração"
   — não há mais número fabricado para demonstrar. */
function renderAviso() {
  const bloco = document.querySelector('.aviso');
  const aviso = document.querySelector('.aviso__texto');
  const icone = document.querySelector('.aviso__icone');

  if (D.erro) {
    bloco.classList.add('aviso--erro');
    icone.textContent = '○';
    aviso.innerHTML =
      `<strong>Sem conexão com a base.</strong> Não consegui ler os leads — o serviço de ingestão ` +
      `precisa estar no ar: <code>node plataforma/ingest/servidor.mjs</code>. ` +
      `Nada é exibido com número de exemplo.`;
    return;
  }

  bloco.classList.add('aviso--vivo');
  icone.textContent = '●';
  aviso.innerHTML =
    `<strong>Dados reais, ao vivo.</strong> Os leads vêm do Postgres pelo serviço de ingestão. ` +
    `As etapas de tráfego e de pagamento aparecem como “não instrumentado” porque ainda não têm fonte — ` +
    `a lacuna é honesta, melhor que um número inventado.`;
}

async function iniciar() {
  D = await carregarDados();
  renderAviso();

  const sel = $('#sel-funil');
  sel.innerHTML = Object.values(D.FUNIS)
    .map((f) => `<option value="${f.slug}">${f.nome}</option>`).join('');
  sel.addEventListener('change', (e) => selecionar(e.target.value));

  /* Sem conexão: o aviso já explicou. Renderizar gráficos vazios só encheria a
     tela de "—". */
  selecionar(Object.keys(D.FUNIS)[0]);
  if (!D.erro) {
    renderEvolucao();
    renderTemperatura();
  }

  $('#btn-exportar').addEventListener('click', exportarCSV);

  /* O período ainda não filtra nada — dizer isso é melhor que fingir. */
  $('#sel-periodo').addEventListener('change', (e) => {
    if (e.target.value !== '30') {
      alert('O filtro de período ainda não está ligado — a agregação por data entra numa próxima etapa.\nPor ora a tela mostra a base inteira.');
      e.target.value = '30';
    }
  });

  ligarNavegacao();
}

/* ══════════════════════ Navegação entre vistas ══════════════════════
   Duas vistas na mesma página (Torre e Expert List); a barra lateral troca
   qual está visível. A Expert List inicializa só na primeira vez que é aberta
   — não faz sentido buscar a base inteira antes de alguém pedir. */
let expertIniciado = false;

function trocarVista(vista, scrollPara) {
  document.querySelectorAll('.view').forEach((v) => {
    v.hidden = v.id !== `view-${vista}`;
  });

  /* aria-current marca a vista ativa. "Visão geral" é o item canônico da Torre
     (os outros itens Torre são atalhos de rolagem, não recebem o marcador). */
  const ativo = vista === 'expert' ? '[data-view="expert"]' : '[href="#"]';
  document.querySelectorAll('.nav__item').forEach((a) => a.removeAttribute('aria-current'));
  document.querySelector(`.nav__item${ativo}`)?.setAttribute('aria-current', 'page');

  if (vista === 'expert' && !expertIniciado) {
    expertIniciado = true;
    iniciarExpert();
  }

  if (scrollPara) document.getElementById(scrollPara)?.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ligarNavegacao() {
  /* Delegação: pega tanto os itens da nav quanto os links `data-scroll` que
     aparecem dentro do conteúdo (ex.: "Ver o que falta ligar ↓" no aviso). */
  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-view], [data-scroll]');
    if (!alvo) return;
    const vista = alvo.dataset.view;
    const scroll = alvo.dataset.scroll;
    if (!vista && !scroll) return;
    e.preventDefault();
    trocarVista(vista || 'torre', scroll);
  });
}

iniciar();
