import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDb } from "../../../helpers/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        //logic to validate the user from the credentials supplied

        const client = await connectToDb();

        const usersCollection = client.db().collection("users");

        //Check if user exists (by email)
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("User not found!");
        }

        //Check if password match
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect password!");
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
