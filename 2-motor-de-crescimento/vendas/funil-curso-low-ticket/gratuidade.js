/* ============================================
   Gratuidade — confirmação de acesso dos convidados dos 2 webinars
   ============================================

   Diferença que importa em relação ao script.js do funil de venda: lá o
   cadastro ANTECEDE um pagamento, e a falha do POST é silenciosa de propósito
   (falha de registro não pode impedir uma compra). Aqui o cadastro É a
   conversão — se o envio falhar, a pessoa precisa saber e poder tentar de novo.
   Por isso: `await`, sem `keepalive`, sem `.catch(() => {})`.
   Regra: `.claude/rules/frontend/padrao-ativos-web.md` § Captação de lead. */

/* Publica window.pzAtribuicao e registra o primeiro toque no carregamento. */
import './atribuicao.js';
import { GRATUIDADE_WEBHOOK, EM_VALIDACAO } from './endpoints.js';

document.documentElement.classList.remove('no-js');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Duas linhas de verdade. Curto demais é campo preenchido para passar, não depoimento. */
const DEPOIMENTO_MIN = 40;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gratuidadeForm');
  if (!form) return;

  const submitBtn = document.getElementById('gratuidadeSubmit');
  const nomeEl = document.getElementById('gr-nome');
  const emailEl = document.getElementById('gr-email');
  const whatsEl = document.getElementById('gr-whatsapp');
  const depoEl = document.getElementById('gr-depoimento');
  const contadorEl = document.getElementById('gr-contador');
  const hpEl = document.getElementById('gr-empresa-site');
  const consentEl = document.getElementById('gr-consentimento');
  const consentTextoEl = document.getElementById('gr-consentimento-texto');
  const usoEl = document.getElementById('gr-uso-depoimento');
  const usoTextoEl = document.getElementById('gr-uso-depoimento-texto');
  const statusEl = document.getElementById('gratuidadeStatus');

  const textoLimpo = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
  const rotuloOriginal = submitBtn.innerHTML;

  /* --- Status: um elemento para os três desfechos --- */
  const mostrarStatus = (variante, titulo, corpo) => {
    statusEl.className = `gr-status is-visible gr-status--${variante}`;
    statusEl.innerHTML = `<strong>${titulo}</strong>${corpo}`;
    statusEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  const limparStatus = () => {
    statusEl.className = 'gr-status';
    statusEl.innerHTML = '';
  };

  const restaurarBotao = () => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = rotuloOriginal;
  };

  /* --- Máscara BR (XX) XXXXX-XXXX (mesma do funil de venda) --- */
  whatsEl.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 7) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    this.value = v;
  });

  /* --- Contador do depoimento: mostra o que falta, não o que já foi escrito --- */
  const atualizarContador = () => {
    const n = depoEl.value.trim().length;
    contadorEl.textContent = n >= DEPOIMENTO_MIN ? '' : `faltam ${DEPOIMENTO_MIN - n} caracteres`;
  };
  depoEl.addEventListener('input', atualizarContador);
  atualizarContador();

  const setError = (id, on) =>
    document.getElementById(id).classList.toggle('has-error', on);

  /* Validação no cliente é UX, não segurança — quem decide de verdade é o fluxo. */
  const validate = () => {
    const semNome = !nomeEl.value.trim();
    const emailRuim = !EMAIL_RE.test(emailEl.value.trim());
    /* 10 dígitos (fixo) ou 11 (celular), sempre com DDD */
    const digitos = whatsEl.value.replace(/\D/g, '');
    const foneRuim = digitos.length < 10 || digitos.length > 11;
    const depoCurto = depoEl.value.trim().length < DEPOIMENTO_MIN;
    const semConsentimento = !consentEl.checked;

    setError('field-nome', semNome);
    setError('field-email', emailRuim);
    setError('field-whatsapp', foneRuim);
    setError('field-depoimento', depoCurto);
    setError('field-consentimento', semConsentimento);
    return !(semNome || emailRuim || foneRuim || depoCurto || semConsentimento);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparStatus();
    if (!validate()) return;

    /* Pré-visualização no GitHub Pages: a página está publicada só para aprovação
       de design. Criar acesso de verdade a partir dali seria errado. */
    if (EM_VALIDACAO) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Pré-visualização — envio desativado';
      return;
    }

    /* Honeypot preenchido = robô. Segue para a página de obrigado sem enviar
       nada: responder erro só ensinaria ao robô que o campo é armadilha.
       O fluxo tem a mesma guarda, para quem posta direto no webhook. */
    if (hpEl.value.trim() !== '') {
      window.location.href = 'obrigado.html?origem=gratuidade';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Confirmando…';

    const attr = window.pzAtribuicao ? window.pzAtribuicao() : null;
    const utms = window.pzAtribuicaoPlana ? window.pzAtribuicaoPlana(attr) : {};

    /* Contrato compartilhado com plataforma/ — chaves fixas; campo que não se
       aplica vai '' em vez de sumir, para não quebrar o fluxo n8n a jusante. */
    const payload = {
      nome: nomeEl.value.trim(),
      email: emailEl.value.trim(),
      whatsapp: whatsEl.value.trim(),
      cidade: '', cargo: '', empresa: '', como_conheceu: '', interesse: '',
      origem: 'Gratuidade — Convidados dos 2 webinars 2026',
      tipo: 'Acesso Gratuito',
      cta: 'gratuidade',
      tenant_slug: 'sabina-deweik',
      ativo_slug: 'funil-curso-low-ticket',
      formulario: 'gratuidade-webinars',
      consentimento: consentEl.checked,
      consent_texto: textoLimpo(consentTextoEl),
      depoimento: depoEl.value.trim(),
      uso_depoimento: usoEl.checked,
      uso_depoimento_texto: textoLimpo(usoTextoEl),
      empresa_site: hpEl.value,
      ...utms,
      attr,
      event_id: crypto.randomUUID()   /* deduplicação: reenvio não vira 2 cadastros */
    };

    try {
      const resposta = await fetch(GRATUIDADE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      /* O fluxo responde 200 nos dois vereditos — status HTTP diferente para
         "não está na lista" viraria canal de enumeração. O veredito vem no corpo. */
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();

      if (dados.status === 'autorizado') {
        window.location.href = 'obrigado.html?origem=gratuidade';
        return;
      }

      if (dados.status === 'nao_encontrado') {
        restaurarBotao();
        mostrarStatus(
          'aviso',
          'Não encontramos este e-mail entre os convidados.',
          'Confira se é o mesmo e-mail em que você recebeu o convite da Sabina — o acesso está reservado para ele. ' +
          'Se acha que houve um engano, escreva para <a href="mailto:sabina@sabinadeweik.com.br">sabina@sabinadeweik.com.br</a>.'
        );
        return;
      }

      throw new Error(`resposta inesperada: ${JSON.stringify(dados)}`);
    } catch (erro) {
      restaurarBotao();
      mostrarStatus(
        'erro',
        'Não conseguimos confirmar agora.',
        'Alguma coisa falhou no caminho. Tente enviar de novo em instantes — se continuar, escreva para ' +
        '<a href="mailto:sabina@sabinadeweik.com.br">sabina@sabinadeweik.com.br</a> que a gente libera na mão.'
      );
      console.error('[gratuidade] falha ao confirmar acesso:', erro);
    }
  });
});
