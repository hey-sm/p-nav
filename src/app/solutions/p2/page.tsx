/** @format */
'use client'

import { useState, useRef, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// 示例数据 - 为每个标签页提供更丰富的内容
const sections = [
    {
        id: 'intro',
        title: '介绍',
        content:
            '这是一个滚动联动标签的示例。当你滚动内容时，活动标签会相应地改变。同样，点击标签也会滚动到相应的部分。',
        details: [
            '这个组件展示了如何创建一个滚动联动的标签界面',
            '当用户滚动右侧内容时，左侧的标签会自动高亮显示当前查看的部分',
            '这种设计模式在文档网站、教程和长篇内容中特别有用'
        ],
        summary:
            '滚动联动标签是提升用户体验的有效方式，尤其适用于内容丰富的页面。'
    },
    {
        id: 'features',
        title: '特性',
        content:
            '此实现包括平滑滚动、交叉观察和正确的标签高亮。它使用交叉观察器API来检测当前哪个部分在视图中。',
        details: [
            '平滑滚动：点击标签时，页面会平滑滚动到相应内容',
            '交叉观察：使用IntersectionObserver API检测可见内容',
            '响应式设计：在各种屏幕尺寸上都能良好工作',
            '可访问性：支持键盘导航和屏幕阅读器'
        ],
        summary: '这些特性共同创造了一个流畅、直观的用户体验。'
    },
    {
        id: 'implementation',
        title: '实现方式',
        content:
            '该实现使用了React钩子，如useRef、useState和useEffect。我们还使用交叉观察器API来检测部分何时进入或离开视口。',
        details: [
            'useState：管理当前活动的标签部分',
            'useRef：引用DOM元素以便观察和滚动',
            'useEffect：设置和清理交叉观察器',
            'IntersectionObserver：检测元素何时进入视口'
        ],
        code: `useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 更新活动标签
      }
    });
  }, options);
  
  // 观察所有部分
  return () => observer.disconnect();
}, []);`,
        summary: '这种实现方式既高效又灵活，可以轻松适应不同的内容结构。'
    },
    {
        id: 'customization',
        title: '自定义选项',
        content:
            '你可以自定义外观、滚动行为和激活标签的阈值。标签栏的样式可以根据项目需求进行调整。',
        details: [
            '调整rootMargin参数来控制何时触发标签切换',
            '修改标签和内容的样式以匹配你的设计系统',
            '添加动画和过渡效果增强视觉反馈',
            '调整滚动行为，如滚动速度和对齐方式'
        ],
        options: {
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0,
            behavior: 'smooth'
        },
        summary: '通过这些自定义选项，你可以使组件完美融入你的应用设计。'
    },
    {
        id: 'conclusion',
        title: '结论',
        content:
            '这种模式对于文档站点、长格式内容以及任何你想帮助用户浏览冗长内容的界面都非常有用。',
        details: [
            '滚动联动标签提高了长内容的可导航性',
            '用户可以更容易地理解内容的结构',
            '这种模式减少了用户的认知负担',
            '实现相对简单，但效果显著'
        ],
        summary:
            '通过实现滚动联动标签，你可以显著提升用户体验，尤其是在内容丰富的应用中。',
        nextSteps:
            '考虑将此模式与其他导航元素结合，如面包屑或进度指示器，以创建更全面的导航体验。'
    }
]

export default function ScrollLinkedTabs() {
    const [activeSection, setActiveSection] = useState(0)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // 初始化Intersection Observer
    useEffect(() => {
        const observers: IntersectionObserver[] = []
        // 修改rootMargin以更好地检测最后一个元素
        const options = {
            root: scrollContainerRef.current,
            rootMargin: '-10% 0px -70% 0px', // 调整这个值来更好地检测底部元素
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
        <div className="flex flex-row h-[calc(100vh-4rem)] container mx-auto p-6 gap-6">
            {/* 左侧标签和内容区域 - 占80% */}
            <div className="w-[80%] flex flex-col">
                <h1 className="text-3xl font-bold mb-4">滚动联动标签示例</h1>

                <Tabs
                    value={String(activeSection)}
                    className="w-full flex flex-col flex-grow"
                    onValueChange={(value) => handleTabClick(parseInt(value))}
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

                                    {section.details && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-3">
                                                主要特点
                                            </h3>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {section.details.map(
                                                    (detail, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-muted-foreground"
                                                        >
                                                            {detail}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                    {section.code && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-3">
                                                示例代码
                                            </h3>
                                            <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                                <pre className="text-sm">
                                                    {section.code}
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {section.options && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-3">
                                                配置选项
                                            </h3>
                                            <div className="bg-muted/50 p-4 rounded-md">
                                                <code className="text-sm whitespace-pre">
                                                    {JSON.stringify(
                                                        section.options,
                                                        null,
                                                        2
                                                    )}
                                                </code>
                                            </div>
                                        </div>
                                    )}

                                    {section.summary && (
                                        <div className="bg-primary/5 p-4 rounded-md border-l-4 border-primary">
                                            <h3 className="text-lg font-semibold mb-2">
                                                总结
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {section.summary}
                                            </p>
                                        </div>
                                    )}
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
                            // 为最后一个元素添加额外的底部padding，确保能滚动到足够触发观察器
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

                            {section.details && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                                        主要特点：
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {section.details.map((detail, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {section.summary && (
                                <p className="mt-4 text-sm font-medium border-l-2 border-primary pl-3 py-1">
                                    {section.summary}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
