"use server";

import { serverFetch } from "@/lib/fetcher";

export const getTeamMembers = async () => {
  try {
    return await serverFetch("/our-team-comp/retrieve", {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: [],
    };
  }
};
