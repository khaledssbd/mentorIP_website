import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  categorySlug: string;
  imageUrl?: string;
  tags?: string[];
  author?: string;
  date?: string;
  readTime?: string;
  baseHref?: string;
}

export function PostCard({
  title,
  excerpt,
  slug,
  categorySlug,
  imageUrl,
  tags = [],
  author = "MENTORIP, Bangladesh",
  date,
  readTime = "",
  baseHref = "category",
}: PostCardProps) {
  const rootPath = baseHref.startsWith('/') ? baseHref : `/${baseHref}`;
  return (
    <Link href={`${rootPath}/${categorySlug}/${slug}`}>
      <article className="group bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
        {imageUrl && (
          <div className="relative w-full h-40 bg-muted overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 contrast-[0.95] brightness-[0.98]"
            />
            {readTime && (
              <Badge variant="secondary" className="absolute top-2 right-2 text-[10px]">
                {readTime.split(" ")[0]} min read
              </Badge>
            )}
          </div>
        )}

        <div className="p-4 flex-1 flex flex-col">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {tags.slice(0, 1).map((tag, i) => (
                <span key={i} className="text-[10px] font-medium uppercase tracking-widest text-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 tracking-wider">
            {title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-3 border-t border-border">
            <Image
              src="/favicon.ico"
              alt={title}
              width={25}
              height={25}
              className="object-cover rounded-full p-1 border bg-primary/20"
            />
            <span className="font-medium truncate max-w-[120px]">{author}</span>
            {date && (
              <div className="flex items-center gap-1 opacity-70">
                <Calendar className="w-2.5 h-2.5" />
                <span>{date}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
