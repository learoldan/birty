import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email } = body

    if (!email) {
        return NextResponse.json(
            { message: 'Email is required' },
            { status: 400 },
        )
    }

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/auth/forgot-password`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to send reset code' },
            { status: backendRes.status },
        )
    }

    return NextResponse.json({ success: true })
}
