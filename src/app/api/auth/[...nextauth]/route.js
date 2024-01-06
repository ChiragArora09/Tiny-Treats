import { User } from "@/app/models/User"
import mongoose from "mongoose"
import NextAuth from "next-auth"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/MongoConnect"

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@example.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req){
        if(!credentials || !credentials.email || !credentials.password){
          console.log("credentials not found")
          return null
        }
        const email = credentials.email;
        const password = credentials.password;

        await mongoose.connect(process.env.MONGO_URL);
        const loggedUser = await User.findOne({email});
        const passwordOk = loggedUser && bcrypt.compareSync(password, loggedUser.password)
        console.log(passwordOk)
        if (!passwordOk) {
          return null
        }
        return loggedUser
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }