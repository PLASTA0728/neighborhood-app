import connectMongo from "@/lib/db/connectMongo";
import MapModel from "@/lib/models/Map";

export default async function checkSessionExists(sessionNo: string): Promise<boolean> {
    await connectMongo();
    const session = await MapModel.findOne({ sessionNo });
    return !!session;
}