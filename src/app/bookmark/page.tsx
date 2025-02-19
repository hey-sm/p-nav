/** @format */

'use client'

import { File, Folder, Tree } from '@/components/magicui/file-tree'
import {
    BookmarkImporter,
    type BookmarkNode
} from '@/components/features/bookmark-importer'
import { useState, useEffect } from 'react'
import Image from 'next/image'

function RenderTreeNode({ node }: { node: BookmarkNode }) {
    const fileIcon = node.iconUrl ? (
        <Image
            src={node.iconUrl}
            alt={node.name}
            width={16}
            height={16}
            className="mr-2"
        />
    ) : null
    if (!node.children) {
        return (
            <File
                value={node.id}
                fileIcon={fileIcon}
                onClick={() => {
                    if (node.url) {
                        window.open(node.url, '_blank')
                    }
                }}
            >
                <p>{node.name}</p>
            </File>
        )
    }

    return (
        <Folder value={node.id} element={node.name}>
            {node.children.map((child) => (
                <RenderTreeNode key={child.id} node={child} />
            ))}
        </Folder>
    )
}

export default function Home() {
    const [bookmarks, setBookmarks] = useState<BookmarkNode[]>([])
    // useEffect(() => {
    //   // 页面加载时自动进入全屏
    //   document.documentElement.requestFullscreen().catch((err) => {
    //     console.log("无法进入全屏模式:", err);
    //   });

    //   // 组件卸载时退出全屏
    //   return () => {
    //     if (document.fullscreenElement) {
    //       document.exitFullscreen().catch((err) => {
    //         console.log("无法退出全屏模式:", err);
    //       });
    //     }
    //   };
    // }, []);
    const handleImport = (data: BookmarkNode[]) => {
        setBookmarks(data)
    }

    return (
        <div className="p-4">
            <BookmarkImporter onImport={handleImport} />

            {bookmarks.length > 0 && (
                <div className="relative flex  flex-col items-center justify-center overflow-hidden rounded-lg border bg-background mt-4">
                    <Tree
                        className="overflow-hidden rounded-md bg-background p-2"
                        initialExpandedItems={['1']}
                    >
                        {bookmarks.map((node) => (
                            <RenderTreeNode key={node.id} node={node} />
                        ))}
                    </Tree>
                </div>
            )}
        </div>
    )
}
