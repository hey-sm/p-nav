/** @format */

export async function getComponentSource(path: string) {
    // 移除开头的 @ 或 ./
    const normalizedPath = path.replace(/^[@./]+/, '')

    try {
        // 使用 Next.js 的方式加载文件
        const response = await fetch(`/api/source?path=${normalizedPath}`)
        if (!response.ok) {
            throw new Error('Failed to load source code')
        }

        const source = await response.text()
        // 获取文件扩展名作为语言
        const language = path.split('.').pop() || 'tsx'

        return {
            code: source,
            language
        }
    } catch (error) {
        console.error('Error loading component source:', error)
        return {
            code: '// Error loading source code',
            language: 'typescript'
        }
    }
}
