import { resolve } from 'path'
export default {
    base: '/benzxProj3ct/',
    build: {
        rollupOptions: {
          input: {
            // @ts-ignore
            main: resolve(__dirname, 'index.html'),
            // @ts-ignore
            snake: resolve(__dirname, 'katalog.html'),
            // @ts-ignore
            store: resolve(__dirname, 'shoppingCart.html'),
            // @ts-ignore
            korzina: resolve(__dirname, 'signIn.html'),
            // @ts-ignore
          }
        }
      }
}