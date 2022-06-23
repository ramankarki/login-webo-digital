import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );

        const user = data.find(
          (obj) => obj.email === email && obj.website === password
        );

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});
