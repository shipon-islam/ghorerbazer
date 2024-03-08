"use server";

import { baseUrl } from "@/lib/config";
export const getProducts = async (query?: any) => {
  const searchParams = new URLSearchParams(query as any);
  const res = await fetch(baseUrl + `/api/products?${searchParams}`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    throw new Error("something went wrong when fetch products");
  }
  return res.json();
};
export const getProductById = async (id: string) => {
  const res = await fetch(baseUrl + `/api/products/${id}`);
  if (!res.ok) {
    throw new Error("something went wrong when fetch product by id");
  }
  return res.json();
};
