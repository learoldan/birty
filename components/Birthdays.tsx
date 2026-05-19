'use client'

import { useCallback, useEffect, useState } from 'react'
import EditModal from './EditModal'
import CreateBirthdayModal from './CreateBirthdayModal'

type Birthday = {
    id: string
    name: string
    birthDate: string
    notes?: string
    alerts: string[]
}

export default function Birthdays() {
    const [birthdays, setBirthdays] = useState<Birthday[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(
        null,
    )
    const [createOpen, setCreateOpen] = useState(false)

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/birthdays/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete birthday')
            loadBirthdays()
        } catch {
            setError('Could not delete birthday')
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
                    onCreated={loadBirthdays}
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
                        alerts: editingBirthday.alerts,
                    }}
                    onClose={() => setEditingBirthday(null)}
                    onSaved={() => {
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
                                                className='px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-accent transition-colors duration-200 cursor-pointer'
                                            >
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
