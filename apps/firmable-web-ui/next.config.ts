import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next/types'

// Define the base Next.js configuration
const baseConfig: NextConfig = {
	eslint: {
		dirs: ['.'],
	},
	poweredByHeader: false,
	reactStrictMode: true,
}

let configWithPlugins = baseConfig

// Conditionally enable bundle analysis
if (process.env.ANALYZE === 'true') {
	configWithPlugins = withBundleAnalyzer()(configWithPlugins)
}

const nextConfig = configWithPlugins
export default nextConfig
