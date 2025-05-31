import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import MapModel from "@/lib/models/Map";

export async function POST(req: NextRequest) {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const sessionNo = searchParams.get('sessionNo');

    const body = await req.json();

    try {
        await MapModel.deleteMany({ sessionNo: sessionNo });
        console.log(sessionNo);
        const result = await MapModel.insertOne(body);
        console.log("insert result:", result);
        return NextResponse.json({ success: true});
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error)}, { status: 500 })
    }
}