import { hashPassword } from "../../../helpers/auth";
import { connectToDb } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      res.status(422).json({ message: "Please fill in all the fields" });
      return;
    }

    if (password !== passwordConfirm) {
      res.status(422).json({ message: "Password must match" });
      return;
    }

    const client = await connectToDb();

    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Created sucessfully!!", result });
  }
}
