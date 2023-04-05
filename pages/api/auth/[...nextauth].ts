import NextAuth, { Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@/db/adapters/PostgresAdapter";
import { pool } from "@/db/index";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("GitHub credentials not properly set");
}

export const authOptions = {
  callbacks: {
    session: ({ session, user }: { session: Session; user: User }) => {
      session.user = user;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PostgresAdapter(pool),
};

export default NextAuth(authOptions);
