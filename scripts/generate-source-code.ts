/** @format */

import * as fs from 'fs'
import * as path from 'path'

// 需要读取源代码的文件路径配置
const COMPONENTS = {
    'animations/textFadeIn': {
        component: 'src/app/animations/textFadeIn/component.tsx',
        example: 'src/app/animations/textFadeIn/example.tsx'
    },
    'animations/rippleButton': {
        component: 'src/app/animations/rippleButton/component.tsx',
        example: 'src/app/animations/rippleButton/example.tsx'
    }
    // 添加其他组件...
}

interface SourceFile {
    code: string
    language: string
    path: string
}

interface ComponentSource {
    component: SourceFile
    example: SourceFile
}

interface SourceCodeMap {
    [key: string]: ComponentSource
}

function getLanguageFromPath(filePath: string): string {
    const ext = path.extname(filePath)
    return ext.slice(1) // 移除点号
}

function generateSourceCode() {
    const sourceCode: SourceCodeMap = {}

    Object.entries(COMPONENTS).forEach(([key, files]) => {
        try {
            const componentPath = files.component
            const examplePath = files.example

            const componentContent = fs.readFileSync(
                path.join(process.cwd(), componentPath),
                'utf-8'
            )
            const exampleContent = fs.readFileSync(
                path.join(process.cwd(), examplePath),
                'utf-8'
            )

            sourceCode[key] = {
                component: {
                    code: componentContent,
                    language: getLanguageFromPath(componentPath),
                    path: componentPath
                },
                example: {
                    code: exampleContent,
                    language: getLanguageFromPath(examplePath),
                    path: examplePath
                }
            }
        } catch (error) {
            console.error(`Error reading files for ${key}:`, error)
        }
    })

    // 确保目标目录存在
    const outputDir = path.join(process.cwd(), 'public', 'data')
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // 写入 JSON 文件
    const outputPath = path.join(outputDir, 'source-code.json')
    fs.writeFileSync(outputPath, JSON.stringify(sourceCode, null, 2))
    console.log('Source code JSON generated successfully!')
}

generateSourceCode()
