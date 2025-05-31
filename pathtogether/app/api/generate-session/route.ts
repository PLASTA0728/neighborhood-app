import { NextResponse } from "next/server";
import crypto from "crypto";
import checkSessionExists from "@/lib/db/checkSessionExists";

function generateRandomString(length: number): string {
    return crypto.randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, length);
}

async function generateUniqueSessionNo(length = 8): Promise<string> {
    let sessionNo: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 5;

    while (!isUnique && attempts < maxAttempts) {
        attempts++;
        sessionNo = generateRandomString(length);
        const existing = await checkSessionExists(sessionNo);
        console.log(sessionNo, "existence", existing);
        if (!existing) {
            isUnique = true;
        }
    }
    if (!isUnique) throw new Error("Failed to generate unique session number, please try again");

    return sessionNo;
}

export async function POST() {
    try {
        const sessionNo = await generateUniqueSessionNo();
        return NextResponse.json({ sessionNo });
    } catch (error) {
        console.error("Error generating session number:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}