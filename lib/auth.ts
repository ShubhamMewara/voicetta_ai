import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/prisma/index";
import bcrypt from "bcrypt";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTPayload, SignJWT, importJWK } from "jose";

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials.username || !credentials.password) {
          return null;
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        // Add logic here to look up the user from the credentials supplied
        const userDb = await db.user.findFirst({
          where: {
            email: credentials.username,
          },
          select: {
            password: true,
            id: true,
            name: true,
          },
        });

        if (userDb) {
          if (
            await bcrypt.compare(credentials.password, userDb.password || "")
          ) {
            const jwt = await generateJWT({
              id: userDb.id,
            });

            return {
              id: userDb.id,
              name: userDb.name,
              email: credentials.username,
              token: jwt,
            };
          } else {
            return null;
          }
        }
        if (credentials.username == process.env.ADMIN_EMAIL) {
          const user = await db.user.create({
            data: {
              email: credentials.username,
              name: credentials.username,
              password: hashedPassword,
              admin: true,
            },
          });
          const jwt = await generateJWT({
            id: user.id,
          });
          return {
            id: user.id,
            name: credentials.username,
            email: credentials.username,
            token: jwt,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  pages: {
    signIn: "/signin",
  },
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
