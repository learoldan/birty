'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
    const t = useTranslations('Contact')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: implement contact form submission
        // payload: { name, email, message }
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
                            htmlFor='name'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('name')}
                        </label>
                        <input
                            id='name'
                            type='text'
                            autoComplete='name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            htmlFor='message'
                            className='text-sm font-medium text-terciary/80'
                        >
                            {t('message')}
                        </label>
                        <textarea
                            id='message'
                            required
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('messagePlaceholder')}
                            className='w-full rounded-2xl px-5 py-3 bg-accent-dark text-terciary placeholder:text-terciary/30 border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200 resize-none'
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-2 w-full rounded-full px-5 py-2.5 bg-terciary text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-terciary transition-all duration-300 cursor-pointer'
                    >
                        {t('submit')}
                    </button>
                </form>
            </div>
        </div>
    )
}
