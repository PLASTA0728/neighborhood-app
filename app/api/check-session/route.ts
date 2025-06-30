import { NextResponse } from 'next/server';
import checkSessionExists from '@/lib/db/checkSessionExists';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionNo = searchParams.get('sessionNo');

    if (!sessionNo) {
        return NextResponse.json({ success: false, error: 'No session number provided' }, { status: 400 });
    }

    try {
        const exists = await checkSessionExists(sessionNo);
        console.log(sessionNo, exists);
        if (exists) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Session not found' });
        }
    } catch (err) {
        console.error('DB error: ', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
