/** @format */

import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs/promises'
import * as path from 'path'

export async function GET(request: NextRequest) {
    // 只在开发环境中使用
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
            { error: 'This API is only available in development mode' },
            { status: 403 }
        )
    }

    const searchParams = request.nextUrl.searchParams
    const filePath = searchParams.get('path')

    if (!filePath) {
        return NextResponse.json(
            { error: 'File path is required' },
            { status: 400 }
        )
    }

    try {
        const absolutePath = path.join(process.cwd(), filePath)
        const content = await fs.readFile(absolutePath, 'utf-8')
        return NextResponse.json({ content })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to read file', details: (error as Error).message },
            { status: 500 }
        )
    }
}
