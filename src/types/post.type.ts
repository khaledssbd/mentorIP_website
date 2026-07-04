import type { Category } from "@/types/category.type";

export interface PostDetail {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage?: string;
  tag?: string[];
  readTime?: string;
  content: string;
  category: Pick<Category, "_id" | "name" | "slug" | "description" | "imageUrl" | "iconName">;
  views?: number;
  status?: string;
  createdAt: string;
  relatedPosts?: Array<{
    _id: string;
    title: string;
    slug: string;
    coverImage?: string;
    readTime?: string;
  }>;
}
