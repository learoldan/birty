import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PUT(request: NextRequest) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const backendRes = await fetch(`${process.env.API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    })

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Update failed' },
            { status: backendRes.status },
        )
    }

    const { data: user } = await backendRes.json()

    const isProduction = process.env.NODE_ENV === 'production'
    const response = NextResponse.json({ user })

    // Refresh the cached user_profile cookie
    response.cookies.set('user_profile', JSON.stringify(user), {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        path: '/',
    })

    return response
}
