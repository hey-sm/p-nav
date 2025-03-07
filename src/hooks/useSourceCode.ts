/** @format */

import { useState, useEffect } from 'react'

interface SourceFile {
    code: string
    language: string
    path: string
}

interface ComponentSource {
    [key: string]: SourceFile
}

export function useSourceCode() {
    const [source, setSource] = useState<ComponentSource | null>(null)

    useEffect(() => {
        const loadSource = async () => {
            try {
                // 从当前路径获取组件路径
                const path = window.location.pathname.replace(/^\//, '')
                const response = await fetch(`/api/source?path=${path}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to load source')
                }

                setSource(data)
            } catch (error) {
                console.error('Error loading source code:', error)
                setSource(null)
            }
        }

        loadSource()
    }, [])

    return source
}
