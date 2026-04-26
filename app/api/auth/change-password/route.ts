import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
        return NextResponse.json(
            { message: 'currentPassword and newPassword are required' },
            { status: 400 },
        )
    }

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/auth/change-password`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to change password' },
            { status: backendRes.status },
        )
    }

    return NextResponse.json({ success: true })
}
