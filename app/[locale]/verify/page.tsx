'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function VerifyPage() {
    const t = useTranslations('Verify')
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email') ?? ''

    const [code, setCode] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, confirmationCode: code }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Verification failed')
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
                <p className='text-terciary/60 text-sm text-center mb-2'>
                    {t('subtitle')}
                </p>
                {email && (
                    <p className='text-terciary font-medium text-sm text-center mb-8'>
                        {email}
                    </p>
                )}

                {error && (
                    <p className='mb-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400'>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label
                            htmlFor='code'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('code')}
                        </label>
                        <input
                            id='code'
                            type='text'
                            inputMode='numeric'
                            autoComplete='one-time-code'
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='123456'
                            className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200 tracking-widest text-center'
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
                    {t('hasAccount')}{' '}
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
