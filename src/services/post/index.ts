/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";

// GET ALL POSTS
export const getAllPosts = async (
  query: Record<string, string | string[] | undefined> = {}
) => {
  try {
    return await serverFetch(`/post${buildQueryString(query)}`, {});
  } catch {
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPage: 0 },
    };
  }
};

// GET POST BY SLUG
export const getPostBySlug = async (slug: string): Promise<any> => {
  try {
    return await serverFetch(`/post/${slug}`, {});
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to load post";
    return { success: false, message };
  }
};

// TRACK POST VIEW
export const trackPostView = async (slug: string): Promise<any> => {
  try {
    return await serverFetch(`/post/${slug}/view`, {
      method: "POST",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to track post view";
    return { success: false, message };
  }
};