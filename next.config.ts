/** @format */

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: {
        appIsrStatus: false
    },
    eslint: {
        // 在生产构建时忽略 ESLint 错误
        ignoreDuringBuilds: true
    },
    typescript: {
        // 暂时忽略 TypeScript 错误以便构建
        ignoreBuildErrors: true
    },
    reactStrictMode: false
}

export default nextConfig
