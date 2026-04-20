import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email, confirmationCode } = body

    if (!email || !confirmationCode) {
        return NextResponse.json(
            { message: 'Email and confirmation code are required' },
            { status: 400 },
        )
    }

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/auth/validate`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, confirmationCode }),
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Verification failed' },
            { status: backendRes.status },
        )
    }

    return NextResponse.json({ success: true })
}
