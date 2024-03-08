"use server";

import { baseUrl } from "@/lib/config";

export const getCategories = async () => {
  const res = await fetch(baseUrl + "/api/categories");
  if (!res.ok) {
    throw new Error("something went wrong when fetch category");
  }
  return res.json();
};
