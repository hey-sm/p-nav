/** @format */

import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const componentPath = url.searchParams.get('path')

        if (!componentPath) {
            return NextResponse.json(
                { error: 'Component path is required' },
                { status: 400 }
            )
        }

        const filePath = path.join(
            process.cwd(),
            'src/app',
            componentPath,
            'source.json'
        )

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: 'Source file not found' },
                { status: 404 }
            )
        }

        const sourceData = await fs.promises.readFile(filePath, 'utf-8')
        return NextResponse.json(JSON.parse(sourceData))
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load source' },
            { status: 500 }
        )
    }
}
