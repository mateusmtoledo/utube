import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@/db/adapters/PostgresAdapter";
import { Pool } from "pg";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("GitHub credentials not properly set");
}

const pool = new Pool();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PostgresAdapter(pool),
};

export default NextAuth(authOptions);
