/** @format */

'use client'

import * as React from 'react'

import { NavMain } from '@/components/custom/sidebar/nav-main'
import { NavUser } from '@/components/custom/sidebar/nav-user'
import ShinyText from '@/components/reactbits/ShinyText'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from '@/components/ui/sidebar'
import { sidebarData } from '@/config/navigation'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-center">
                    <ShinyText
                        text="p-nav"
                        disabled={false}
                        speed={3}
                        className="custom-class"
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
