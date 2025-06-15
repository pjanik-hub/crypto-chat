import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Osu from "next-auth/providers/osu";

import { sql } from "./lib/neon";

// Extend the Session user type to include provider and providerAccountId
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
      providerAccountId?: string;
    };
  }
}

const providers = [
  GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
  Osu({
    clientId: process.env.OSU_ID,
    clientSecret: process.env.OSU_SECRET,
  }),
  Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
];

export const providerMap = providers
  .map((provider) => {
    return { id: provider.id };
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // make more attributes visible
    async jwt({ token, account, user }) {
      if (account) {
        const result = await sql`
          SELECT * FROM users WHERE provider = ${account.provider} AND provider_account_id = ${account.providerAccountId}
        `;
        let dbUser = result[0];

        // If not found, create user
        if (!dbUser) {
          const safeName =
            typeof user?.name === "string" ? user.name.slice(0, 100) : null;
          const safeEmail =
            typeof user?.email === "string" ? user.email.slice(0, 100) : null;

          const insertResult = await sql`
            INSERT INTO users (name, email, provider, provider_account_id)
            VALUES (${safeName}, ${safeEmail}, ${account.provider}, ${account.providerAccountId})
            RETURNING *
            `;
          dbUser = insertResult[0];
        }

        // Attach DB user info to token
        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.provider = dbUser.provider;
        token.providerAccountId = dbUser.provider_account_id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.name = String(token.name);
        session.user.email = String(token.email);
        session.user.provider = String(token.provider);
        session.user.providerAccountId = String(token.providerAccountId);
      }

      return session;
    },
  },
});
