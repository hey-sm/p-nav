/** @format */

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
    codeString: string
    language: 'javascript' | 'css' | 'html' | 'jsx' | 'react' // 支持的语言
}

const CodeBlock: React.FC<CodeBlockProps> = ({ codeString, language }) => {
    return (
        <SyntaxHighlighter language={language} style={oneLight}>
            {codeString}
        </SyntaxHighlighter>
    )
}

export default CodeBlock
