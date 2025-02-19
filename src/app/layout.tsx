/** @format */

import type { Metadata } from 'next'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/features/app-sidebar'
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
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    )
}
