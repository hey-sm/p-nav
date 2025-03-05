/** @format */

'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeBlockProps {
    codeString: string
    language: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ codeString, language }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(codeString)
        setCopied(true)
        setTimeout(() => setCopied(false), 500)
    }

    return (
        <div className="relative">
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-4 hover:bg-slate-100"
                onClick={copyToClipboard}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={copied ? 'check' : 'copy'}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        {copied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </Button>
            <SyntaxHighlighter language={language} style={oneLight}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock
