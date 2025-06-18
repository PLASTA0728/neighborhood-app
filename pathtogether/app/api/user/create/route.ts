import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import SessionModel from "@/lib/models/Session";
import type { IUser } from "@/utils/types";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    await connectMongo();
    const { sessionNo, name, age, contact, role, location, customResponses } = await req.json();

    const newUser:IUser = {
        name,
        age, 
        contact,
        role,
        location,
        customResponses,
    };

    try {
        let session = await SessionModel.findOne({ sessionNo });
        if (!session) {
            session = new SessionModel({ sessionNo, users: [newUser] });
        } else {
            session.users.push(newUser);
        }

        await session.save();
        // const updated = await SessionModel.updateOne(
        //     { sessionNo },
        //     { $push: {users: newUser } },
        //     { upsert: true }  
        // );
        return NextResponse.json({ success: true, result: session });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
