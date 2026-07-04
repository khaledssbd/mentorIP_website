/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";

export const applyResume = async (data: FormData) => {
  try {
    const result = await serverFetch("/resume-apply", {
      method: "POST",
      body: data,
    });
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit resume",
    };
  }
};
