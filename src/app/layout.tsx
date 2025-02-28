/** @format */

import type { Metadata } from 'next'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/custom/sidebar'
export const metadata: Metadata = {
    title: 'p-nav',
    description: 'navigation for ppppp',
    icons: {
        // 普通浏览器的 favicon
        icon: [
            {
                url: '/favicon.svg',
                type: 'image/svg+xml'
            }
        ],
        // Apple 设备专用图标
        apple: [
            {
                url: '/favicon.svg',
                type: 'image/svg+xml'
            }
        ]
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="flex ">
                <SidebarProvider className="flex flex-1">
                    <AppSidebar />
                    <main className="flex-1">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    )
}
