import { NextResponse } from 'next/server'

/**
 * Sets all session cookies on the response. Calls /users/me to cache the
 * user profile in a cookie — but auth cookies are always set regardless,
 * so a /users/me failure never breaks the login flow.
 */
export async function buildSessionResponse(tokens: {
    accessToken: string
    idToken: string
    refreshToken: string
}): Promise<NextResponse> {
    const { accessToken, idToken, refreshToken } = tokens

    const isProduction = process.env.NODE_ENV === 'production'
    const cookieBase = {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict' as const,
        path: '/',
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set('access_token', accessToken, cookieBase)
    response.cookies.set('id_token', idToken, cookieBase)
    response.cookies.set('refresh_token', refreshToken, {
        ...cookieBase,
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    try {
        const profileRes = await fetch(`${process.env.API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${idToken}` },
        })

        if (profileRes.ok) {
            const { data: user } = await profileRes.json()
            response.cookies.set('user_profile', JSON.stringify(user), cookieBase)
        } else {
            console.error('[session] /users/me responded with', profileRes.status)
        }
    } catch (err) {
        console.error('[session] /users/me fetch failed:', err)
    }

    return response
}
