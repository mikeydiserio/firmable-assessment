import { defineProject } from 'vitest/config'

export const viteConfig = defineProject({
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/samples/**'],
    globals: true,
    restoreMocks: true,
    unstubGlobals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 10_000,
    typecheck: {
      include: ['**/*.test-d.?(c|m)ts?(x)'],
    },
  },
})

export default viteConfig
