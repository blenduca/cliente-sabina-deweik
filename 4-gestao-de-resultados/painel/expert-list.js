/* ==========================================================================
   expert-list.js — a vista Expert List do painel.
   Implementa `4-gestao-de-resultados/artefatos/painel-expert-list.md`.
   Lê da API de ingestão (plataforma/ingest), que grava e lê no Postgres.

   NÃO roda sozinho: `painel.js` importa `iniciar` e chama quando a vista
   Expert List é aberta pela primeira vez (init preguiçoso). Assim as duas
   vistas dividem o mesmo index.html sem uma pisar na outra.
   ========================================================================== */

const API = 'http://localhost:8787';
const $ = (s) => document.querySelector(s);
const nf = new Intl.NumberFormat('pt-BR');
const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/* Agrupamento de segmentos para as linhas da matriz (§2 da spec). Campeão e
   Cliente fiel andam juntos porque a ação para os dois é a mesma. */
const GRUPOS = [
  { chave: 'nucleo', rotulo: 'Campeão / Fiel', segmentos: ['Campeão', 'Cliente fiel'] },
  { chave: 'promissor', rotulo: 'Promissor', segmentos: ['Promissor'] },
  { chave: 'novo', rotulo: 'Novo', segmentos: ['Novo'] },
  { chave: 'risco', rotulo: 'Em risco / Hibernando', segmentos: ['Em risco', 'Hibernando'] },
  { chave: 'perdido', rotulo: 'Perdido', segmentos: ['Perdido'] },
];

const TEMPS = ['❄️ Frio', '🌤 Morno', '🔥 Quente'];

/* A ação de cada cruzamento. É isto que transforma a matriz de relatório em
   ferramenta: a célula não diz só quantos, diz o que fazer. */
const ACOES = {
  'nucleo|❄️ Frio': { texto: 'reativar', urgente: true },
  'nucleo|🌤 Morno': { texto: 'manter' },
  'nucleo|🔥 Quente': { texto: 'falar hoje', urgente: true },
  'promissor|❄️ Frio': { texto: 'nutrir' },
  'promissor|🌤 Morno': { texto: 'nutrir fundo' },
  'promissor|🔥 Quente': { texto: 'falar hoje', urgente: true },
  'novo|❄️ Frio': { texto: 'onboarding' },
  'novo|🌤 Morno': { texto: 'onboarding' },
  'novo|🔥 Quente': { texto: 'falar hoje', urgente: true },
  'risco|❄️ Frio': { texto: 'reativação' },
  'risco|🌤 Morno': { texto: 'contato pessoal' },
  'risco|🔥 Quente': { texto: 'falar hoje', urgente: true },
  'perdido|❄️ Frio': { texto: 'arquivar' },
  'perdido|🌤 Morno': { texto: '—' },
  'perdido|🔥 Quente': { texto: 'reavaliar' },
};

let LEADS = [];
let filtro = { grupo: null, temperatura: null, busca: '', segmento: '', formulario: '' };

/* ══════════════════════ Carga ══════════════════════ */

async function carregar() {
  const r = await fetch(`${API}/api/expert-list?tenant=sabina-deweik`);
  if (!r.ok) throw new Error(`API respondeu ${r.status}`);
  return r.json();
}

const grupoDe = (lead) =>
  GRUPOS.find((g) => g.segmentos.includes(lead.segmento_rfv))?.chave || 'perdido';

function aplicarFiltro() {
  const b = filtro.busca.trim().toLowerCase();
  return LEADS.filter((l) => {
    if (filtro.grupo && grupoDe(l) !== filtro.grupo) return false;
    if (filtro.temperatura && l.temperatura !== filtro.temperatura) return false;
    if (filtro.segmento && l.segmento_rfv !== filtro.segmento) return false;
    if (filtro.formulario && l.formulario !== filtro.formulario) return false;
    if (b && !`${l.nome} ${l.email} ${l.empresa}`.toLowerCase().includes(b)) return false;
    return true;
  });
}

/* ══════════════════════ Topo ══════════════════════ */

function renderKPIs(resumo) {
  const nucleo = (resumo.porSegmento['Campeão'] || 0) + (resumo.porSegmento['Cliente fiel'] || 0);

  /* "Em risco" vem antes de receita de propósito: é o único indicador da tela
     que representa dinheiro saindo em silêncio. */
  const kpis = [
    { rotulo: 'Contatos na base', valor: nf.format(resumo.total), nota: 'total' },
    { rotulo: '🔥 Quentes', valor: nf.format(resumo.porTemperatura['🔥 Quente'] || 0), nota: 'prontos para conversa agora' },
    { rotulo: 'Campeões + Fiéis', valor: nf.format(nucleo), nota: 'o núcleo que sustenta a receita' },
    { rotulo: 'Em risco', valor: nf.format(resumo.emRisco), nota: 'já compraram e estão sumindo', alerta: resumo.emRisco > 0 },
    { rotulo: 'Receita da base', valor: moeda(resumo.receita), nota: 'soma de valor_total' },
  ];

  $('#kpis').innerHTML = kpis.map((k) => `
    <div class="tile${k.alerta ? ' tile--alerta' : ''}">
      <p class="tile__rotulo">${k.rotulo}</p>
      <p class="tile__valor">${k.valor}</p>
      <p class="tile__delta">${k.nota}</p>
    </div>`).join('');
}

/* ══════════════════════ Matriz temperatura × RFV ══════════════════════ */

function renderMatriz() {
  const conta = (g, t) => LEADS.filter((l) => grupoDe(l) === g && l.temperatura === t).length;
  const max = Math.max(1, ...GRUPOS.flatMap((g) => TEMPS.map((t) => conta(g.chave, t))));

  const cabecalho = `<div class="matriz__linha matriz__linha--cabecalho">
      <span></span>${TEMPS.map((t) => `<span class="matriz__rotulo-col">${t}</span>`).join('')}
    </div>`;

  const linhas = GRUPOS.map((g) => `
    <div class="matriz__linha">
      <span class="matriz__rotulo-linha">${g.rotulo}</span>
      ${TEMPS.map((t) => {
        const n = conta(g.chave, t);
        const acao = ACOES[`${g.chave}|${t}`] || { texto: '' };
        const ativo = filtro.grupo === g.chave && filtro.temperatura === t;
        /* Intensidade só como reforço da contagem — o número é a leitura. */
        const intensidade = n === 0 ? 0 : 0.10 + (n / max) * 0.55;
        return `<button class="matriz__celula${ativo ? ' is-ativa' : ''}${n === 0 ? ' is-vazia' : ''}${acao.urgente && n > 0 ? ' is-urgente' : ''}"
            data-grupo="${g.chave}" data-temp="${t}"
            style="--intensidade:${intensidade}"
            ${n === 0 ? 'disabled' : ''}
            aria-label="${g.rotulo}, ${t}: ${n} contatos — ${acao.texto}">
            <span class="matriz__n">${n}</span>
            <span class="matriz__acao">${acao.texto}</span>
          </button>`;
      }).join('')}
    </div>`).join('');

  $('#matriz').innerHTML = cabecalho + linhas;

  $('#matriz').querySelectorAll('.matriz__celula').forEach((b) => {
    b.addEventListener('click', () => {
      const mesmo = filtro.grupo === b.dataset.grupo && filtro.temperatura === b.dataset.temp;
      filtro.grupo = mesmo ? null : b.dataset.grupo;
      filtro.temperatura = mesmo ? null : b.dataset.temp;
      renderMatriz();
      renderTabela();
    });
  });
}

/* ══════════════════════ Tabela ══════════════════════ */

const COLUNAS_VISIVEIS = [
  { chave: 'temperatura', rotulo: '' },
  { chave: 'nome', rotulo: 'Nome' },
  { chave: 'empresa', rotulo: 'Empresa' },
  { chave: 'cargo', rotulo: 'Cargo' },
  { chave: 'segmento_rfv', rotulo: 'Segmento' },
  { chave: 'rfv', rotulo: 'RFV', num: true },
  { chave: 'situacao', rotulo: 'Situação' },
  { chave: 'valor_total', rotulo: 'Valor', num: true, fmt: (v) => (Number(v) > 0 ? moeda(Number(v)) : '<span class="sem-dado">—</span>') },
  { chave: 'touchpoints', rotulo: 'Toques', num: true },
  { chave: 'ultima_interacao', rotulo: 'Última interação' },
  { chave: 'proxima_acao', rotulo: 'Próxima ação' },
  { chave: 'origem', rotulo: 'Origem' },
];

function renderTabela() {
  const linhas = aplicarFiltro();
  $('#contagem').textContent = linhas.length === LEADS.length
    ? `${nf.format(LEADS.length)} contatos`
    : `${nf.format(linhas.length)} de ${nf.format(LEADS.length)} contatos`;

  $('#limpar').hidden = !(filtro.grupo || filtro.temperatura || filtro.busca || filtro.segmento || filtro.formulario);

  if (linhas.length === 0) {
    $('#tabela').innerHTML = '';
    $('#vazio').hidden = false;
    $('#vazio').textContent = LEADS.length === 0
      ? 'A base está vazia. Cadastre um lead em um dos funis e ele aparece aqui.'
      : 'Nenhum contato com esses filtros.';
    return;
  }
  $('#vazio').hidden = true;

  $('#tabela').innerHTML = `
    <thead><tr>${COLUNAS_VISIVEIS.map((c) => `<th class="${c.num ? 'num' : ''}">${c.rotulo}</th>`).join('')}</tr></thead>
    <tbody>${linhas.map((l) => `<tr>${COLUNAS_VISIVEIS.map((c) => {
      const bruto = l[c.chave] || '';
      const valor = c.fmt ? c.fmt(bruto) : (bruto || '<span class="sem-dado">—</span>');
      return `<td class="${c.num ? 'num' : ''}">${valor}</td>`;
    }).join('')}</tr>`).join('')}</tbody>`;
}

/* ══════════════════════ Agenda ══════════════════════ */

function renderAgenda() {
  const hoje = new Date().toISOString().slice(0, 10);
  const em7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

  const comAcao = LEADS.filter((l) => l.data_proxima_acao);
  const grupos = [
    { rotulo: 'Atrasadas', itens: comAcao.filter((l) => l.data_proxima_acao < hoje), critico: true },
    { rotulo: 'Hoje', itens: comAcao.filter((l) => l.data_proxima_acao === hoje) },
    { rotulo: 'Próximos 7 dias', itens: comAcao.filter((l) => l.data_proxima_acao > hoje && l.data_proxima_acao <= em7) },
    /* O grupo mais importante da tela: contato quente sem próximo passo é a
       falha operacional mais comum e a mais cara. */
    { rotulo: '🔥 Quente sem próxima ação', itens: LEADS.filter((l) => l.temperatura === '🔥 Quente' && !l.proxima_acao), critico: true },
  ];

  $('#agenda').innerHTML = grupos.map((g) => `
    <div class="agenda__grupo${g.critico && g.itens.length ? ' is-critico' : ''}">
      <p class="agenda__titulo">${g.rotulo} <span class="agenda__n">${g.itens.length}</span></p>
      ${g.itens.length === 0
        ? '<p class="agenda__vazio">nada aqui</p>'
        : `<ul class="agenda__lista">${g.itens.slice(0, 6).map((l) =>
            `<li><strong>${l.nome || l.email}</strong>${l.proxima_acao ? ` — ${l.proxima_acao}` : ''}
             <span class="agenda__meta">${l.segmento_rfv} · ${l.temperatura}</span></li>`).join('')}
           ${g.itens.length > 6 ? `<li class="agenda__mais">+${g.itens.length - 6} outros</li>` : ''}</ul>`}
    </div>`).join('');
}

/* ══════════════════════ Filtros ══════════════════════ */

function montarFiltros() {
  const unicos = (chave) => [...new Set(LEADS.map((l) => l[chave]).filter(Boolean))].sort();

  $('#f-segmento').innerHTML = '<option value="">Todos os segmentos</option>' +
    unicos('segmento_rfv').map((s) => `<option value="${s}">${s}</option>`).join('');
  $('#f-formulario').innerHTML = '<option value="">Todos os funis</option>' +
    unicos('formulario').map((s) => `<option value="${s}">${s}</option>`).join('');
}

function exportar() {
  const linhas = aplicarFiltro();
  const colunas = Object.keys(LEADS[0] || {});
  const esc = (v) => (/[",\n]/.test(String(v ?? '')) ? `"${String(v).replace(/"/g, '""')}"` : String(v ?? ''));
  const csv = [colunas.join(','), ...linhas.map((l) => colunas.map((c) => esc(l[c])).join(','))].join('\r\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'expert-list-filtrada.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════ Boot ══════════════════════ */

async function iniciar() {
  try {
    const dados = await carregar();
    LEADS = dados.leads;
    $('#estado-fonte').innerHTML =
      `<span class="fonte__ponto ok">●</span> ${nf.format(LEADS.length)} contatos no Postgres · ` +
      `atualizado ${new Date(dados.gerado_em).toLocaleTimeString('pt-BR')}`;

    montarFiltros();
    renderKPIs(dados.resumo);
    renderMatriz();
    renderTabela();
    renderAgenda();
  } catch (erro) {
    /* Falhar em silêncio aqui seria pior que não ter a tela: a Sabina veria
       uma base vazia e concluiria que perdeu os contatos. */
    $('#estado-fonte').innerHTML = `<span class="fonte__ponto off">○</span> Serviço de ingestão fora do ar`;
    $('#erro').hidden = false;
    $('#erro-detalhe').textContent = erro.message;
    return;
  }

  $('#busca').addEventListener('input', (e) => { filtro.busca = e.target.value; renderTabela(); });
  $('#f-segmento').addEventListener('change', (e) => { filtro.segmento = e.target.value; renderTabela(); });
  $('#f-formulario').addEventListener('change', (e) => { filtro.formulario = e.target.value; renderTabela(); });
  $('#limpar').addEventListener('click', () => {
    filtro = { grupo: null, temperatura: null, busca: '', segmento: '', formulario: '' };
    $('#busca').value = ''; $('#f-segmento').value = ''; $('#f-formulario').value = '';
    renderMatriz(); renderTabela();
  });
  $('#exportar').addEventListener('click', exportar);
  $('#recarregar').addEventListener('click', iniciar);
}

export { iniciar };
