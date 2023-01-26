import { MongoClient } from "mongodb";

const dbname = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

export async function connectToDb() {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.tmwlx.mongodb.net/${dbname}?retryWrites=true&w=majority`
  );
  return client;
}
