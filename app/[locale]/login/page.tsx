'use client'

import { useState } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
    const t = useTranslations('Login')
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Authentication failed')
                return
            }

            router.push('/dashboard')
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
                    {t('subtitle')}
                </p>

                {error && (
                    <p className='mb-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400'>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

                    <div className='flex flex-col gap-1.5'>
                        <label
                            htmlFor='password'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('password')}
                        </label>
                        <input
                            id='password'
                            type='password'
                            autoComplete='current-password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='mt-2 w-full rounded-full px-5 py-2.5 bg-terciary text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-terciary transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? '...' : t('submit')}
                    </button>
                </form>

                <p className='mt-6 text-center text-sm text-terciary/60'>
                    {t('noAccount')}{' '}
                    <Link
                        href='/register'
                        className='text-terciary font-medium hover:opacity-70 transition-opacity duration-200 underline underline-offset-2'
                    >
                        {t('signUp')}
                    </Link>
                </p>
            </div>
        </div>
    )
}
