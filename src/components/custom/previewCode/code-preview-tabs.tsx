/** @format */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/custom/previewCode/CodeBlock'
import { useEffect, useState } from 'react'

interface SourceFile {
    code: string
    language: string
    path: string
}

interface ComponentSource {
    component: SourceFile
    example: SourceFile
}

interface CodePreviewTabsProps {
    sourceKey: string // 例如: 'animations/textFadeIn'
    children: React.ReactNode
}

export function CodePreviewTabs({ sourceKey, children }: CodePreviewTabsProps) {
    const [source, setSource] = useState<ComponentSource | null>(null)

    useEffect(() => {
        const loadSource = async () => {
            try {
                const response = await fetch('/data/source-code.json')
                const sourceCode = await response.json()

                if (!sourceCode[sourceKey]) {
                    throw new Error(`Source code not found for: ${sourceKey}`)
                }

                setSource(sourceCode[sourceKey])
            } catch (error) {
                console.error('Error loading source code:', error)
                setSource(null)
            }
        }

        loadSource()
    }, [sourceKey])

    return (
        <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-3">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="component">Code</TabsTrigger>
                <TabsTrigger value="example">Example</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-4 border rounded-md">
                {children}
            </TabsContent>
            <TabsContent value="component" className="p-4 border rounded-md">
                {source && (
                    <CodeBlock
                        codeString={source.component.code}
                        language={source.component.language}
                    />
                )}
            </TabsContent>
            <TabsContent value="example" className="p-4 border rounded-md">
                {source && (
                    <CodeBlock
                        codeString={source.example.code}
                        language={source.example.language}
                    />
                )}
            </TabsContent>
        </Tabs>
    )
}
