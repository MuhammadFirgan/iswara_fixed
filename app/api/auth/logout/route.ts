import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export function POST(req: NextRequest) {
    try {
        const request = NextResponse.json({
            message: 'logout success',
            success: true
        })

        request.cookies.set('token', '', { httpOnly: true, maxAge: 0 })
        return request
    } catch (error) {
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
    }
}