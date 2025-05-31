import mongoose from "mongoose";

const MONGODB_URI = `${process.env.MONGODB_URI}`;
const dbName = 'pathtgt-main';

let isConnected = false;

export default async function connectMongo() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: dbName,
    });
    isConnected = true;
    console.log(`✅ Connected to MongoDB with Mongoose`);
  } catch (err) {
    console.error("❌ Mongoose connection error:", err);
    throw err;
  }
}
