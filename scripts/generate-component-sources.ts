/** @format */

import * as fs from 'fs'
import * as path from 'path'

const APP_DIR = path.join(process.cwd(), 'src/app')

interface GenerateOptions {
    files: string[]
}

async function generateSourceFile(
    componentDir: string,
    { files }: GenerateOptions
) {
    try {
        const sourceData: { [key: string]: any } = {}

        // 读取每个指定的文件
        for (const file of files) {
            const filePath = path.join(componentDir, `${file}.tsx`)
            const cssPath = path.join(componentDir, `${file}.css`)

            if (fs.existsSync(filePath)) {
                const code = await fs.promises.readFile(filePath, 'utf-8')
                sourceData[file] = {
                    code,
                    language: 'tsx',
                    path: filePath
                }
            } else if (fs.existsSync(cssPath)) {
                const code = await fs.promises.readFile(cssPath, 'utf-8')
                sourceData[file] = {
                    code,
                    language: 'css',
                    path: cssPath
                }
            }
        }

        if (Object.keys(sourceData).length === 0) {
            console.warn(`No source files found in: ${componentDir}`)
            return
        }

        // 生成 source.json
        const outputPath = path.join(componentDir, 'source.json')
        await fs.promises.writeFile(
            outputPath,
            JSON.stringify(sourceData, null, 2)
        )

        console.log(`Generated source file for: ${componentDir}`)
    } catch (error) {
        console.error(`Error generating source for ${componentDir}:`, error)
    }
}

async function scanDirectory(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            // 如果目录包含 component.tsx，认为它是一个组件目录
            if (fs.existsSync(path.join(fullPath, 'component.tsx'))) {
                await generateSourceFile(fullPath, {
                    files: ['component', 'example']
                })
            }
            // 继续扫描子目录
            await scanDirectory(fullPath)
        }
    }
}

async function main() {
    await scanDirectory(APP_DIR)
}

main().catch(console.error)
