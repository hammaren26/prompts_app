import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Обновите интерфейс Session
interface Session {
  user: {
    email: string;
    id: string; // Добавляем id
    name?: string | null; // Добавляем name, если нужно
    image?: string | null; // Добавляем image, если нужно
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      // Проверяем, существует ли sessionUser
      if (sessionUser) {
        session.user.id = sessionUser._id.toString(); // Устанавливаем id
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
