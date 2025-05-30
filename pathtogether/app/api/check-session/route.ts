import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db/connectMongo'; // assuming you have a DB util function
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionNo = searchParams.get('sessionNo');

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: 'No session number provided' }, { status: 400 });
    }

    try {
        const client = await connectMongo();
        const db = client.db("pathtgt-main");
        const collection = db.collection("maps");
        const session = await collection.findOne({ sessionNo });

        if (session) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Session not found' });
        }
    } catch (err) {
        console.error('DB error: ', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
