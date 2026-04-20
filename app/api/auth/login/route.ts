import { NextRequest, NextResponse } from 'next/server'
import { buildSessionResponse } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
        return NextResponse.json(
            { message: 'Email and password are required' },
            { status: 400 },
        )
    }

    const backendRes = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Authentication failed' },
            { status: backendRes.status },
        )
    }

    const { data: { accessToken, idToken, refreshToken } } = await backendRes.json()

    return buildSessionResponse({ accessToken, idToken, refreshToken })
}
