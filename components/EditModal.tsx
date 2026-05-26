'use client'

import { useState } from 'react'
import MonthDayInput from './MonthDayInput'
import toast from 'react-hot-toast'

type UserData = {
    firstName: string
    lastName: string
}

type BirthdayData = {
    name: string
    birthDate: string
    notes: string
    alerts: string[]
}

type EditModalProps =
    | {
          variant: 'user'
          data: UserData
          onClose: () => void
          onSave: (data: UserData) => Promise<void>
      }
    | {
          variant: 'birthday'
          id: string
          data: BirthdayData
          onClose: () => void
          onSaved: () => void
      }

const inputClass =
    'bg-accent rounded-lg px-4 py-2 text-terciary outline-none focus:ring-2 focus:ring-primary'

export default function EditModal(props: EditModalProps) {
    const { variant, data, onClose } = props

    const [form, setForm] = useState({ ...data })
    const [alerts, setAlerts] = useState<string[]>(
        variant === 'birthday' ? (data as BirthdayData).alerts : [],
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const addAlert = () => {
        if (alerts.length < 2) setAlerts((prev) => [...prev, ''])
    }

    const removeAlert = (index: number) => {
        setAlerts((prev) => prev.filter((_, i) => i !== index))
    }

    const handleAlertChange = (index: number, value: string) => {
        setAlerts((prev) => prev.map((a, i) => (i === index ? value : a)))
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        if (variant === 'user') {
            try {
                await (
                    props as Extract<EditModalProps, { variant: 'user' }>
                ).onSave(form as UserData)
                toast.success('Profile updated')
                onClose()
            } catch (err) {
                const msg =
                    err instanceof Error ? err.message : 'Something went wrong'
                setError(msg)
                toast.error(msg)
            } finally {
                setIsSubmitting(false)
            }
        } else {
            try {
                const birthdayForm = form as BirthdayData
                const { id, onSaved } = props as Extract<
                    EditModalProps,
                    { variant: 'birthday' }
                >
                const res = await fetch(`/api/birthdays/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: birthdayForm.name,
                        birthDate: birthdayForm.birthDate,
                        notes: birthdayForm.notes,
                        alerts: alerts.filter((a) => a.length > 0),
                    }),
                })
                if (!res.ok) {
                    const { message } = await res.json().catch(() => ({}))
                    throw new Error(message || 'Failed to update birthday')
                }
                onSaved()
                onClose()
            } catch (err) {
                const msg =
                    err instanceof Error ? err.message : 'Something went wrong'
                setError(msg)
                toast.error(msg)
            } finally {
                setIsSubmitting(false)
            }
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
                <h2 className='text-xl font-semibold mb-6'>
                    {variant === 'user' ? 'Edit profile' : 'Edit birthday'}
                </h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {variant === 'user' && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    First name
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={(form as UserData).firstName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Last name
                                </label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={(form as UserData).lastName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </>
                    )}

                    {variant === 'birthday' && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    value={(form as BirthdayData).name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Birthdate
                                </label>
                                <MonthDayInput
                                    value={(form as BirthdayData).birthDate}
                                    onChange={(v) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            birthDate: v,
                                        }))
                                    }
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Notes
                                </label>
                                <textarea
                                    name='notes'
                                    value={(form as BirthdayData).notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm opacity-75'>
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
                                            className={inputClass}
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
                        </>
                    )}

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
