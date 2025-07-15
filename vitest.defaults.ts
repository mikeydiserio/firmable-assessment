
import { coverageConfigDefaults } from 'vitest/config';

export const vitestBaseConfig = {
  test: {
    globals: true,
    restoreMocks: true,
    unstubGlobals: true,
    passWithNoTests: true,
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, '**/fixtures/'],
      extension: ['.ts', '.tsx', '.js', '.jsx'],
      include: ['src'],

      reporter: process.env.GITHUB_ACTIONS
        ? [['lcov'], ['text'], ['text-summary']]
        : [['lcov']],
    },

    include: ['**/*.test.?(c|m)ts?(x)'],

    reporters: process.env.GITHUB_ACTIONS
      ? [['default', { summary: false }], ['github-actions']]
      : [['default']],

    setupFiles: ['console-fail-test/setup'],

    testTimeout: 10_000,

    typecheck: {
      include: ['**/*.test-d.?(c|m)ts?(x)'],
    },

    watch: false,
  },
}
