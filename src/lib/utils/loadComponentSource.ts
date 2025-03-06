/** @format */

export async function loadComponentSource(filePath: string): Promise<string> {
    if (process.env.NODE_ENV === 'production') {
        // 在生产环境中从生成的 JSON 文件读取
        const response = await fetch('/data/source-code.json')
        const sourceCode = await response.json()

        if (!sourceCode[filePath]) {
            throw new Error(`Source code not found for: ${filePath}`)
        }

        return sourceCode[filePath]
    } else {
        // 开发环境中直接读取文件
        const response = await fetch(
            `/api/source?path=${encodeURIComponent(filePath)}`
        )
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to load source code')
        }

        return data.content
    }
}
