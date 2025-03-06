/** @format */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/custom/previewCode/CodeBlock'
import Demo from './example'
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

export default function ExamplePage() {
    const [source, setSource] = useState<ComponentSource | null>(null)
    const sourceKey = 'animations/rippleButton'

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
    }, [])

    return (
        <div className="container mx-auto p-4 w-4xl">
            <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="component">Code</TabsTrigger>
                    <TabsTrigger value="example">Example</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="p-4 border rounded-md">
                    <Demo />
                </TabsContent>
                <TabsContent
                    value="component"
                    className="p-4 border rounded-md"
                >
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
        </div>
    )
}
