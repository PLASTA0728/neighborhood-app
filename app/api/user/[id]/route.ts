import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/connectMongo";
import SessionModel from "@/lib/models/Session";
import { Types } from "mongoose";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const sessionNo = req.nextUrl.searchParams.get("sessionNo");

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: "missing sessionNo" }, { status: 400 });
    }

    try {
        await connectMongo();
        const session = await SessionModel.findOne({ sessionNo });
        const id = params.id;
        const user = session?.users?.find((u) =>u._id.toString() === id);
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    await connectMongo();
    const userId = params.id;
    const sessionNo = req.nextUrl.searchParams.get("sessionNo");
    console.log("delete request received:", userId, sessionNo);

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: "missing sessionNo" }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(userId)) {
        console.error("Invalid userId:", userId);
        return NextResponse.json({ success: false, error: "Invalid userId" }, { status: 400 });
    }

    try {
        const result = await SessionModel.updateOne(
            { sessionNo },
            { $pull: { users: { _id: new Types.ObjectId(userId) } } }
        );
        console.log("mongo updated result:", result);

        return NextResponse.json({ success: true, result});
    } catch (error) {
        console.error("DELETE /api/users/: failed ", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    await connectMongo();
    const userId = await { params }.params.id;
    const sessionNo = req.nextUrl.searchParams.get("sessionNo");
    const newUserData = await req.json();

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: "missing sessionNo" }, { status: 400 });
    }

    try {
        const result = await SessionModel.updateOne(
            { sessionNo, "users._id": new Types.ObjectId(userId) },
            {
                $set: {
                    "users.$.name": newUserData.name,
                    "users.$.age": newUserData.age,
                    "users.$.contact": newUserData.contact,
                    "users.$.role": newUserData.role,
                    "users.$.customResponses": newUserData.customResponses,
                    "users.$.location": newUserData.location,
                }
            }
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}