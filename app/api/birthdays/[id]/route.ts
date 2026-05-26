import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const targetUrl = `${process.env.API_BASE_URL}/birthdays/${id}`
    console.log(
        '[PUT /api/birthdays/[id]] url:',
        targetUrl,
        'body:',
        JSON.stringify(body),
    )

    let backendRes: Response
    try {
        backendRes = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        })
    } catch (err) {
        console.error('[PUT /api/birthdays/[id]] fetch error:', err)
        return NextResponse.json(
            { message: 'Failed to reach backend' },
            { status: 502 },
        )
    }

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        console.error(
            '[PUT /api/birthdays/[id]] backend error:',
            backendRes.status,
            error,
        )
        return NextResponse.json(
            { message: error.message || 'Failed to update birthday' },
            { status: backendRes.status },
        )
    }

    const data = await backendRes.json()
    return NextResponse.json(data)
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const backendRes = await fetch(
        `${process.env.API_BASE_URL}/birthdays/${id}`,
        {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
        },
    )

    if (!backendRes.ok) {
        const error = await backendRes.json().catch(() => ({}))
        return NextResponse.json(
            { message: error.message || 'Failed to delete birthday' },
            { status: backendRes.status },
        )
    }

    return new NextResponse(null, { status: 204 })
}
