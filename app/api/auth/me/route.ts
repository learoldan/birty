import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const raw = cookieStore.get('user_profile')?.value

    if (raw) {
        try {
            const user = JSON.parse(raw)
            return NextResponse.json({ user })
        } catch {
            // Malformed cookie — fall through to backend fetch
        }
    }

    // Fallback: user_profile cookie missing, try fetching from backend
    const accessToken = cookieStore.get('access_token')?.value
    if (!accessToken) {
        return NextResponse.json({ user: null }, { status: 401 })
    }

    try {
        const profileRes = await fetch(`${process.env.API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (!profileRes.ok) {
            return NextResponse.json({ user: null }, { status: 401 })
        }

        const { data: user } = await profileRes.json()
        return NextResponse.json({ user })
    } catch {
        return NextResponse.json({ user: null }, { status: 401 })
    }
}
