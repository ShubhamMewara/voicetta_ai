import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/prisma/index";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session, token }: any) {
      const user = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
        session.user.admin = user?.admin;
        session.user.private = user?.PRIVATE_KEY;
        session.user.public = user?.PUBLIC_KEY;
        session.user.multiFactor = user?.multiFactor;
      }
      return session;
    },
  },
};
