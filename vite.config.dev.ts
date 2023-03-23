import commonConfig from './vite.config.common';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(async ( ) => {
  return {
    ...commonConfig,
    define: {
      global: {},
    },
    server: {
      port:  9000,
      open: true,
    },
    plugins: [
      ...[commonConfig.plugins],
      mkcert()
    ]
  };
});