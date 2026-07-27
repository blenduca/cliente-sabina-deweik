import { resolve } from 'path';
import { defineConfig } from 'vite';

/**
 * Build multipágina.
 *
 * Por padrão o Vite só empacota `index.html`. Sem estas entradas a
 * `obrigado.html` — que é o redirect pós-pagamento configurado na Kiwify —
 * simplesmente não entraria no `dist/`, e o comprador cairia num 404
 * logo depois de pagar. Vale igual para a `gratuidade.html`, que é o destino
 * do link enviado por e-mail aos convidados dos 2 webinars: página que não
 * entra no build é link morto no e-mail de alguém.
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        obrigado: resolve(__dirname, 'obrigado.html'),
        gratuidade: resolve(__dirname, 'gratuidade.html'),
      },
    },
  },
});
