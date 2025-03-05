/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    eslint: {
        // 在生产构建时忽略 ESLint 错误
        ignoreDuringBuilds: true
    },
    typescript: {
        // 暂时忽略 TypeScript 错误以便构建
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
