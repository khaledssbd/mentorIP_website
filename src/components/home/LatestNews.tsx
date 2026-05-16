import { getAllPosts } from "@/services/post";
import { NewsList } from "./NewsList";

export async function LatestNews() {
  const response = await getAllPosts({ page: "1", limit: "8" });
  
  const initialPosts = response?.success ? response.data : [];
  const initialMeta = response?.success ? response.meta : {
    total: 0,
    page: 1,
    limit: 8,
    totalPage: 0
  };

  return (
    <section className="space-y-6 py-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          Latest <span className="text-primary">News</span>
        </h2>
      </div>

      <NewsList initialPosts={initialPosts} initialMeta={initialMeta} />
    </section>
  );
}
