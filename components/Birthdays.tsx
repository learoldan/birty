'use client'

import { useCallback, useEffect, useState } from 'react'
import EditModal from './EditModal'
import CreateBirthdayModal from './CreateBirthdayModal'
import AlertsModal from './AlertsModal'
import toast from 'react-hot-toast'

type Birthday = {
    id: string
    name: string
    birthDate: string
    notes?: string
}

export default function Birthdays() {
    const [birthdays, setBirthdays] = useState<Birthday[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(
        null,
    )
    const [createOpen, setCreateOpen] = useState(false)
    const [alertingBirthday, setAlertingBirthday] = useState<Birthday | null>(
        null,
    )
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        try {
            const res = await fetch(`/api/birthdays/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete birthday')
            toast.success('Birthday deleted')
            loadBirthdays()
        } catch {
            toast.error('Could not delete birthday')
        } finally {
            setDeletingId(null)
        }
    }

    const loadBirthdays = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/birthdays')
            if (!res.ok) throw new Error('Failed to load birthdays')
            const { birthdays } = await res.json()
            setBirthdays(birthdays ?? [])
        } catch {
            setError('Could not load birthdays')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadBirthdays()
    }, [loadBirthdays])

    return (
        <div className='w-full flex flex-col gap-4'>
            {createOpen && (
                <CreateBirthdayModal
                    onClose={() => setCreateOpen(false)}
                    onCreated={() => {
                        toast.success('Birthday created')
                        loadBirthdays()
                    }}
                />
            )}
            {alertingBirthday && (
                <AlertsModal
                    birthday={alertingBirthday}
                    onClose={() => setAlertingBirthday(null)}
                />
            )}
            {editingBirthday && (
                <EditModal
                    variant='birthday'
                    id={editingBirthday.id}
                    data={{
                        name: editingBirthday.name,
                        birthDate: editingBirthday.birthDate,
                        notes: editingBirthday.notes ?? '',
                        alerts: [],
                    }}
                    onClose={() => setEditingBirthday(null)}
                    onSaved={() => {
                        toast.success('Birthday updated')
                        setEditingBirthday(null)
                        loadBirthdays()
                    }}
                />
            )}

            <div className='flex justify-end'>
                <button
                    onClick={() => setCreateOpen(true)}
                    className='px-4 py-2 text-sm font-medium rounded-full bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer'
                >
                    + Add birthday
                </button>
            </div>

            {isLoading ? (
                <div className='flex flex-col gap-3'>
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className='h-10 rounded-lg bg-primary/10 animate-pulse'
                        />
                    ))}
                </div>
            ) : error ? (
                <p className='text-sm text-red-400'>{error}</p>
            ) : birthdays.length === 0 ? (
                <p className='text-sm text-terciary/60'>
                    No birthdays added yet.
                </p>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-terciary'>
                        <thead>
                            <tr className='border-b border-primary/30 text-left'>
                                <th className='py-3 pr-6 font-medium opacity-75'>
                                    Name
                                </th>
                                <th className='py-3 pr-6 font-medium opacity-75'>
                                    Birthdate
                                </th>
                                <th className='py-3 pr-6 font-medium opacity-75'>
                                    Notes
                                </th>
                                <th className='py-3 font-medium opacity-75'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {birthdays.map((birthday) => (
                                <tr
                                    key={birthday.id}
                                    className='border-b border-primary/10 hover:bg-primary/5 transition-colors duration-150'
                                >
                                    <td className='py-3 pr-6'>
                                        {birthday.name}
                                    </td>
                                    <td className='py-3 pr-6'>
                                        {birthday.birthDate}
                                    </td>
                                    <td className='py-3 pr-6 text-terciary/70'>
                                        {birthday.notes}
                                    </td>
                                    <td className='py-3'>
                                        <div className='flex gap-2 justify-end'>
                                            <button
                                                onClick={() =>
                                                    setAlertingBirthday(
                                                        birthday,
                                                    )
                                                }
                                                className='px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-accent transition-colors duration-200 cursor-pointer'
                                            >
                                                Alerts
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditingBirthday(birthday)
                                                }
                                                className='px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-accent transition-colors duration-200 cursor-pointer'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(birthday.id)
                                                }
                                                disabled={
                                                    deletingId === birthday.id
                                                }
                                                className='px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-accent transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5'
                                            >
                                                {deletingId === birthday.id && (
                                                    <svg
                                                        className='animate-spin h-3 w-3'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                    >
                                                        <circle
                                                            className='opacity-25'
                                                            cx='12'
                                                            cy='12'
                                                            r='10'
                                                            stroke='currentColor'
                                                            strokeWidth='4'
                                                        />
                                                        <path
                                                            className='opacity-75'
                                                            fill='currentColor'
                                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                                                        />
                                                    </svg>
                                                )}
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
