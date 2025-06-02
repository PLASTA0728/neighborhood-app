import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import UserModel from "@/lib/models/User";

export async function POST(req: NextRequest) {
    await connectMongo();

    const body = await req.json();

    try {
        const newUser = await UserModel.create(body);
        return NextResponse.json({ success: true, user: new UserModel });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
