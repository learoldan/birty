import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const backendRes = await fetch(`${process.env.API_BASE_URL}/birthdays`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!backendRes.ok) {
        return NextResponse.json(
            { message: 'Failed to fetch birthdays' },
            { status: backendRes.status },
        )
    }

    const { data: birthdays } = await backendRes.json()
    return NextResponse.json({ birthdays })
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const backendRes = await fetch(`${process.env.API_BASE_URL}/birthdays`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    })

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to create birthday' },
            { status: backendRes.status },
        )
    }

    const { data: birthday } = await backendRes.json()
    return NextResponse.json({ birthday }, { status: 201 })
}
