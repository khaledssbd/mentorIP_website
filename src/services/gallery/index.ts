/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/fetcher';

// GET ALL GALLERY
export const getAllGallery = async () => {
  try {
    const result = await serverFetch('/gallery/retrieve', {
        method: 'GET',
    });
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch galleries", data: [] };
  }
};