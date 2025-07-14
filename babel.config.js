module.exports = {
  presets: [
    'next/babel',
    [
      '@nx/react/babel',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
      },
    ],
  ],
}