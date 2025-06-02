import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import SessionModel from "@/lib/models/Session";

export async function POST(req: NextRequest) {
    await connectMongo();
    const { sessionNo, name, age, contact, role, customResponses } = await req.json();

    const newUser = {
        name,
        age, 
        contact,
        role,
        customResponses,
    };

    try {
        const updated = await SessionModel.updateOne(
            { sessionNo },
            { $push: {users: newUser } },
            { upsert: true }  
        );
        return NextResponse.json({ success: true, result: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
