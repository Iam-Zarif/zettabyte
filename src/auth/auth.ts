import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "jwt" }, // This is now correctly typed as "jwt"
  secret: process.env.AUTH_SECRET!,
};

const authHandler = NextAuth(authConfig);

export default authHandler; // Use this in your API route
