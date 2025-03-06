/** @format */

import { CodePreviewTabs } from '@/components/custom/previewCode/code-preview-tabs'
import Demo from './example'

export default function ExamplePage() {
    return (
        <div className="container mx-auto p-4 w-4xl">
            <CodePreviewTabs sourceKey="animations/rippleButton">
                <Demo />
            </CodePreviewTabs>
        </div>
    )
}
