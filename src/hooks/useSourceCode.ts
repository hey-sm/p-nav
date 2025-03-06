/** @format */

import { useState, useEffect } from 'react'

interface SourceFile {
    code: string
    language: string
    path: string
}

interface ComponentSource {
    component: SourceFile
    example: SourceFile
}

export function useSourceCode(componentPath: string) {
    const [source, setSource] = useState<ComponentSource | null>(null)

    useEffect(() => {
        const loadSource = async () => {
            try {
                // 直接从组件目录加载源代码
                const response = await fetch(
                    `/animations/${componentPath}/source.json`
                )
                const sourceCode = await response.json()
                setSource(sourceCode)
            } catch (error) {
                console.error('Error loading source code:', error)
                setSource(null)
            }
        }

        loadSource()
    }, [componentPath])

    return source
}
