/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/services/post";
import type { PostDetail } from "@/types/post.type";
import { format } from "date-fns";

interface NewsListProps {
  initialPosts: PostDetail[];
  initialMeta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export function NewsList({ initialPosts, initialMeta }: NewsListProps) {
  const [posts, setPosts] = useState<PostDetail[]>(initialPosts);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (loading || meta.page >= meta.totalPage) return;

    setLoading(true);
    try {
      const nextPage = meta.page + 1;
      const response = await getAllPosts({
        page: nextPage.toString(),
        limit: meta.limit.toString(),
      });

      if (response.success) {
        setPosts((prev) => [...prev, ...response.data]);
        setMeta(response.meta);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = meta.page < meta.totalPage;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/category/${post.category?.slug}/${post.slug}`}
            className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
          >
            {/* Image Container with Badge */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  <Image
                    src="/next.svg"
                    alt="No Image"
                    width={40}
                    height={40}
                    className="opacity-20 dark:invert"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 p-1 border rounded-full bg-muted flex items-center justify-center">
                    <Image
                      src="/favicon.ico"
                      alt="M"
                      width={10}
                      height={10}
                      className="w-auto h-auto opacity-50 dark:invert"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    MENTORIP
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[9px] font-black px-2 py-0.5 border-0 rounded-lg bg-muted text-muted-foreground flex items-center"
                >
                  {post.readTime?.split(" ")[0]} min read
                </Badge>
              </div>

              <h3 className="text-sm font-semibold tracking-wider text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors flex-1">
                {post.title}
              </h3>

              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 italic font-medium lowercase first-letter:uppercase">
                  <Calendar className="w-3 h-3" />
                  {(post as any).createdAt
                    ? format(new Date((post as any).createdAt), "MMM d, yyyy")
                    : "Jan 20, 2026"}
                </span>
                <span className="text-border">•</span>
                <span className="text-primary/70">{post.category?.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            variant="outline"
            className="h-10 px-8 rounded-full border-border font-bold text-xs uppercase tracking-widest hover:bg-muted transition-all flex items-center gap-2"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Loading..." : "Load More Posts"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-10 pb-4 space-y-2 opacity-50">
          <div className="h-px w-20 bg-border" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            You&apos;ve reached the end of the list
          </p>
        </div>
      )}
    </>
  );
}
