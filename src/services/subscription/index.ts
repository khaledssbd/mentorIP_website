/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";

export const subscribeNewsletter = async (email: string) => {
  try {
    const result = await serverFetch("/subscription", {
      method: "POST",
      body: { email },
    });
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to subscribe to newsletter",
    };
  }
};
