import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

let cachedClient: MongoClient | null = null;

export default async function connectMongo() {
    if (cachedClient) return cachedClient;

    await client.connect();
    cachedClient = client;
    return client;
}