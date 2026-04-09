'use client'

import { useState } from 'react'
import EditModal from './EditModal'

type Birthday = {
    name: string
    birthdate: string
    notes: string
    alerts: boolean
}

type BirthdaysProps = {
    birthdays: Birthday[]
}

export default function Birthdays({ birthdays }: BirthdaysProps) {
    const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(
        null,
    )

    return (
        <div className='w-full overflow-x-auto'>
            {editingBirthday && (
                <EditModal
                    variant='birthday'
                    data={{
                        name: editingBirthday.name,
                        birthdate: editingBirthday.birthdate,
                        notes: editingBirthday.notes,
                    }}
                    onClose={() => setEditingBirthday(null)}
                />
            )}
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
                    {birthdays.map((birthday, index) => (
                        <tr
                            key={index}
                            className='border-b border-primary/10 hover:bg-primary/5 transition-colors duration-150'
                        >
                            <td className='py-3 pr-6'>{birthday.name}</td>
                            <td className='py-3 pr-6'>{birthday.birthdate}</td>
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
                                    <button className='px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-accent transition-colors duration-200 cursor-pointer'>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
