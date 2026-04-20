import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ success: true })

    const cookieBase = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 0,
    }

    response.cookies.set('access_token', '', cookieBase)
    response.cookies.set('id_token', '', cookieBase)
    response.cookies.set('refresh_token', '', cookieBase)
    response.cookies.set('user_profile', '', cookieBase)

    return response
}
