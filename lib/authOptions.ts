import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { baseUrl } from "./config";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(baseUrl + "/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok && data) {
          return { token: data.token, ...data.user, image: data.user.avatar };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.accessToken = user.token;
        token.exp = 24 * 60 * 60 * 1000;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          token: token.accessToken,
          role: token.role,
          id: token.id,
        },
      };
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
