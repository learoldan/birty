'use client'

import { useState } from 'react'
import MonthDayInput from './MonthDayInput'

type CreateBirthdayModalProps = {
    onClose: () => void
    onCreated: () => void
}

const inputClass =
    'w-full rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'

const monthDayClass =
    'rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'

export default function CreateBirthdayModal({
    onClose,
    onCreated,
}: CreateBirthdayModalProps) {
    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        notes: '',
    })
    const [alerts, setAlerts] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const addAlert = () => {
        if (alerts.length < 2) setAlerts((prev) => [...prev, ''])
    }

    const removeAlert = (index: number) => {
        setAlerts((prev) => prev.filter((_, i) => i !== index))
    }

    const handleAlertChange = (index: number, value: string) => {
        setAlerts((prev) => prev.map((a, i) => (i === index ? value : a)))
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
                    birthDate: form.birthDate,
                    notes: form.notes,
                    alerts: alerts.filter((a) => a.length > 0),
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
                        <MonthDayInput
                            value={form.birthDate}
                            onChange={(v) =>
                                setForm((prev) => ({ ...prev, birthDate: v }))
                            }
                            className={monthDayClass}
                            required
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
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-terciary/80'>
                                Alerts
                            </label>
                            {alerts.length < 2 && (
                                <button
                                    type='button'
                                    onClick={addAlert}
                                    className='text-xs text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer'
                                >
                                    + Add alert
                                </button>
                            )}
                        </div>
                        {alerts.map((alert, index) => (
                            <div
                                key={index}
                                className='flex gap-2 items-center'
                            >
                                <MonthDayInput
                                    value={alert}
                                    onChange={(v) =>
                                        handleAlertChange(index, v)
                                    }
                                    className={monthDayClass}
                                />
                                <button
                                    type='button'
                                    onClick={() => removeAlert(index)}
                                    className='text-xs text-secondary hover:text-secondary/80 transition-colors duration-200 cursor-pointer shrink-0'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
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
