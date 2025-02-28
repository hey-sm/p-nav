/** @format */

"use client";

import { Button } from "@/components/ui/button";

interface BookmarkNode {
  id: string;
  isSelectable: true;
  name: string;
  url?: string;
  iconUrl?: string;
  children?: BookmarkNode[];
}

interface BookmarkImporterProps {
  onImport: (bookmarks: BookmarkNode[]) => void;
}

export function BookmarkImporter({ onImport }: BookmarkImporterProps) {
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const parseBookmarks = (
      element: Element,
      id: string = "0"
    ): BookmarkNode[] => {
      const results: BookmarkNode[] = [];

      element.querySelectorAll(":scope > dt").forEach((dt, index) => {
        const h3 = dt.querySelector("h3");
        const a = dt.querySelector("a");
        const dl = dt.querySelector("dl");

        const node: BookmarkNode = {
          id: `${id}-${index}`,
          isSelectable: true,
          name: h3?.textContent || a?.textContent || "未命名",
          url: a?.getAttribute("href") || undefined,
          iconUrl: a?.getAttribute("icon") || undefined,
        };

        if (dl) {
          node.children = parseBookmarks(dl, node.id);
        }

        results.push(node);
      });

      return results;
    };

    const bookmarkRoot = doc.querySelector("dl");
    if (bookmarkRoot) {
      const tree = parseBookmarks(bookmarkRoot);
      onImport(tree);
    }
  };

  return (
    <Button asChild variant="secondary">
      <label>
        导入书签
        <input
          type="file"
          accept=".html"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </label>
    </Button>
  );
}

export type { BookmarkNode };
