/** @format */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/custom/CodeBlock'
import { getComponentSource } from '@/lib/utils/loadComponentSource'
import { useEffect, useState } from 'react'

interface CodePreviewTabsProps {
    children: React.ReactNode
}

export function CodePreviewTabs({ children }: CodePreviewTabsProps) {
    const [source, setSource] = useState({ code: '', language: 'typescript' })

    useEffect(() => {
        const loadSource = async () => {
            const componentPath = 'cmpt.tsx'
            const sourceData = await getComponentSource(componentPath)
            setSource(sourceData)
        }

        loadSource()
    }, [])

    return (
        <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
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
        </Tabs>
    )
}
