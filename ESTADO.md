# ESTADO — sabina-deweik
_atualizado: 2026-07-23 por /encerrar_

## Onde paramos
Edições da **LP da comunidade** ("Futuro Com Sabina") concluídas, verificadas com `qualidade-web`
(render OK, 0 erros de console, SEO/perf/a11y OK) e **commitadas** junto deste ESTADO. Copy do H1 fechada
como `O futuro não é singular. É plural.` (frase da Sabina). O resto do projeto `atualizar-pagina-comunidade`
segue gated na revisão de copy da Sabina + agência Kiro.

## Próximo passo
Decidir a **pendência do nome da marca**: manter "Futuro com Sabina" ou pluralizar para "Futuros com Sabina"
no marquee/label/`<title>`/meta (hoje ainda singular, de propósito). Em paralelo, o buraco maior do cliente
continua sendo `/map:triagem` + pilares 1 e 3 vazios. Publicar a LP (Pages) quando a Sabina/Kiro fecharem.

## Threads abertas / decisões pendentes
- **Copy do H1 da hero:** decidir entre a atual (`O futuro não é singular. É plural.`, frase de assinatura
  da Sabina) e as variações B (cadência literal) / C (substantivo "futuros" em destaque).
- **Nome da comunidade no plural?** Ricardo disse "futuros com Sabina" (imagem); página ainda singular em
  marquee, label da hero, `<title>` e meta. Renomear é decisão de marca — não tocada, ecoa na identidade da Kiro.
- **`plano-de-execucao.md` tem seção "A confirmar"**: reformular copy de abertura e enxugar "Dois canais"
  (só WhatsApp?) — cortes ambíguos da transcrição, aguardam validação na tela com a Sabina.
- Copy da página inteira: a Sabina revisa tudo e reporta à Kiro — a lista atual não é exaustiva.
- Ícone/imagem "Futuros com Sabina" e faixa de **logos**: pedidos à agência (Kiro), pendentes.
- Artefatos de marketing em validação; repo público (cuidado com `raw/` e dados pessoais).

## Realizado / entregas
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
- 2026-07-23 — LP comunidade: extraída da transcrição a lista completa de mudanças, corrigido o plano,
  aplicadas 2 edições no `index.html` (remoção do stake + H1 no plural), rodado `qualidade-web` e commitado.
  Pendente: decisão do nome da marca (plural?).
- 2026-07-23 — `/foco` no alvo; criado este ESTADO.md inicial a partir do repo (não havia bitácora).
