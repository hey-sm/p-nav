/** @format */

import { CodePreviewTabs } from '@/components/custom/code-preview-tabs'
import { Demo } from './cmpt'
export default function ExamplePage() {
    return (
        <div className="container mx-auto p-4 w-4xl">
            <CodePreviewTabs>
                <Demo />
            </CodePreviewTabs>
        </div>
    )
}
