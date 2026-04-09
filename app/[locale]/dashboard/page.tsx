'use client'

import { useState } from 'react'
import EditModal from '@/components/EditModal'
import ChangePasswordModal from '@/components/ChangePasswordModal'
import Birthdays from '@/components/Birthdays'

const mockUser = {
    firstName: 'Leandro',
    lastName: 'García',
    email: 'leandro.garcia@example.com',
}

const mockBirthdays = [
    {
        name: 'María López',
        birthdate: '1990-03-15',
        notes: 'Loves chocolate cake',
        alerts: true,
    },
    {
        name: 'Carlos Pérez',
        birthdate: '1985-07-22',
        notes: 'Prefers surprises',
        alerts: false,
    },
    {
        name: 'Ana Martínez',
        birthdate: '1998-11-05',
        notes: '',
        alerts: true,
    },
]

type Tab = 'birthdays' | 'alerts'

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>('birthdays')
    const [editOpen, setEditOpen] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

    return (
        <div className='min-h-screen flex flex-col md:flex-row pt-20'>
            {editOpen && (
                <EditModal
                    variant='user'
                    data={mockUser}
                    onClose={() => setEditOpen(false)}
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
                    <div className='flex items-center justify-center w-14 h-14 rounded-full bg-primary text-accent font-bold text-xl shrink-0'>
                        {mockUser.firstName[0]}
                        {mockUser.lastName[0]}
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-lg leading-tight'>
                            {mockUser.firstName} {mockUser.lastName}
                        </span>
                        <span className='text-sm opacity-75'>
                            {mockUser.email}
                        </span>
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
                {/* Tabs */}
                <div className='flex border-b border-primary/30'>
                    <button
                        onClick={() => setActiveTab('birthdays')}
                        className={`flex-1 md:flex-none px-6 py-4 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer border-b-2 ${
                            activeTab === 'birthdays'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-terciary/60 hover:text-terciary'
                        }`}
                    >
                        Birthdays
                    </button>
                    <button
                        onClick={() => setActiveTab('alerts')}
                        className={`flex-1 md:flex-none px-6 py-4 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer border-b-2 ${
                            activeTab === 'alerts'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-terciary/60 hover:text-terciary'
                        }`}
                    >
                        Alerts
                    </button>
                </div>

                {/* Tab content */}
                <div className='flex-1 p-6'>
                    {activeTab === 'birthdays' && (
                        <Birthdays birthdays={mockBirthdays} />
                    )}
                    {activeTab === 'alerts' && (
                        <div>{/* Alerts content goes here */}</div>
                    )}
                </div>
            </main>
        </div>
    )
}
