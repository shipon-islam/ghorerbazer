import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("email is not valid"),
  password: z.string().min(5, {
    message: "password must be at least 5 characters.",
  }),
});
export const signupSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email("email is not valid"),
  password: z.string().min(5, {
    message: "password must be at least 5 characters.",
  }),
  avatar: z.any().optional(),
});
