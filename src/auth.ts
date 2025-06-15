import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Osu from "next-auth/providers/osu";

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
    jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.provider = String(token.provider);
        session.user.providerAccountId = String(token.providerAccountId);
      }
      return session;
    },
  },
});
