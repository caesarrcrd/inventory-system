import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin123"
        ) {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
  }
});
