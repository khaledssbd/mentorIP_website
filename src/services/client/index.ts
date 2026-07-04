"use server";

import { serverFetch } from "@/lib/fetcher";


// GET CLIENTELE
export const getClients = async () => {
  try {
    return await serverFetch(`/client`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: [],
    };
  }
};


// GET CLIENTELE
export const getClientele = async () => {
  try {
    return await serverFetch(`/our-clientele-comp/retrieve`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: {},
    };
  }
};



// WE SERVE
export const getWeServe = async () => {
  try {
    return await serverFetch(`/industries-we-serve-comp/retrieve`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};


// GET JURISDICTIONS
export const getJurisdictions = async () => {
  try {
    return await serverFetch(`/jurisdictions-comp/retrieve`, {
      revalidate: 300,
    });
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

