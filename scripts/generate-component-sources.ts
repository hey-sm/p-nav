/** @format */

import * as fs from 'fs'
import * as path from 'path'

const ANIMATIONS_DIR = path.join(process.cwd(), 'src/app/animations')

async function generateSourceFile(componentDir: string) {
    try {
        const componentPath = path.join(componentDir, 'component.tsx')
        const examplePath = path.join(componentDir, 'example.tsx')

        const componentCode = await fs.promises.readFile(componentPath, 'utf-8')
        const exampleCode = await fs.promises.readFile(examplePath, 'utf-8')

        const sourceData = {
            component: {
                code: componentCode,
                language: 'tsx',
                path: componentPath
            },
            example: {
                code: exampleCode,
                language: 'tsx',
                path: examplePath
            }
        }

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

async function main() {
    const dirs = await fs.promises.readdir(ANIMATIONS_DIR)

    for (const dir of dirs) {
        const componentDir = path.join(ANIMATIONS_DIR, dir)
        const stat = await fs.promises.stat(componentDir)

        if (stat.isDirectory()) {
            await generateSourceFile(componentDir)
        }
    }
}

main().catch(console.error)
