// utils/db.js
import { MongoClient } from "mongodb";

// Use your provided values
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "job-portal";

let client;
let db;

export async function connectDB() {
  if (db) return db; // reuse existing connection

  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(dbName);

    console.log(`✅ Connected to MongoDB: ${dbName}`);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}
