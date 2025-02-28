/** @format */

import CodeBlock from '@/components/custom/CodeBlock'

export default function HomePage() {
    const jsCode = `const hello = 'Hello, world!';\nconsole.log(hello);`
    const cssCode = `body { background-color: #f0f0f0; }`
    const htmlCode = `<div>Hello, world!</div>`
    const reactCode = `const App = () => <h1>Hello, world!</h1>;`

    return (
        <div>
            <h1>Code Examples</h1>
            <h2>JavaScript</h2>
            <CodeBlock codeString={jsCode} language="javascript" />
            <h2>CSS</h2>
            <CodeBlock codeString={cssCode} language="css" />
            <h2>HTML</h2>
            <CodeBlock codeString={htmlCode} language="html" />
            <h2>React</h2>
            <CodeBlock codeString={reactCode} language="jsx" />
        </div>
    )
}
