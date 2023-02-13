import { hashPassword } from "../../../helpers/auth";
import { connectToDb } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      res.status(422).json({ message: "Please fill in all the fields" });
      return;
    }

    if (password.trim().length < 8) {
      res.status(422).json({ message: "Password should atleast have 8 characters" });
      return;
    }

    if (password !== passwordConfirm) {
      res.status(422).json({ message: "Password must match" });
      return;
    }

    const client = await connectToDb();

    const db = client.db();

    //Check if a user already exists
    const existingUserName = await db.collection("users").findOne({ username: username });
    const existingEmail = await db.collection("users").findOne({ email:email });

    if(existingUserName){
      res.status(422).json({ message: "Username already taken." });
      client.close()
      return;
    }

    if(existingEmail){
      res.status(422).json({ message: "Email already taken." });
      client.close()
      return;
    }

    //Hash user password
    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Created sucessfully!!", result });

    client.close()
  }
}
