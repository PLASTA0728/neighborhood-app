import { NextResponse } from "next/server";
import getSessionInfo from "@/lib/db/getSessionInfo";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionNo = searchParams.get('sessionNo');

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: "no session number provided" }, { status: 400 });
    }

    try {
        const sessionInfo = await getSessionInfo(sessionNo);
        
        if (!sessionInfo) {
            return NextResponse.json({ success: false, error: "session not found" }, { status: 404 });
        } else {
            const plainSession = sessionInfo.toObject();
            delete plainSession._id;
            delete plainSession.__v;

            return NextResponse.json({ success: true, map: plainSession }, { status: 200 });
        }
    } catch (err) {
        console.error("DB error", err);
        return NextResponse.json({ success: false, error: "server error"}, { status: 500 });
    }
}