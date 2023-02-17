import { getServerSession } from "next-auth/next";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectToDb } from "../../../helpers/db";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  //Check if req method is PATCH
  if (req.method !== "PATCH") {
    return;
  }

  //Check if its auth user
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword  = req.body.oldPassword;
  const newPassword  = req.body.newPassword;

  const client = await connectToDb();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({email:userEmail});

  if (!user) {
    res.status(404).json({message:'User not found!'});
    client.close();
    return;
  }

  //Verify password
  const currentPassword = user.password;
  const passwordAreEqual = await verifyPassword(oldPassword,currentPassword);

  if (!passwordAreEqual) {
    res.status(403).json({message:'Invalid old Password!'});
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne({email:userEmail}, { $set: {password : hashedPassword}});

  client.close();

  res.status(200).json({message:'Password updated successfully!'});
}



export default handler;
