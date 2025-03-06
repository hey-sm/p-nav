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
            title: 'test',
            url: '/test',
            icon: Frame
        }
    ]
}
