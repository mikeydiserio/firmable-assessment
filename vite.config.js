import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    restoreMocks: true,
    unstubGlobals: true,
    passWithNoTests: true,
    environment: 'jsdom',
    reporters: ['default', 'html'],
    outputFile: 'reports/vitest.html',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'c8',
      reportsDirectory: 'coverage',
    },
    // New projects-based workspace configuration
    projects: [
      {
        name: 'firmable-web-ui',
        root: './apps/firmable-web-ui',
        setupFiles: ['./apps/firmable-web-ui/vitest.setup.ts'],
        environment: 'happy-dom',
      },
      // @TODO Packages
      // {
      //   name: 'shared-lib',
      //   root: './libs/shared',
      //   environment: 'node',
      // }
    ]
  },
});
