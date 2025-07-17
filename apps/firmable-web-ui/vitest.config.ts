/// <reference types="vitest" />
import react from '@vitejs/plugin-react'

import { defineConfig, mergeConfig } from 'vitest/config'
import configShared from '../../vite.config'

export default mergeConfig(
  configShared,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      environment: 'jsdom',
      reporters: ['default', ['junit', { suiteName: 'UI tests' }]],
      outputFile: './coverage/test-output.json',
    },
  }),
)
