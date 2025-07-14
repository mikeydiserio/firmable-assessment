/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // This is required to build the test files with SWC
    react({ include: /\.(js|jsx|ts|tsx)$/ }),
    viteTsConfigPaths({
      root: "../../",
    }),
  ],

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    deps: {
      // Required for vitest-canvas-mock
      inline: ["vitest-canvas-mock"],
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    setupFiles: "./test-setup.ts",
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
// import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'

// export default defineConfig(() => ({
// 	root: __dirname,
// 	cacheDir: '../../node_modules/.vite/apps/firmable-web-ui',
// 	plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
// 	// Uncomment this if you are using workers.
// 	// worker: {
// 	//  plugins: [ nxViteTsPaths() ],
// 	// },
// 	test: {
// 		watch: false,
// 		globals: true,
// 		environment: 'jsdom',
// 		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
// 		reporters: ['default'],
// 		coverage: {
// 			reportsDirectory: '../../coverage/apps/firmable-web-ui',
// 			provider: 'v8' as const,
// 		},
// 	},
// }))