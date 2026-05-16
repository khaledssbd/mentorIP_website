// import { NewsletterBox } from "@/components/category/NewsletterBox";
import { processHtmlForToc } from "@/components/tools/toc-utils";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/category/ShareButton";
import { Clock } from "lucide-react";
import TableOfContents from "@/components/category/TableOfContents";
import { getPostBySlug } from "@/services/post";
import { Metadata } from "next";
import { NewsletterBox } from "@/components/category/NewsletterBox";
import PostViewTracker from "@/components/category/PostViewTracker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPostBySlug(slug);

  if (!res?.success || !res?.data) {
    return {
      title: "Post Not Found | MentorIP",
      description: "The requested post could not be found.",
    };
  }

  const post = res.data;

  return {
    title: `${post.title} | ${post.category?.name || 'Article'} | MentorIP`,
    description: post.subtitle || post.content?.substring(0, 160).replace(/<[^>]*>/g, '') || "Read more about Intellectual Property Law at MentorIP.",
    keywords: [...(post.tag || []), post.category?.name, "MentorIP", "IP Law", "Bangladesh"].filter(Boolean),
    openGraph: {
      title: post.title,
      description: post.subtitle || post.content?.substring(0, 160).replace(/<[^>]*>/g, ''),
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
      publishedTime: post.createdAt,
      authors: ["MentorIP"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle || post.content?.substring(0, 160).replace(/<[^>]*>/g, ''),
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function DynamicPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getPostBySlug(slug);
  if (!res?.success || !res?.data) {
    notFound();
  }
  const post = res.data;
  
  const { processedHtml, toc } = processHtmlForToc(post.content || "");


  return (
    <div className="space-y-8">
      <PostViewTracker slug={slug} />
      <header className="max-w-7xl mx-auto"> 
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl md:text-3xl font-semibold text-foreground">
              {post.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
              <span className="font-medium">in {post.category?.name}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {(post.readTime || "").split(" ")[0]} min read
              </span>
            </div>
          </div>
          <ShareButton title={post.title} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(post.tag || []).map((tag: string) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 items-start max-w-7xl mx-auto">
        <article className="flex-1 min-w-0">
          <div
            className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 max-w-none mx-auto md:pb-[650px]"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </article>

        <aside className="w-full lg:w-[320px] shrink-0 space-y-6 sticky top-24">
          <div className="space-y-6">
            {toc.length > 0 && <TableOfContents toc={toc} />}
            <NewsletterBox />
          </div>
        </aside>
      </div>
    </div>
  );
}
