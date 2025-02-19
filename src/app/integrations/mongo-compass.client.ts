import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const mongoCompassClient = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await mongoCompassClient.connect();
    console.log(">>>>Connected to DB<<<<");
    return mongoCompassClient.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("users");
  if (db) return db.collection(collectionName);

  return null;
}
