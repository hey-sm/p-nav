/** @format */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/custom/previewCode/CodeBlock'
import { getComponentSource } from '@/lib/utils/loadComponentSource'
import { useEffect, useState } from 'react'

interface CodePreviewTabsProps {
    children: React.ReactNode
}

interface SourceState {
    code: string
    example: string
    language: string
}

export function CodePreviewTabs({ children }: CodePreviewTabsProps) {
    const [source, setSource] = useState<SourceState>({
        code: '',
        example: '',
        language: 'typescript'
    })

    useEffect(() => {
        const loadSource = async () => {
            const componentPath = 'component.tsx'
            const usePath = 'example.tsx'

            const [sourceData, useData] = await Promise.all([
                getComponentSource(componentPath),
                getComponentSource(usePath)
            ])

            setSource({
                code: sourceData.code,
                example: useData.code,
                language: sourceData.language
            })
        }

        loadSource()
    }, [])

    return (
        <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-3">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="example">Example</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-4 border rounded-md">
                {children}
            </TabsContent>
            <TabsContent value="code" className="p-4 border rounded-md">
                <CodeBlock
                    codeString={source.code}
                    language={source.language}
                />
            </TabsContent>
            <TabsContent value="example" className="p-4 border rounded-md">
                <CodeBlock
                    codeString={source.example}
                    language={source.language}
                />
            </TabsContent>
        </Tabs>
    )
}
