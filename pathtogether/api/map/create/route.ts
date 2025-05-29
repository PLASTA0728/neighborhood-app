import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import MapModel from "@/lib/models/Map";

export async function POST(req: NextRequest) {
    await connectMongo();

    const body = await req.json();

    try {
        const newMap = await MapModel.create(body);
        return NextResponse.json({ success: true, map: newMap });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
