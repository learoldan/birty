'use client'

import { useState } from 'react'

type CreateBirthdayModalProps = {
    onClose: () => void
    onCreated: () => void
}

const inputClass =
    'w-full rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'

export default function CreateBirthdayModal({
    onClose,
    onCreated,
}: CreateBirthdayModalProps) {
    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        notes: '',
        reminderDays: 1,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name === 'reminderDays' ? Number(value) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/birthdays', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    birthDate: new Date(form.birthDate).toISOString(),
                    notes: form.notes,
                    reminderDays: form.reminderDays,
                }),
            })

            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}))
                throw new Error(message || 'Failed to create birthday')
            }

            onCreated()
            onClose()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Something went wrong',
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                className='bg-accent-dark text-terciary rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl'
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className='text-xl font-semibold mb-6'>Add birthday</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            required
                            value={form.name}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Birthdate
                        </label>
                        <input
                            type='date'
                            name='birthDate'
                            required
                            value={form.birthDate}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Notes
                        </label>
                        <textarea
                            name='notes'
                            rows={3}
                            value={form.notes}
                            onChange={handleChange}
                            className='w-full rounded-2xl px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200 resize-none'
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Reminder (days before)
                        </label>
                        <input
                            type='number'
                            name='reminderDays'
                            min={1}
                            required
                            value={form.reminderDays}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div className='flex justify-end gap-3 mt-2'>
                        {error && (
                            <p className='text-sm text-red-400 self-center mr-auto'>
                                {error}
                            </p>
                        )}
                        <button
                            type='button'
                            onClick={onClose}
                            disabled={isSubmitting}
                            className='px-5 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='px-5 py-2 rounded-full text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isSubmitting ? 'Saving…' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
