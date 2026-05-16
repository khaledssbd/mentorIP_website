import { CategoryHeader } from "@/components/category/CategoryHeader";
import { PostCard } from "@/components/category/PostCard";
import { getCategoryBySlug } from "@/services/category";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const res = await getCategoryBySlug(categorySlug);

  if (!res?.success || !res?.data) {
    return {
      title: "Category Not Found | MentorIP",
      description: "The requested category could not be found.",
    };
  }

  const category = res.data;

  return {
    title: `${category.name} | MentorIP - Intellectual Property Law Firm`,
    description: category.description || `Expert legal advice and resources on ${category.name}. MentorIP provides specialized intellectual property services in Bangladesh.`,
    keywords: [category.name, "Intellectual Property", "IP Law", "Bangladesh", "MentorIP", "Legal Advice"],
    openGraph: {
      title: `${category.name} | MentorIP`,
      description: category.description || `Explore specialized ${category.name} resources at MentorIP.`,
      images: category.imageUrl ? [{ url: category.imageUrl }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | MentorIP`,
      description: category.description || `Explore specialized ${category.name} resources at MentorIP.`,
      images: category.imageUrl ? [category.imageUrl] : [],
    },
  };
}

export default async function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  const res = await getCategoryBySlug(categorySlug);
  if (!res?.success || !res?.data) {
    notFound();
  }

  const category = res.data;
  const categoryPosts = category.posts || [];

  return (
    <div className="space-y-6">
      <CategoryHeader
        title={category.name}
        description={category.description}
        imageUrl={category.imageUrl}
        postCount={category.postCount ?? categoryPosts.length}
      />

      {categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post) => (
            <PostCard 
              key={post.slug} 
              title={post.title}
              excerpt={post.subtitle}
              slug={post.slug}
              categorySlug={category.slug}
              imageUrl={post.coverImage}
              tags={post.tag}
              readTime={post.readTime}
            />
          ))}
        </div>
      ) : (
        <div className="p-20 text-center border-2 border-dashed rounded-2xl border-border">
           <p className="text-muted-foreground font-medium">No posts available in this category yet.</p>
        </div>
      )}
    </div>
  );
}
