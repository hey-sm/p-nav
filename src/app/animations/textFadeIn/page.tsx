/** @format */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/custom/previewCode/CodeBlock'
import Demo from './example'
import { useSourceCode } from '@/hooks/useSourceCode'

export default function ExamplePage() {
    const source = useSourceCode('textFadeIn')

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
