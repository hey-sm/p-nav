/** @format */
'use client'

import { useState, useRef, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// 示例数据 - 简化后只保留id、title和content
const sections = [
    {
        id: 'intro',
        title: '介绍',
        content:
            '这是一个滚动联动标签的示例。当你滚动内容时，活动标签会相应地改变。同样，点击标签也会滚动到相应的部分。'
    },
    {
        id: 'features',
        title: '特性',
        content:
            '此实现包括平滑滚动、交叉观察和正确的标签高亮。它使用交叉观察器API来检测当前哪个部分在视图中。'
    },
    {
        id: 'implementation',
        title: '实现方式',
        content:
            '该实现使用了React钩子，如useRef、useState和useEffect。我们还使用交叉观察器API来检测部分何时进入或离开视口。'
    },
    {
        id: 'customization',
        title: '自定义选项',
        content:
            '你可以自定义外观、滚动行为和激活标签的阈值。标签栏的样式可以根据项目需求进行调整。'
    },
    {
        id: 'conclusion',
        title: '结论',
        content:
            '这种模式对于文档站点、长格式内容以及任何你想帮助用户浏览冗长内容的界面都非常有用。'
    }
]

export default function ScrollLinkedTabs() {
    const [activeSection, setActiveSection] = useState(0)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const componentRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)

    // 初始化Intersection Observer - 用于检测右侧滚动容器中的哪个部分可见
    useEffect(() => {
        const observers: IntersectionObserver[] = []
        const options = {
            root: scrollContainerRef.current,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        }

        sectionRefs.current.forEach((section, index) => {
            if (!section) return

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(index)
                    }
                })
            }, options)

            observer.observe(section)
            observers.push(observer)
        })

        return () => {
            observers.forEach((observer) => observer.disconnect())
        }
    }, [])

    // 监听组件是否在可视区域内并处理滚动联动
    useEffect(() => {
        if (!componentRef.current || !scrollContainerRef.current) return

        // 使用IntersectionObserver检测组件是否在视口中
        const observer = new IntersectionObserver(
            (entries) => {
                // 当组件有一定比例可见时，就启用滚动捕获
                // 降低阈值到0.3，使组件更容易触发滚动
                if (
                    entries[0].isIntersecting &&
                    entries[0].intersectionRatio >= 0.3
                ) {
                    setIsInView(true)
                } else {
                    setIsInView(false)
                }
            },
            {
                // 使用更宽松的阈值配置
                threshold: [0.1, 0.2, 0.3, 0.4, 0.5]
            }
        )

        observer.observe(componentRef.current)

        // 滚动处理函数
        const handleWheel = (e: WheelEvent) => {
            // 如果组件不在视口中，不处理滚动
            if (!isInView) return

            // 获取组件的位置信息
            const rect = componentRef.current?.getBoundingClientRect()
            if (!rect) return

            // 检查组件是否在视口中央区域
            // 使用更宽松的条件，只要组件在视口中部区域就触发滚动
            const isNearCenter =
                // 组件顶部位于视口上半部分
                rect.top <= window.innerHeight * 0.6 &&
                // 组件底部位于视口下半部分
                rect.bottom >= window.innerHeight * 0.4

            // 检查鼠标是否在组件区域内或接近组件
            const isMouseNearComponent =
                // 鼠标直接在组件内部
                (e.clientY >= rect.top && e.clientY <= rect.bottom) ||
                // 或鼠标在组件上方不远处
                (e.clientY < rect.top && e.clientY >= rect.top - 100) ||
                // 或鼠标在组件下方不远处
                (e.clientY > rect.bottom && e.clientY <= rect.bottom + 100)

            // 只要组件接近中心位置，就触发滚动捕获
            if (isNearCenter) {
                // 获取滚动容器
                const container = scrollContainerRef.current
                if (!container) return

                // 检查是否已滚动到边界
                const isAtTop = container.scrollTop <= 5
                const isAtBottom =
                    container.scrollHeight - container.scrollTop <=
                    container.clientHeight + 5

                // 如果到达边界并且仍在滚动，允许页面滚动继续
                if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    // 不阻止默认滚动，允许页面继续滚动
                    return
                }

                // 只有在非边界情况下，才阻止默认滚动并将滚动应用到容器
                e.preventDefault()
                container.scrollTop += e.deltaY
            }
        }

        // 添加滚动事件监听器
        window.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            observer.disconnect()
            window.removeEventListener('wheel', handleWheel)
        }
    }, [isInView])

    // 处理标签点击
    const handleTabClick = (index: number) => {
        setActiveSection(index)
        sectionRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    // 修复ref回调函数的类型问题
    const setRef = (index: number) => (el: HTMLDivElement | null) => {
        sectionRefs.current[index] = el
    }

    // 检测滚动到底部
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget
        const scrollPosition = container.scrollTop + container.clientHeight
        const scrollHeight = container.scrollHeight

        // 如果滚动到接近底部，激活最后一个标签
        if (scrollHeight - scrollPosition < 50) {
            setActiveSection(sections.length - 1)
        }
    }

    return (
        <div className="min-h-[300vh]">
            {/* 顶部内容区域 */}
            <div className="min-h-[100vh] bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-center max-w-2xl mx-auto p-8">
                    <h1 className="text-4xl font-bold mb-6">
                        页面内容顶部区域
                    </h1>
                    <p className="text-lg mb-6">
                        这是页面的顶部区域。向下滚动以查看滚动联动标签组件效果。
                    </p>
                    <p className="text-lg mb-6">
                        滚动联动标签效果将只在组件区域内触发，在此区域前后是普通的页面滚动。
                    </p>
                    <div className="border-2 border-blue-300 p-4 rounded-lg">
                        <p className="text-blue-700">
                            ↓ 继续向下滚动查看滚动联动标签效果 ↓
                        </p>
                    </div>
                </div>
            </div>

            {/* 滚动联动标签组件区域 - 使用CSS sticky定位 */}
            <div className="h-[calc(100vh-4rem)] relative">
                <div
                    ref={componentRef}
                    className={cn(
                        'h-[calc(100vh-4rem)] container mx-auto px-6 py-12',
                        'sticky top-0 left-0 right-0 z-50',
                        'transition-all duration-500 ease-in-out',
                        isInView ? 'bg-blue-50/90 shadow-lg' : 'bg-blue-50/50'
                    )}
                >
                    <div className="flex flex-row h-full gap-6">
                        {/* 左侧标签和内容区域 - 占80% */}
                        <div className="w-[80%] flex flex-col">
                            <h1 className="text-3xl font-bold mb-4">
                                滚动联动标签示例
                            </h1>

                            <Tabs
                                value={String(activeSection)}
                                className="w-full flex flex-col flex-grow"
                                onValueChange={(value) =>
                                    handleTabClick(parseInt(value))
                                }
                            >
                                {/* 横向标签栏 */}
                                <TabsList className="flex flex-row h-auto bg-muted/50 p-1 rounded-lg w-full sticky top-0 z-10">
                                    {sections.map((section, index) => (
                                        <TabsTrigger
                                            key={section.id}
                                            value={String(index)}
                                            className={cn(
                                                'flex-1 px-4 py-3 rounded-md transition-all',
                                                activeSection === index
                                                    ? 'bg-background text-primary font-medium shadow-sm'
                                                    : 'text-muted-foreground hover:bg-muted'
                                            )}
                                        >
                                            {section.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {/* 标签内容区域 */}
                                <div className="mt-6 flex-grow">
                                    {sections.map((section, index) => (
                                        <TabsContent
                                            key={section.id}
                                            value={String(index)}
                                            className="mt-0 h-full"
                                        >
                                            <div className="bg-muted/10 p-6 rounded-lg border border-muted h-full">
                                                <h2 className="text-2xl font-bold mb-4">
                                                    {section.title}
                                                </h2>
                                                <p className="mb-6 text-muted-foreground">
                                                    {section.content}
                                                </p>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </div>

                        {/* 右侧滚动区域 - 占20% */}
                        <div
                            ref={scrollContainerRef}
                            className="w-[20%] overflow-y-auto border-l pl-6"
                            onScroll={handleScroll}
                        >
                            <div className="space-y-16 pb-10">
                                {sections.map((section, index) => (
                                    <div
                                        key={section.id}
                                        ref={setRef(index)}
                                        className={cn(
                                            'transition-all duration-300 py-4',
                                            activeSection === index
                                                ? 'bg-muted/30 rounded-lg px-4 -mx-4'
                                                : ''
                                        )}
                                        style={
                                            index === sections.length - 1
                                                ? { paddingBottom: '100px' }
                                                : {}
                                        }
                                    >
                                        <h3 className="text-xl font-bold mb-3">
                                            {section.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部内容区域 */}
            <div className="min-h-[100vh] bg-gradient-to-b from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-2xl mx-auto p-8">
                    <h1 className="text-4xl font-bold mb-6">
                        页面内容底部区域
                    </h1>
                    <p className="text-lg mb-6">
                        这是页面的底部区域。滚动联动标签组件的效果已结束。
                    </p>
                    <p className="text-lg mb-6">
                        您已经体验了滚动联动标签的效果，这种模式在文档、教程和长内容页面中特别有用。
                    </p>
                    <div className="border-2 border-blue-300 p-4 rounded-lg">
                        <p className="text-blue-700">
                            ↑ 向上滚动再次查看滚动联动标签效果 ↑
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
