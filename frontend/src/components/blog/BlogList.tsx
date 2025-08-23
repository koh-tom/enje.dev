"use client";

import { BlogPostCard, type Post, type Tag } from "@/components/blog/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogListProps {
    initialPosts: Post[];
    tags: Tag[];
}

export function BlogList({ initialPosts, tags }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<number | null>(null);

    // フィルタリングロジック
    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            // タグフィルター
            if (selectedTag && !post.tags.some((tag) => tag.id === selectedTag)) {
                return false;
            }

            // 言語検索（タイトル、本文、タグ名）
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchTitle = post.title.toLowerCase().includes(query);
                const matchContent = post.content.toLowerCase().includes(query);
                const matchTags = post.tags.some((tag) =>
                    tag.name.toLowerCase().includes(query)
                );
                return matchTitle || matchContent || matchTags;
            }

            return true;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    return (
        <>
            {/* 検索とフィルターセクション */}
            <section className="mb-12">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            type="search"
                            placeholder="記事を検索 (キーワード、技術スタックなど)..."
                            className="w-full text-lg pl-10 py-6 rounded-2xl shadow-sm border-2 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <Badge
                            variant={selectedTag === null ? "default" : "outline"}
                            className={`cursor-pointer px-4 py-1.5 text-sm transition-all ${selectedTag === null ? "scale-105 shadow-md" : "hover:bg-accent"
                                }`}
                            onClick={() => setSelectedTag(null)}
                        >
                            すべて
                        </Badge>
                        {tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                variant={selectedTag === tag.id ? "default" : "outline"}
                                className={`cursor-pointer px-4 py-1.5 text-sm transition-all ${selectedTag === tag.id
                                        ? "scale-105 shadow-md bg-blue-600 hover:bg-blue-700"
                                        : "hover:bg-accent"
                                    }`}
                                onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        {filteredPosts.length} 件の記事が見つかりました
                    </div>
                </div>
            </section>

            {/* ブログ記事リスト */}
            <motion.div layout className="space-y-8">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <BlogPostCard post={post} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-xl text-muted-foreground">
                                条件に一致する記事は見つかりませんでした 😢
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedTag(null);
                                }}
                                className="mt-4 text-blue-500 hover:underline"
                            >
                                フィルターをリセット
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
