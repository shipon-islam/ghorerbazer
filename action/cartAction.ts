"use server";
import { baseUrl } from "@/lib/config";
import { cartAddType } from "@/types/cart";
import { revalidateTag } from "next/cache";

export const addCartAction = async (cardData: cartAddType, token: string) => {
  const res = await fetch(baseUrl + "/api/cart", {
    method: "POST",
    body: JSON.stringify({
      ...cardData,
      userId: cardData.user,
      productId: cardData.product,
    }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json", // Specify content type if required
    },
  });
  const data = await res.json();
  revalidateTag("cart");
  return data;
};
export const updateCartAction = async (
  item: { _id: string; quantity: number },
  token: string
) => {
  const res = await fetch(baseUrl + `/api/cart/${item._id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: item.quantity }),
  });
  const data = await res.json();
  revalidateTag("cart");
  return data;
};
export const deleteCartAction = async (id: string, token: string) => {
  const res = await fetch(baseUrl + `/api/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  revalidateTag("cart");
  return data;
};
export const getCartItems = async (userId: string, token: string) => {
  try {
    const res = await fetch(baseUrl + `/api/cart/${userId}`, {
      method: "GET",
      cache: "no-store",
      next: {
        tags: ["cart"],
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
