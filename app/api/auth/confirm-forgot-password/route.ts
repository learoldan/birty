import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email, confirmationCode, newPassword } = body

    if (!email || !confirmationCode || !newPassword) {
        return NextResponse.json(
            {
                message:
                    'Email, confirmation code and new password are required',
            },
            { status: 400 },
        )
    }

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/auth/confirm-forgot-password`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, confirmationCode, newPassword }),
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to reset password' },
            { status: backendRes.status },
        )
    }

    return NextResponse.json({ success: true })
}
