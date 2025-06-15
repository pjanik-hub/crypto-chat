import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

const providers = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    authorize() {
      //   if (
      //     credentials.email !== "test@gmail.com" ||
      //     credentials.password !== "test"
      //   )
      //     return null;

      //   return {
      //     id: "test",
      //     email: "test@gmail.com",
      //   };
      return null;
    },
  }),
  GitHub({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
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
});
