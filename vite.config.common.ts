import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
const path = require('path');

const commonConfig: UserConfig = {
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
      exclude: '**/__tests__/*',
      // @ts-ignore
      resolve: {
        alias: {
          '@assets': path.resolve(__dirname, './src/assets'),
          '@components': path.resolve(__dirname, './src/components'),
          '@constants': path.resolve(__dirname, './src/constants'),
          '@hoc': path.resolve(__dirname, './src/hoc'),
          '@hooks': path.resolve(__dirname, './src/hooks'),
          '@features': path.resolve(__dirname, './src/features'),
          '@root': path.resolve(__dirname, './src'),
          '@services': path.resolve(__dirname, './src/services'),
          '@styles': path.resolve(__dirname, './src/styles'),
          '@utils': path.resolve(__dirname, './src/utils'),
        },
      },
      // babel: {
      //   plugins: ['babel-plugin-styled-components'],
      // },
    }),
    tsconfigPaths(),
    svgr({
      exportAsDefault: true,
      include: '**/*.svg',
      exclude: '',
    }),
  ],
};

export default commonConfig;