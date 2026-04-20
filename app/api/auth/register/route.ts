import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { firstNames, lastNames, email, password } = body

    if (!firstNames || !lastNames || !email || !password) {
        return NextResponse.json(
            { message: 'All fields are required' },
            { status: 400 }
        )
    }

    const registerRes = await fetch(
        `${process.env.API_BASE_URL}/auth/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstNames, lastNames, email, password }),
        }
    )

    if (!registerRes.ok) {
        const error = await registerRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Registration failed' },
            { status: registerRes.status }
        )
    }

    return NextResponse.json({ success: true })
}
