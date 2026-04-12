import { NextRequest, NextResponse } from 'next/server'

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

    const { accessToken, idToken, refreshToken } = await backendRes.json()

    const response = NextResponse.json({ success: true })

    const isProduction = process.env.NODE_ENV === 'production'
    const cookieBase = {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict' as const,
        path: '/',
    }

    response.cookies.set('access_token', accessToken, cookieBase)
    response.cookies.set('id_token', idToken, cookieBase)
    response.cookies.set('refresh_token', refreshToken, {
        ...cookieBase,
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return response
}
