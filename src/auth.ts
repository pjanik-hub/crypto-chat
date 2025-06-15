import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const providers = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    authorize(credentials) {
      if (
        credentials.email !== "test@gmail.com" ||
        credentials.password !== "test"
      )
        return null;

      return {
        id: "test",
        email: "test@gmail.com",
      };
    },
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
