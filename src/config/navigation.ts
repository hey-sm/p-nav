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
            title: '动画',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: '文字渐出',
                    url: '/animations/textFadeIn'
                },
                {
                    title: '水波纹按钮',
                    url: '/animations/rippleButton'
                }
            ]
        },
        {
            title: '前端常见问题',
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: '分页',
                    url: '/solutions/p1 '
                },
                {
                    title: '滚动联动标签',
                    url: '/solutions/p2'
                },
                {
                    title: '国际化',
                    url: '/solutions/p3'
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
