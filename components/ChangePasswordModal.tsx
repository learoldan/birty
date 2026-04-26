'use client'

import { useState } from 'react'
import PasswordInput from '@/components/PasswordInput'

type ChangePasswordModalProps = {
    onClose: () => void
}

export default function ChangePasswordModal({
    onClose,
}: ChangePasswordModalProps) {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (form.newPassword !== form.confirmPassword) {
            setError('New passwords do not match')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                }),
            })

            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}))
                throw new Error(message || 'Failed to change password')
            }

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
                <h2 className='text-xl font-semibold mb-6'>Change password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Current password
                        </label>
                        <PasswordInput
                            name='currentPassword'
                            value={form.currentPassword}
                            onChange={handleChange}
                            className='w-full rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            New password
                        </label>
                        <PasswordInput
                            name='newPassword'
                            value={form.newPassword}
                            onChange={handleChange}
                            className='w-full rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-terciary/80'>
                            Confirm new password
                        </label>
                        <PasswordInput
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className='w-full rounded-full px-5 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
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
