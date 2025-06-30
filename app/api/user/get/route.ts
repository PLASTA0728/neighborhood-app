import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import SessionModel from "@/lib/models/Session";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionNo = searchParams.get("sessionNo");

    if (!sessionNo) {
        return NextResponse.json({ error: "missing sessionNo" }, { status: 400 });
    }
    
    await connectMongo();

    try {
        let session = await SessionModel.findOne({ sessionNo });

        if (!session) {
            session = await SessionModel.create({
            sessionNo,
            users: [],
        });
        }
        return NextResponse.json(session.users);
    } catch (err) {
        console.error("error fetching session", err);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}