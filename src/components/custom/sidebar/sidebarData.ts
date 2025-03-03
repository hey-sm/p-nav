/** @format */

import {
    BookOpen,
    Bot,
    Home,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal
} from 'lucide-react'
export const sidebarData = {
    user: {
        name: 'ppppp',
        email: '1760967618@qq.com',
        avatar: '/avatar.jpg'
    },
    navMain: [
        {
            title: 'Home',
            url: '/',
            icon: Home
        },
        {
            title: 'CSS 特效',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: '文字',
                    url: '/css/Texts'
                },
                {
                    title: '动画',
                    url: '/css/Animations'
                },
                {
                    title: 'Starred',
                    url: '#'
                },
                {
                    title: 'Settings',
                    url: '#'
                }
            ]
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#'
                },
                {
                    title: 'Explorer',
                    url: '#'
                },
                {
                    title: 'Quantum',
                    url: '#'
                }
            ]
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#'
                },
                {
                    title: 'Get Started',
                    url: '#'
                },
                {
                    title: 'Tutorials',
                    url: '#'
                },
                {
                    title: 'Changelog',
                    url: '#'
                }
            ]
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#'
                },
                {
                    title: 'Team',
                    url: '#'
                },
                {
                    title: 'Billing',
                    url: '#'
                },
                {
                    title: 'Limits',
                    url: '#'
                }
            ]
        },
        {
            title: 'test',
            url: '/test',
            icon: Frame
        }
    ]
}
