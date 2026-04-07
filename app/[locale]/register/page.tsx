'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function RegisterPage() {
    const t = useTranslations('Register')
    const [firstNames, setFirstNames] = useState('')
    const [lastNames, setLastNames] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: implement registration
        // payload: { firstNames, lastNames, email, password }
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

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label
                            htmlFor='firstNames'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('firstNames')}
                        </label>
                        <input
                            id='firstNames'
                            type='text'
                            autoComplete='given-name'
                            required
                            value={firstNames}
                            onChange={(e) => setFirstNames(e.target.value)}
                            className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label
                            htmlFor='lastNames'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('lastNames')}
                        </label>
                        <input
                            id='lastNames'
                            type='text'
                            autoComplete='family-name'
                            required
                            value={lastNames}
                            onChange={(e) => setLastNames(e.target.value)}
                            className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>

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
                            autoComplete='new-password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full rounded-full px-5 py-2.5 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-2 w-full rounded-full px-5 py-2.5 bg-terciary text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-terciary transition-all duration-300 cursor-pointer'
                    >
                        {t('submit')}
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
