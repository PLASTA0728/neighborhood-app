import mongoose from "mongoose";
import MapModel from "./models/Map";
import SessionModel from "./models/Session";
import connectMongo from "./db/connectMongo";

export async function getMapParameters(sessionNo: string) {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName: "pathtgt-main",
            bufferCommands: false,
        });

        const map = await MapModel.findOne({ sessionNo }).exec();
        return map;
    } catch (error) {
        console.error("Error fetching map parameters:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export async function getUsersBySession(sessionNo: string) {
    try {
        await connectMongo();
        const users = await SessionModel.find({ sessionNo });
        return users;
    } catch (error) {
        console.error("Error fetching users by session:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

