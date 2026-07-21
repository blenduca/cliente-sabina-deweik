/* ============================================
   VISÃO 2026 — Interactions & Animations
   ============================================ */

/* Publica window.pzAtribuicao e já registra o primeiro toque no carregamento.
   Importado por efeito colateral: o Vite empacota e o global fica disponível
   antes de qualquer envio de lead. */
import './atribuicao.js';

/* JS is running: drop the no-js fallback so reveal animations can play. */
document.documentElement.classList.remove('no-js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {

  /* --- Intersection Observer: Reveal on scroll --- */
  const revealElements = document.querySelectorAll('.reveal');

  function revealAll() {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    /* No motion (or no observer support): show everything immediately. */
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    /* Failsafe: if anything is still hidden after 3s (observer never fired
       on a background/headless render), force it visible so no section ships blank. */
    setTimeout(revealAll, 3000);
  }

  /* --- Parallax on scroll (skipped entirely under reduced motion) --- */
  const parallaxElements = prefersReducedMotion
    ? []
    : document.querySelectorAll('[data-parallax]');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (center - viewCenter) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* --- FAQ accordion ---
     O estado do acordeão era só uma classe CSS: quem usa leitor de tela ouvia
     as seis respostas o tempo todo e nunca sabia o que estava aberto. O ARIA é
     ligado aqui, e não no HTML, para atributo e comportamento não divergirem. */
  const faqItems = [...document.querySelectorAll('.faq-item')];

  faqItems.forEach((item, i) => {
    const btn = item.querySelector('.faq-item__question');
    const painel = item.querySelector('.faq-item__answer');
    if (!btn || !painel) return;

    btn.id = btn.id || `faq-q-${i}`;
    painel.id = painel.id || `faq-a-${i}`;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', painel.id);
    painel.setAttribute('role', 'region');
    painel.setAttribute('aria-labelledby', btn.id);
    /* `inert` em vez de `hidden`: tira da árvore de acessibilidade e do Tab sem
       virar `display: none`, que mataria a animação de altura. */
    painel.inert = true;

    btn.addEventListener('click', () => {
      const vaiAbrir = !item.classList.contains('active');

      /* Um por vez: fecha todos antes de abrir o escolhido. */
      faqItems.forEach((outro) => {
        outro.classList.remove('active');
        outro.querySelector('.faq-item__question')?.setAttribute('aria-expanded', 'false');
        const p = outro.querySelector('.faq-item__answer');
        if (p) p.inert = true;
      });

      if (vaiAbrir) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        painel.inert = false;
      }
    });
  });

  /* --- Captura de lead antes do checkout ---
     Todo [data-checkout] abre o modal em vez de ir direto para a Kiwify. O
     lead é registrado ANTES da navegação (quem abandona o pagamento não se
     perde) e os 3 campos seguem no querystring, já preenchidos no checkout.

     ⚠️ O fluxo n8n não está versionado no repo. Este envio usa o mesmo
     webhook da comunidade com `tipo: "Checkout Curso"` — o fluxo precisa
     rotear esse tipo, senão os leads do curso caem no fluxo da comunidade. */
  const CHECKOUT_URL = 'https://pay.kiwify.com.br/82Bzgdr';

  /* Em produção o lead vai para o n8n. Rodando local, vai para o serviço de
     ingestão (plataforma/ingest), que grava direto na Expert List — é assim
     que dá para ver o ciclo inteiro fechar sem depender do n8n nem do banco. */
  const EM_DESENVOLVIMENTO = ['localhost', '127.0.0.1'].includes(location.hostname);
  const LEAD_WEBHOOK = EM_DESENVOLVIMENTO
    ? 'http://localhost:8787/api/lead'
    : 'https://automacao.bagents.cloud/webhook/a286c9fc-bfa8-468b-b44b-46c1256ceeb6';

  /* Host de validação (GitHub Pages): página publicada só para o cliente aprovar
     o design. Não registra lead nem redireciona para o checkout real da Kiwify —
     mandar a Sabina para uma página de pagamento de verdade seria errado. */
  const EM_VALIDACAO = location.hostname.endsWith('github.io');

  const modal = document.getElementById('leadModal');
  const leadForm = document.getElementById('leadForm');

  if (modal && leadForm) {
    const closeBtn = document.getElementById('leadModalClose');
    const submitBtn = document.getElementById('leadSubmit');
    const nomeEl = document.getElementById('lead-nome');
    const emailEl = document.getElementById('lead-email');
    const whatsEl = document.getElementById('lead-whatsapp');
    const consentEl = document.getElementById('lead-consentimento');
    const consentTextoEl = document.getElementById('lead-consentimento-texto');
    const hpEl = document.getElementById('lead-empresa-site');
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let lastFocused = null;
    let ctaOrigem = 'hero';   // qual dos 5 CTAs abriu o modal

    const openModal = (trigger) => {
      lastFocused = trigger || document.activeElement;
      ctaOrigem = trigger?.dataset.cta || 'desconhecido';
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => nomeEl.focus(), 300);

      /* Gancho de instrumentação — a métrica que importa é
         abriu_modal → foi_checkout → compra. Hoje não há GA4/Pixel na página. */
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'abriu_modal', { cta: ctaOrigem });
      }
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('[data-checkout]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(link);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    /* Máscara BR (XX) XXXXX-XXXX — a Kiwify recebe só os dígitos. */
    whatsEl.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 7) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      this.value = v;
    });

    const setError = (id, on) =>
      document.getElementById(id).classList.toggle('has-error', on);

    const validate = () => {
      const semNome = !nomeEl.value.trim();
      const emailRuim = !EMAIL_RE.test(emailEl.value.trim());
      /* 10 dígitos (fixo) ou 11 (celular), sempre com DDD */
      const digitos = whatsEl.value.replace(/\D/g, '');
      const foneRuim = digitos.length < 10 || digitos.length > 11;
      const semConsentimento = !consentEl.checked;

      setError('field-nome', semNome);
      setError('field-email', emailRuim);
      setError('field-whatsapp', foneRuim);
      setError('field-consentimento', semConsentimento);
      return !(semNome || emailRuim || foneRuim || semConsentimento);
    };

    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      /* Pré-visualização: valida como sempre (o cliente vê a experiência), mas
         não registra lead nem vai para o checkout. Botão trava com o aviso. */
      if (EM_VALIDACAO) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Pré-visualização — checkout desativado';
        return;
      }

      const nome = nomeEl.value.trim();
      const email = emailEl.value.trim();
      const telefone = whatsEl.value.replace(/\D/g, '');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Redirecionando…';

      /* Atribuição: primeiro toque imutável + último toque + visitor_id.
         `attr` é o formato que o `pz.lead_intake` do SPEC espera; as colunas
         achatadas são as seis da Expert List, para o n8n gravar sem precisar
         interpretar `attr`. Enviar os dois é o que permite trocar o destino
         depois sem mexer no funil de novo. */
      const attr = window.pzAtribuicao ? window.pzAtribuicao() : null;
      const utms = window.pzAtribuicaoPlana ? window.pzAtribuicaoPlana(attr) : {};

      /* Contrato de payload igual ao da LP da comunidade (o fluxo n8n espera
         estas chaves); o que não se aplica ao curso vai como string vazia. */
      const payload = {
        nome, email,
        whatsapp: whatsEl.value.trim(),
        cidade: '', cargo: '', empresa: '', como_conheceu: '', interesse: '',
        origem: 'Funil Curso — O Mapa das Convergências',
        tipo: 'Checkout Curso',
        cta: ctaOrigem,
        tenant_slug: 'sabina-deweik',
        // = nome da pasta do ativo. Resolve o pz.ativo (FK) no trigger e é a
        // chave de despacho do Roteador do n8n (por ativo_slug, não por tenant).
        ativo_slug: 'funil-curso-low-ticket',
        formulario: 'checkout-curso',
        consentimento: consentEl.checked,
        /* Lido do DOM, não de uma constante: o que viaja é literalmente o texto que
           a pessoa tinha na tela. Reescrever o label muda a prova junto, sem drift. */
        consent_texto: consentTextoEl.textContent.replace(/\s+/g, ' ').trim(),
        empresa_site: hpEl.value,
        ...utms,
        attr,
        event_id: crypto.randomUUID()   /* deduplicação: reenvio não vira 2 leads */
      };

      /* Honeypot preenchido: humano nenhum vê esse campo. Não registra o lead e
         segue para o checkout como se nada fosse — sem erro na tela, porque 4xx
         só ensinaria o bot onde está a armadilha. */
      const ehBot = hpEl.value.trim() !== '';

      /* keepalive: a requisição sobrevive à navegação, então a venda nunca
         espera pelo webhook nem trava se o n8n estiver fora do ar. */
      if (!ehBot) {
        try {
          fetch(LEAD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(() => { /* falha de registro não pode impedir a compra */ });
        } catch (_) { /* idem */ }
      }

      const url = new URL(CHECKOUT_URL);
      url.searchParams.set('name', nome);
      url.searchParams.set('email', email);
      url.searchParams.set('phone', telefone);
      /* Mantém a atribuição na Kiwify. Agora vem do primeiro toque persistido,
         não da URL atual: quem chegou por anúncio, saiu e voltou digitando o
         endereço continua creditado à campanha que o trouxe. */
      Object.entries(utms).forEach(([chave, valor]) => {
        if (valor && chave.startsWith('utm_')) url.searchParams.set(chave, valor);
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'foi_checkout', { cta: ctaOrigem, value: 197, currency: 'BRL' });
      }

      window.location.href = url.toString();
    });
  }

  /* --- Smooth CTA scroll (in-page anchors only; skips [data-checkout]) --- */
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  document.querySelectorAll('a[href^="#"]:not([data-checkout])').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      }
    });
  });

  /* --- Sticky CTA: reveal once the hero has scrolled out of view, hide it
     again over the investment section so it never covers the real price CTA. --- */
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');
  const investment = document.querySelector('#investimento');
  if (stickyCta && hero) {
    let heroVisible = true;
    let investmentVisible = false;

    const syncSticky = () => {
      const show = !heroVisible && !investmentVisible;
      stickyCta.classList.toggle('is-visible', show);
      /* `aria-hidden` sozinho escondia do leitor de tela mas deixava o botão no
         caminho do Tab: dava para focar um CTA invisível. `inert` tira do foco
         e dos eventos junto. */
      stickyCta.inert = !show;
      stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
    };

    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      syncSticky();
    }, { threshold: 0 }).observe(hero);

    if (investment) {
      new IntersectionObserver((entries) => {
        investmentVisible = entries[0].isIntersecting;
        syncSticky();
      }, { threshold: 0.2 }).observe(investment);
    }
  }

  /* --- Counter animation for price (skipped under reduced motion) --- */
  const priceEl = document.querySelector('.investment__price');
  if (priceEl && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const priceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatePrice(priceEl);
            priceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    priceObserver.observe(priceEl);
  }
  /* Reduced motion / no observer: leave the static "R$ 197" from the HTML as-is. */

  function animatePrice(el) {
    const target = 197;
    const duration = 1200;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(ease(progress) * target);
      el.textContent = `R$ ${value}`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
});
