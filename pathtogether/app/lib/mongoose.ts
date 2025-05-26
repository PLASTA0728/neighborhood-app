import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null};

async function connectMongo() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'pathtgt-main',
            bufferCommands: false,
        }).then(m => {
            console.info("connected to mongoDB");
            return m;
        });
    }
    
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectMongo;