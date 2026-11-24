import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

if (!uri) {
    throw new Error("Missing DATABASE_URL environment variable");
}

const globalForMongo = globalThis as typeof globalThis & {
    mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = client;
}

const db = client.db("bazardor");

export { client, db };
