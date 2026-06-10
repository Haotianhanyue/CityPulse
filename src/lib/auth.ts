import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// 扩展 NextAuth 类型
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  providers: [
    // GitHub OAuth
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          {
            id: "github",
            name: "GitHub",
            type: "oauth" as const,
            authorization: "https://github.com/login/oauth/authorize?scope=read:user user:email",
            token: "https://github.com/login/oauth/access_token",
            userinfo: "https://api.github.com/user",
            profile(profile: { id: number; login: string; avatar_url: string; email?: string }) {
              return {
                id: String(profile.id),
                name: profile.login,
                email: profile.email,
                image: profile.avatar_url,
              };
            },
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        ]
      : []),
    // Google OAuth
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          {
            id: "google",
            name: "Google",
            type: "oauth" as const,
            authorization: "https://accounts.google.com/o/oauth2/v2/auth?scope=openid email profile",
            token: "https://oauth2.googleapis.com/token",
            userinfo: "https://openidconnect.googleapis.com/v1/userinfo",
            profile(profile: { sub: string; name: string; email: string; picture: string }) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        ]
      : []),
    // 开发用 Credential 登录
    {
      id: "credentials",
      name: "开发登录",
      type: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email", placeholder: "dev@citypulse.app" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const user = await prisma.user.upsert({
          where: { email: credentials.email },
          update: {},
          create: {
            email: credentials.email,
            name: credentials.email.split("@")[0],
            image: "/avatars/user1.jpg",
            level: 12,
            title: "City Explorer · 连接者",
            totalDistance: 248,
            spotsExplored: 42,
            routesCreated: 8,
            experience: 880,
          },
        });
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
