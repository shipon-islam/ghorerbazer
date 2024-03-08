import "next-auth";

declare module "next-auth" {
  interface User {
    role: "admin" | "user";
    token: string;
    id: string;
  }
  interface Session {
    user: User;
  }
}
