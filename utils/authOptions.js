import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
           throw new Error("Please sign in with Google");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          console.log("Password mismatch");
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile, account }) {
      // 1. Connect to database
      await connectDB();
      
      if (account.provider === "google") {
        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, then add user to database
        if (!userExists) {
          // Truncate user name if too long
          const username = profile.name.slice(0, 20);

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // 1. Connect to database
      await connectDB();
      // 2. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
