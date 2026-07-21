import { resolve } from 'path';
import { defineConfig } from 'vite';

/**
 * Build multipágina.
 *
 * Por padrão o Vite só empacota `index.html`. Sem estas duas entradas a
 * `obrigado.html` — que é o redirect pós-pagamento configurado na Kiwify —
 * simplesmente não entraria no `dist/`, e o comprador cairia num 404
 * logo depois de pagar.
 */
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        obrigado: resolve(__dirname, 'obrigado.html'),
      },
    },
  },
});
