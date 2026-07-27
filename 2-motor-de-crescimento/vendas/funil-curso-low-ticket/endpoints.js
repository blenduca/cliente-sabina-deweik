/* ============================================
   Endpoints do funil — ponto único de acoplamento
   ============================================

   Regra da instância (`.claude/rules/frontend/desta-instancia.md`):
   "endpoint novo nasce num único módulo, não numa terceira cópia".

   Antes deste arquivo, o par localhost/webhook estava declarado duas vezes
   (`script.js` e `lp-comunidade-gratuita/index.html`). A terceira página do
   funil não repete o padrão: importa daqui.

   ⚠️ A cópia da LP da comunidade AINDA declara os endpoints inline. Quando ela
   for mexida, ela também deve passar a importar deste módulo — não editar os
   valores aqui sem conferir lá. */

/* Rodando local, o lead vai para o serviço de ingestão (plataforma/ingest),
   que grava direto na Expert List — dá para ver o ciclo fechar sem depender
   do n8n nem do banco. Em produção vai para o n8n. */
export const EM_DESENVOLVIMENTO = ['localhost', '127.0.0.1'].includes(location.hostname);

/* Host de validação (GitHub Pages): as páginas são publicadas ali só para o
   cliente aprovar o design. Nenhuma delas dispara POST nem manda ninguém para
   um checkout ou cadastro de verdade. */
export const EM_VALIDACAO = location.hostname.endsWith('github.io');

export const CHECKOUT_URL = 'https://pay.kiwify.com.br/82Bzgdr';

/* Captação de lead do funil de venda (index.html).
   ⚠️ Fluxo n8n LEGADO e não versionado, em `automacao.bagents.cloud`. Está vivo e
   funcionando — não mexer no host dele só por simetria com o de baixo. Discrimina
   por `tipo` no payload. */
export const LEAD_WEBHOOK = EM_DESENVOLVIMENTO
  ? 'http://localhost:8787/api/lead'
  : 'https://automacao.bagents.cloud/webhook/a286c9fc-bfa8-468b-b44b-46c1256ceeb6';

/* Confirmação de acesso gratuito (gratuidade.html).
   Ao contrário do de cima, este é SÍNCRONO: o fluxo responde se o e-mail está
   ou não na lista de convidados, e a página decide o que mostrar.
   Fluxo: `Sabina | Turma | Gratuidade` — ia/n8n/sabina-turma-gratuidade.json

   Host confirmado pelo Ricardo em 27/07: **bn8n**, não `automacao`. Os dois
   coexistem — `automacao` serve o fluxo legado da linha de cima, `bn8n` é a
   instância nova, onde este fluxo é publicado. Não são alias. */
export const GRATUIDADE_WEBHOOK = EM_DESENVOLVIMENTO
  ? 'http://localhost:5678/webhook/sabina-gratuidade'
  : 'https://bn8n.bagents.cloud/webhook/sabina-gratuidade';
