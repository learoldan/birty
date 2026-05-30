'use client'

import { useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import PasswordInput from '@/components/PasswordInput'

export default function ForgotPasswordPage() {
    const t = useTranslations('ForgotPassword')
    const router = useRouter()
    const [step, setStep] = useState<'request' | 'confirm'>('request')
    const [email, setEmail] = useState('')
    const [confirmationCode, setConfirmationCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleRequest(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Failed to send reset code')
                return
            }

            setStep('confirm')
        } catch {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleConfirm(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/confirm-forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, confirmationCode, newPassword }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Failed to reset password')
                return
            }

            router.push('/login')
        } catch {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-24'>
            <div className='w-full max-w-sm'>
                <h1 className='text-3xl font-bold text-terciary mb-2 text-center'>
                    {t('title')}
                </h1>
                <p className='text-terciary/60 text-sm text-center mb-8'>
                    {step === 'request'
                        ? t('subtitleRequest')
                        : t('subtitleConfirm')}
                </p>

                {error && (
                    <p className='mb-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400'>
                        {error}
                    </p>
                )}

                {step === 'request' ? (
                    <form
                        onSubmit={handleRequest}
                        className='flex flex-col gap-4'
                    >
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='email'
                                className='text-sm font-medium text-terciary/80'
                            >
                                {t('email')}
                            </label>
                            <input
                                id='email'
                                type='email'
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='you@example.com'
                                className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='mt-2 w-full rounded-full px-5 py-2.5 bg-terciary text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-terciary transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? '...' : t('submitRequest')}
                        </button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleConfirm}
                        className='flex flex-col gap-4'
                    >
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='confirmationCode'
                                className='text-sm font-medium text-terciary/80'
                            >
                                {t('code')}
                            </label>
                            <input
                                id='confirmationCode'
                                type='text'
                                inputMode='numeric'
                                autoComplete='one-time-code'
                                required
                                value={confirmationCode}
                                onChange={(e) =>
                                    setConfirmationCode(e.target.value)
                                }
                                placeholder='123456'
                                className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                            />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='newPassword'
                                className='text-sm font-medium text-terciary/80'
                            >
                                {t('newPassword')}
                            </label>
                            <PasswordInput
                                id='newPassword'
                                autoComplete='new-password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='••••••••'
                                className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='mt-2 w-full rounded-full px-5 py-2.5 bg-terciary text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-terciary transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? '...' : t('submitConfirm')}
                        </button>
                    </form>
                )}

                <p className='mt-6 text-center text-sm text-terciary/60'>
                    {t('rememberPassword')}{' '}
                    <Link
                        href='/login'
                        className='text-terciary font-medium hover:opacity-70 transition-opacity duration-200 underline underline-offset-2'
                    >
                        {t('signIn')}
                    </Link>
                </p>
            </div>
        </div>
    )
}
