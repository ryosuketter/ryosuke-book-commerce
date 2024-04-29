import {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma), // vercel postgresにもユーザーデータを保存
  callbacks: {
    // next auth のセッションやユーザー情報を返す
    session: ({session, user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};
