import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug } from "@/services/category";
import { format } from "date-fns";

interface CategorySectionProps {
  categorySlug: string;
}

export async function CategorySection({ categorySlug }: CategorySectionProps) {
  const response = await getCategoryBySlug(categorySlug, { limit: "10" });

  if (!response?.success || !response.data) return null;

  const category = response.data;
  const categoryPosts = category.posts || [];

  return (
    <section className="py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              {category.name}
            </h2>
            <div className="w-2 h-2 rounded-full bg-green-500 mb-1" />
          </div>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed font-medium">
            {category.description}
          </p>
        </div>
        <Link href={`/category/${categorySlug}`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border font-bold text-[10px] uppercase tracking-widest h-9 px-5 group"
          >
            View {category.name}{" "}
            <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryPosts.length > 0 ? (
            categoryPosts.slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                href={`/category/${categorySlug}/${post.slug}`}
                className="group bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="relative w-full h-40 bg-muted overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover contrast-[0.95] brightness-[0.98]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-black text-2xl uppercase opacity-20">
                      {category.name}
                    </div>
                  )}
                  {post.readTime && (
                    <Badge variant="secondary" className="absolute top-2 right-2 text-[10px]">
                      {post.readTime.split(" ")[0]} min read
                    </Badge>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
                      {category.name}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 tracking-wider">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {post.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-3 border-t border-border">
                    <Image
                      src="/favicon.ico"
                      alt="M"
                      width={25}
                      height={25}
                      className="object-cover rounded-full p-1 border bg-primary/20"
                    />
                    <span className="font-medium truncate max-w-[120px]">MENTORIP</span>
                    <div className="flex items-center gap-1 opacity-70">
                      <Calendar className="w-2.5 h-2.5" />
                      <span>{format(new Date(category.createdAt || "2026-01-20T10:00:00Z"), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full p-12 text-center bg-muted/50 rounded-2xl border-2 border-dashed border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Coming soon: posts for {category.name}
              </p>
            </div>
          )}
      </div>
    </section>
  );
}
