import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string; date: string }> },
) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id, date } = await params

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/birthdays/${id}/alerts/${date}`,
        {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to delete alert' },
            { status: backendRes.status },
        )
    }

    return new NextResponse(null, { status: 204 })
}
