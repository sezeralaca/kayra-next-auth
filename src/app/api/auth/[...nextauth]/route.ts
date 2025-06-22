import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const idToken = account.id_token;
        const decoded = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
        const roles = decoded["https://example.com/roles"];
        token.roles = roles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.roles = token.roles || [];
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
