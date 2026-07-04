/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { buildQueryString } from '@/lib/buildQueryString';
import { serverFetch } from '@/lib/fetcher';
import { Query } from '@/types/global.types';
import type { ApiResponse, Category, CategoryWithPosts } from '@/types/category.type';

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const result = await serverFetch('/category', {});
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch categories", data: [] };
  }
};

// GET SINGLE CATEGORY WITH POSTS (by slug)
export const getCategoryBySlug = async (slug: string, query: Query = {}): Promise<ApiResponse<CategoryWithPosts | null>> => {
  try {
    return await serverFetch(`/category/with-posts/${slug}${buildQueryString(query)}`, {});
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};