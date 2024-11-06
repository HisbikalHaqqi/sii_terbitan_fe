import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import EncryptData from "@/helpers/EncryptData";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const plaintext = JSON.stringify({
            request: {
              email,
              password,
            },
          });

          const encryptData = await EncryptData(plaintext);
          const res = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: encryptData }),
          });

          const data = await res.json();

          if (res.status === 200) {
            return data;
          } else {
            throw new Error(JSON.stringify(data));
          }
        } catch (e) {
          throw new Error(e.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    // maxAge: 1 * 60
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.full_name = user.data.data.full_name;
        token.email = user.data.data.email;
        token.role = user.data.data.role;
        token.accessToken = user.data.data.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.full_name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
