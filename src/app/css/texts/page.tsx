/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsDemo() {
    return (
        <Tabs defaultValue="preview" className="">
            <TabsList className="grid w-60  grid-cols-2">
                <TabsTrigger value="preview">preview</TabsTrigger>
                <TabsTrigger value="code">code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <div>preview</div>
            </TabsContent>
            <TabsContent value="code">
                <div>code</div>
            </TabsContent>
        </Tabs>
    )
}
