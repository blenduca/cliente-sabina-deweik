/* ==========================================================================
   dados.js — CONTRATO DE DADOS da Torre de Controle
   --------------------------------------------------------------------------
   Único ponto de acoplamento entre a tela e a origem dos números.

   REGRA DESTE ARQUIVO: nenhum número inventado. Tudo o que aparece na tela vem
   do serviço de ingestão (Postgres). O que ainda não tem fonte NÃO ganha um
   valor de exemplo — aparece como "não instrumentado", apontando a lacuna.

   O que é estrutura (config honesta) fica aqui:
     · o desenho do funil (quais etapas, de onde cada uma VIRIA, e o estado da
       integração) — isso é o mapa do que está ligado, não dado falso;
     · as metas que a operação define.
   O que é DADO vem sempre do fetch. Servidor fora do ar → estado de erro
   honesto, nunca número demonstrativo.
   ========================================================================== */

const API = 'http://localhost:8787';

/* Estados de uma fonte de dado:
   conectado : chega sozinho, confiável
   parcial   : chega, mas incompleto
   pendente  : a integração não existe ainda (etapa "não instrumentada")
   manual    : alguém digita                                                */
export const ESTADO = {
  conectado: { rotulo: 'Conectado', icone: '●', classe: 'ok' },
  parcial:   { rotulo: 'Parcial',   icone: '◐', classe: 'warn' },
  pendente:  { rotulo: 'Não instrumentado', icone: '○', classe: 'off' },
  manual:    { rotulo: 'Manual',    icone: '✎', classe: 'manual' },
};

/* --------------------------------------------------------------------------
   ESTRUTURA DO FUNIL (config, não dado).
   Cada etapa declara de onde o número VIRÁ e em que estado está a integração.
   `valor` fica sempre `null` aqui — quem preenche é `carregarDados()`, e só a
   etapa `lead` tem fonte hoje (o Postgres). As outras seguem `null` +
   `estado: pendente`, e a tela as mostra como "não instrumentado".
   -------------------------------------------------------------------------- */
function funil({ slug, nome, tipo, ticket, metaLeads, ativo, etapas }) {
  return { slug, nome, tipo, ticket, metaLeads, ativo, investimento: null,
    etapas: etapas.map((e) => ({ ...e, valor: null, media: null })) };
}

export const FUNIS = {
  'curso-low-ticket': funil({
    slug: 'curso-low-ticket',
    nome: 'Curso — O Mapa das Convergências',
    tipo: 'Low-ticket', ticket: 197, metaLeads: 800,
    ativo: 'vendas/funil-curso-low-ticket',
    etapas: [
      { chave: 'impressoes', rotulo: 'Impressões',  fonte: 'Meta Ads',       estado: 'pendente' },
      { chave: 'cliques',    rotulo: 'Cliques',     fonte: 'Meta Ads',       estado: 'pendente' },
      { chave: 'pageview',   rotulo: 'Page View',   fonte: 'GA4',            estado: 'pendente' },
      { chave: 'modal',      rotulo: 'Abriu modal', fonte: 'GA4 (gtag)',     estado: 'pendente' },
      { chave: 'lead',       rotulo: 'Lead',        fonte: 'Postgres (pz.lead)', estado: 'conectado' },
      { chave: 'checkout',   rotulo: 'Checkout',    fonte: 'Kiwify',         estado: 'pendente' },
      { chave: 'compra',     rotulo: 'Compra',      fonte: 'Kiwify webhook', estado: 'pendente' },
    ],
  }),

  'comunidade': funil({
    slug: 'comunidade',
    nome: 'Comunidade — Futuro Com Sabina',
    tipo: 'Gratuito', ticket: 0, metaLeads: 1500,
    ativo: 'marketing/lp-comunidade-gratuita',
    etapas: [
      { chave: 'impressoes', rotulo: 'Impressões',  fonte: 'Orgânico / IG',  estado: 'pendente' },
      { chave: 'cliques',    rotulo: 'Cliques',     fonte: 'Linktree',       estado: 'pendente' },
      { chave: 'pageview',   rotulo: 'Page View',   fonte: 'GA4',            estado: 'pendente' },
      { chave: 'modal',      rotulo: 'Abriu modal', fonte: 'GA4 (gtag)',     estado: 'pendente' },
      { chave: 'lead',       rotulo: 'Lead',        fonte: 'Postgres (pz.lead)', estado: 'conectado' },
      { chave: 'confirmou',  rotulo: 'Entrou no grupo', fonte: 'WhatsApp',   estado: 'pendente' },
    ],
  }),
};

/* --------------------------------------------------------------------------
   Carga. Busca o real; preenche o que tem fonte; deixa o resto como lacuna.
   -------------------------------------------------------------------------- */
export async function carregarDados() {
  const base = {
    FUNIS,
    EVOLUCAO: [], TEMPERATURA: [], CAMPANHAS: [],
    vivo: null, erro: null,
  };

  let vivo;
  try {
    const r = await fetch(`${API}/api/torre?tenant=sabina-deweik`, { cache: 'no-store' });
    if (!r.ok) throw new Error(`Torre respondeu ${r.status}`);
    vivo = await r.json();
  } catch (e) {
    /* Sem número inventado no lugar: a tela mostra o estado de erro e diz o
       que fazer (subir o serviço de ingestão). */
    base.erro = e.message || 'serviço de ingestão fora do ar';
    return base;
  }

  base.vivo = vivo;
  const resumo = vivo.resumo || {};
  const leadsPorFormulario = resumo.porFormulario || {};

  /* Só a etapa `lead` tem fonte. As demais seguem null → "não instrumentado". */
  const aplicar = (slug, chaveFormulario) => {
    const f = base.FUNIS[slug];
    const etapa = f.etapas.find((e) => e.chave === 'lead');
    if (etapa) etapa.valor = leadsPorFormulario[chaveFormulario] || 0;
  };
  aplicar('curso-low-ticket', 'checkout-curso');
  aplicar('comunidade', 'comunidade');

  /* Evolução REAL, do banco (agregação porMes). */
  base.EVOLUCAO = (resumo.porMes || []).map((m) => ({
    mes: m.mes, curso: m.curso, comunidade: m.comunidade, outros: m.outros,
  }));

  /* Temperatura REAL, composição atual (%). Um ponto — não há série histórica
     de composição no banco, e inventar meses seria número falso. */
  const t = resumo.porTemperatura || {};
  const total = resumo.total || 0;
  if (total > 0) {
    const pct = (n) => Math.round(((n || 0) / total) * 100);
    base.TEMPERATURA = [{
      mes: 'agora', quente: pct(t['🔥 Quente']), morno: pct(t['🌤 Morno']), frio: pct(t['❄️ Frio']),
    }];
  }

  /* Campanhas REAIS (group by UTM). Custo fica null: sem conta de mídia
     conectada, CPL não existe — melhor lacuna que R$ 0,00 enganoso. */
  base.CAMPANHAS = (resumo.campanhas || []).map((c) => ({
    source: c.source, medium: c.medium, campaign: c.campaign,
    funil: c.formulario === 'checkout-curso' ? 'curso-low-ticket' : 'comunidade',
    leads: c.leads, custo: null, vendas: c.compras,
  }));

  return base;
}
