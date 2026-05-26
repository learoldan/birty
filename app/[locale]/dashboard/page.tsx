'use client'

import { useState } from 'react'
import EditModal from '@/components/EditModal'
import ChangePasswordModal from '@/components/ChangePasswordModal'
import Birthdays from '@/components/Birthdays'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
    const { user, isLoading, refresh } = useAuth()
    const [editOpen, setEditOpen] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

    const userForModal = user
        ? {
              firstName: user.firstNames,
              lastName: user.lastNames,
              email: user.email,
          }
        : null

    const handleSaveUser = async (data: {
        firstName: string
        lastName: string
        email: string
    }) => {
        const res = await fetch('/api/users/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstNames: data.firstName,
                lastNames: data.lastName,
                email: data.email,
            }),
        })
        if (!res.ok) {
            const { message } = await res.json().catch(() => ({}))
            throw new Error(message || 'Failed to update profile')
        }
        await refresh()
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row pt-20'>
            {editOpen && userForModal && (
                <EditModal
                    variant='user'
                    data={userForModal}
                    onClose={() => setEditOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
            {changePasswordOpen && (
                <ChangePasswordModal
                    onClose={() => setChangePasswordOpen(false)}
                />
            )}
            {/* User info — top bar on mobile, left sidebar on md+ */}
            <aside className='w-full md:w-72 md:min-h-screen bg-accent-dark text-terciary flex flex-col gap-2 px-6 py-8 md:py-12'>
                <div className='flex items-center gap-4 md:flex-col md:items-start'>
                    {isLoading ? (
                        <div className='w-14 h-14 rounded-full bg-primary/30 animate-pulse shrink-0' />
                    ) : (
                        <div className='flex items-center justify-center w-14 h-14 rounded-full bg-primary text-accent font-bold text-xl shrink-0'>
                            {user?.firstNames?.[0]}
                            {user?.lastNames?.[0]}
                        </div>
                    )}
                    <div className='flex flex-col'>
                        {isLoading ? (
                            <>
                                <div className='h-5 w-32 bg-primary/30 rounded animate-pulse mb-1' />
                                <div className='h-4 w-44 bg-primary/20 rounded animate-pulse' />
                            </>
                        ) : (
                            <>
                                <span className='font-semibold text-lg leading-tight'>
                                    {user?.firstNames} {user?.lastNames}
                                </span>
                                <span className='text-sm opacity-75'>
                                    {user?.email}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className='flex gap-2 mt-2 md:mt-4'>
                    <button
                        onClick={() => setEditOpen(true)}
                        className='px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-accent transition-colors duration-200 cursor-pointer'
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setChangePasswordOpen(true)}
                        className='px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-accent transition-colors duration-200 cursor-pointer'
                    >
                        Change password
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className='flex-1 flex flex-col'>
                <div className='flex-1 p-6'>
                    <Birthdays />
                </div>
            </main>
        </div>
    )
}
