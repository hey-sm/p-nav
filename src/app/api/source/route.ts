/** @format */

import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('path')

    if (!filePath) {
        return NextResponse.json({ error: 'No path provided' }, { status: 400 })
    }

    try {
        // 获取当前页面的路径
        const currentPath = request.headers.get('referer') || ''
        const urlPath = new URL(currentPath).pathname
        const dirPath = path.join(process.cwd(), 'src/app', urlPath)

        // 构建完整的文件路径
        const fullPath = path.join(dirPath, filePath)

        console.log('Attempting to read file:', fullPath)

        const source = await fs.readFile(fullPath, 'utf-8')
        return new NextResponse(source)
    } catch (error) {
        console.error('Error reading file:', error)
        return NextResponse.json(
            {
                error: 'Failed to read file',
                details:
                    error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
