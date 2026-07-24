# ESTADO — sabina-deweik
_atualizado: 2026-07-23 por /encerrar_

## Onde paramos
Edições da **LP da comunidade** concluídas e verificadas com `qualidade-web`. A marca foi **renomeada para
"Futuros Com Sabina"** (plural) em todo o visível — marquee, label da hero, `<title>`, og:title, footer,
sticky e modal, e na `obrigado.html`. H1 fechado como `O futuro não é singular. É plural.` (frase da Sabina).
O resto do projeto `atualizar-pagina-comunidade` segue gated na revisão de copy da Sabina + agência Kiro.

## Próximo passo
Há **2 commits locais não enviados** (`0404d75` stake+H1, `9db3ad2` renomeação) — decidir se dá `push`
agora ou espera fechar o resto com a Kiro. Antes, resolver se o valor de rastreio
**`origem: 'LP Comunidade Futuro Com Sabina'`** (`index.html:1889`, contrato de payload com o n8n/plataforma)
também vira plural — deixado singular de propósito para não quebrar continuidade de analytics/roteamento.
Em paralelo, o buraco maior do cliente segue sendo `/map:triagem` + pilares 1 e 3 vazios.

## Threads abertas / decisões pendentes
- **Copy do H1 da hero:** decidir entre a atual (`O futuro não é singular. É plural.`, frase de assinatura
  da Sabina) e as variações B (cadência literal) / C (substantivo "futuros" em destaque).
- **Nome da comunidade → plural: FEITO** ("Futuros Com Sabina" em todo o visível). Resta só o valor de
  `origem` no payload (`:1889`) e o README, deixados no singular — decisão de contrato, não de copy.
- **`plano-de-execucao.md` tem seção "A confirmar"**: reformular copy de abertura e enxugar "Dois canais"
  (só WhatsApp?) — cortes ambíguos da transcrição, aguardam validação na tela com a Sabina.
- Copy da página inteira: a Sabina revisa tudo e reporta à Kiro — a lista atual não é exaustiva.
- Ícone/imagem "Futuros com Sabina" e faixa de **logos**: pedidos à agência (Kiro), pendentes.
- Artefatos de marketing em validação; repo público (cuidado com `raw/` e dados pessoais).

## Realizado / entregas
- 2026-07-23 — LP comunidade: marca renomeada para **"Futuros Com Sabina"** (plural) em todo o visível
  (`index.html` + `obrigado.html`); `origem` de payload mantido singular. Verificado no navegador.
- 2026-07-23 — LP comunidade: removido o bloco `section.stake` ("A volta do humano no centro?", 3 cards)
  + CSS órfão; H1 da hero reescrito para `O futuro não é singular. É plural.` (frase da Sabina). Verificado
  com `qualidade-web` (0 erros de console) e **commitado**.
- 2026-07-23 — `plano-de-execucao.md` do projeto `atualizar-pagina-comunidade` reescrito: alvo da remoção
  corrigido (era "lista de temas", virou o bloco stake), item de logos adicionado, seção "A confirmar" criada.
- 2026-07-17 — Design system (tokens + componentes) e linktree.
- 2026-07-18 — LP comunidade gratuita (LP + obrigado) e funil curso low-ticket.
- 2026-07-19 — Expert List (agora persistida no Postgres `bagents`, não mais CSV) e painel-expert-list (rascunho).
- 2026-07-20 — Repo publicado no GitHub Pages para validação (cliente + designer).
- 2026-07-23 — Transcrição real "MENTORIA AE | SABINA" puxada para `raw/transcricoes/` (teste ao vivo da skill `puxar-transcricoes`).

## Sessões recentes
- 2026-07-23 — LP comunidade: extraída a lista de mudanças da transcrição, corrigido o plano, removido o
  stake, H1 no plural, `qualidade-web`, e a marca renomeada para "Futuros Com Sabina". Dois commits.
  Pendente: valor de `origem` no payload (plural?).
- 2026-07-23 — `/foco` no alvo; criado este ESTADO.md inicial a partir do repo (não havia bitácora).
