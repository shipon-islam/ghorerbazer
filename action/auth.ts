"use server";
import { baseUrl } from "@/lib/config";

export const signupAction = async (formdata: FormData) => {
  const res = await fetch(baseUrl + "/api/user", {
    method: "POST",
    body: formdata,
  });
  const data = await res.json();

  return data;
};
export const loginAction = async (body: any) => {
  const res = await fetch(baseUrl + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};
