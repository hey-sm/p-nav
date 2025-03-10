/** @format */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

// 模拟不同页面的内容数据
const generatePageContent = (page: number) => {
    return Array.from({ length: 2 }, (_, i) => ({
        id: page * 2 + i,
        title: `Article ${page * 2 + i + 1}`,
        content: `This is the content for article ${
            page * 2 + i + 1
        }. It contains some sample text to demonstrate the layout.`,
        date: new Date(
            Date.now() - Math.random() * 10000000000
        ).toLocaleDateString()
    }))
}

// 模拟异步数据获取
const fetchData = async (page: number, signal?: AbortSignal) => {
    // 使用 signal 参数来支持取消操作
    await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, 1000)
        // 如果请求被取消，清除定时器并拒绝 Promise
        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timer)
                reject(new Error('Aborted'))
            })
        }
    })

    const items = generatePageContent(page)
    return {
        items: page === 5 ? [] : items,
        total: 20
    }
}

export default function PaginationDemo() {
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState<
        Array<{
            id: number
            title: string
            content: string
            date: string
        }>
    >([])
    const loadingRef = useRef(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    // 处理数据加载
    const loadData = async (page: number) => {
        // 如果正在加载中，取消之前的请求
        if (loadingRef.current) {
            abortControllerRef.current?.abort()
        }

        // 创建新的 AbortController
        const abortController = new AbortController()
        abortControllerRef.current = abortController

        loadingRef.current = true
        try {
            const result = await fetchData(page - 1, abortController.signal)
            // 只有当请求没有被取消时才更新数据
            if (!abortController.signal.aborted) {
                setData(result.items)
            }
        } catch (error) {
            // 忽略已取消的请求错误
            if (error instanceof Error && error.message !== 'Aborted') {
                console.error('Failed to fetch data:', error)
            }
        } finally {
            // 只有当这是最后一个请求时才重置加载状态
            if (abortControllerRef.current === abortController) {
                setTimeout(() => {
                    loadingRef.current = false
                }, 300)
            }
        }
    }

    // 处理页码变化
    const handlePageChange = (page: number) => {
        if (page === currentPage) return
        setCurrentPage(page)
        loadData(page)
    }

    // 初始加载和清理
    useEffect(() => {
        loadData(currentPage)

        // 清理函数
        return () => {
            // 组件卸载时取消正在进行的请求
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [])

    return (
        <div className="space-y-4">
            {/* 数据显示区域 */}
            <div className="rounded-lg border p-4 min-h-[300px]">
                {loadingRef.current ? (
                    <div className="flex items-center justify-center h-[300px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <article
                                    key={item.id}
                                    className="p-4 rounded-lg bg-muted/50 space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                            {item.title}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            {item.date}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        {item.content}
                                    </p>
                                </article>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                No data available for this page
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 分页控件 */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1)
                                }
                            }}
                        />
                    </PaginationItem>

                    {/* 显示所有页码按钮 */}
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < 10) {
                                    handlePageChange(currentPage + 1)
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
