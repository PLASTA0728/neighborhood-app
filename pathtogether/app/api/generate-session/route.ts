import { NextResponse } from "next/server";
import mongoose from "mongoose";
import MapModel from "@/app/lib/models/Map";
import crypto from "crypto";
import next from "next";
import connectMongo from "@/app/lib/mongoose";
import { connect } from "http2";

function generateRandomString(length: number): string {
    return crypto.randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, length);
}

async function generateUniqueSessionNo(length = 8): Promise<string> {
    let sessionNo: string;
    let isUnique = false;

    while (!isUnique) {
        sessionNo = generateRandomString(length);
        const existing = await MapModel.findOne({ sessionNo }).exec();
        if (!existing) {
            isUnique = true;
        }
    }

    return sessionNo;
}

export async function POST() {
    try {
        await connectMongo();
        
        const sessionNo = await generateUniqueSessionNo();
        return NextResponse.json({ sessionNo });
    } catch (error) {
        console.error("Error generating session number:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}