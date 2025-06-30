import connectMongo from "@/lib/db/connectMongo";
import MapModel from "@/lib/models/Map";

export default async function getSessionInfo(sessionNo: string) {
    await connectMongo();
    const session = await MapModel.findOne({ sessionNo });
    return session;
}

