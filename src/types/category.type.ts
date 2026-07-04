export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  iconName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPost {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  coverImage?: string;
  tag?: string[];
  readTime?: string;
  content?: string;
  category?: string;
  views?: number;
  status?: string;
}

export interface CategoryWithPosts extends Category {
  posts: CategoryPost[];
  postCount?: number;
}

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
