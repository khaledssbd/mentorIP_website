"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";

// SEND CONTACT MESSAGE (public)
export const sendContactEmail = async (data: FieldValues) => {
  try {
    const result = await serverFetch(`/contact`, {
      method: "POST",
      body: data,
    });

    return result;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to send message";
    return { success: false, message };
  } 
};

// RETRIEVE OFFICE CARDS DATA
export const getOfficeCards = async () => {
  try {
    return await serverFetch(`/office-cards-comp/retrieve`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

// GET HOTLINE AND SOCIALS
export const getHotlineAndSocials = async () => {
  try {
    return await serverFetch(`/contact-us-comp/retrieve`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};
