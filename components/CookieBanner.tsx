'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type CookieConsent = {
    necessary: true
    analytics: boolean
    marketing: boolean
}

const STORAGE_KEY = 'birty_cookie_consent'

function loadConsent(): CookieConsent | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        return JSON.parse(raw) as CookieConsent
    } catch {
        return null
    }
}

function saveConsent(consent: CookieConsent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
}

export default function CookieBanner() {
    const t = useTranslations('CookieBanner')
    const [visible, setVisible] = useState(false)
    const [customizing, setCustomizing] = useState(false)
    const [analytics, setAnalytics] = useState(false)
    const [marketing, setMarketing] = useState(false)

    useEffect(() => {
        const consent = loadConsent()
        if (!consent) setVisible(true)
    }, [])

    if (!visible) return null

    const accept = (consent: CookieConsent) => {
        saveConsent(consent)
        setVisible(false)
    }

    const acceptAll = () =>
        accept({ necessary: true, analytics: true, marketing: true })

    const rejectAll = () =>
        accept({ necessary: true, analytics: false, marketing: false })

    const saveCustom = () => accept({ necessary: true, analytics, marketing })

    return (
        <div
            role='dialog'
            aria-modal='true'
            aria-label={t('title')}
            className='fixed bottom-0 left-0 right-0 z-100 p-4 md:p-6 flex justify-center'
        >
            <div className='w-full max-w-2xl bg-accent-dark text-terciary rounded-2xl shadow-2xl border border-terciary/10 p-6 flex flex-col gap-4'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <p className='font-semibold text-base mb-1'>
                            {t('title')}
                        </p>
                        <p className='text-sm text-terciary/70'>
                            {t('description')}{' '}
                            <Link
                                href='/cookie-policy'
                                className='underline hover:opacity-70 transition-opacity duration-200'
                            >
                                {t('learnMore')}
                            </Link>
                        </p>
                    </div>
                    <button
                        type='button'
                        onClick={rejectAll}
                        aria-label='Close'
                        className='shrink-0 text-terciary/40 hover:text-terciary transition-colors duration-200 cursor-pointer'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>
                </div>

                {customizing && (
                    <div className='flex flex-col gap-3 border-t border-terciary/10 pt-4'>
                        {/* Necessary */}
                        <div className='flex items-start justify-between gap-4'>
                            <div>
                                <p className='text-sm font-medium'>
                                    {t('necessary.label')}
                                </p>
                                <p className='text-xs text-terciary/60 mt-0.5'>
                                    {t('necessary.description')}
                                </p>
                            </div>
                            <span className='text-xs text-terciary/50 shrink-0 mt-0.5'>
                                {t('necessary.alwaysOn')}
                            </span>
                        </div>

                        {/* Analytics */}
                        <div className='flex items-start justify-between gap-4'>
                            <div>
                                <p className='text-sm font-medium'>
                                    {t('analytics.label')}
                                </p>
                                <p className='text-xs text-terciary/60 mt-0.5'>
                                    {t('analytics.description')}
                                </p>
                            </div>
                            <button
                                type='button'
                                role='switch'
                                aria-checked={analytics}
                                onClick={() => setAnalytics((v) => !v)}
                                className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer ${analytics ? 'bg-primary' : 'bg-terciary/20'}`}
                            >
                                <span
                                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 ${analytics ? 'translate-x-4.5' : 'translate-x-0.5'}`}
                                />
                            </button>
                        </div>

                        {/* Marketing */}
                        <div className='flex items-start justify-between gap-4'>
                            <div>
                                <p className='text-sm font-medium'>
                                    {t('marketing.label')}
                                </p>
                                <p className='text-xs text-terciary/60 mt-0.5'>
                                    {t('marketing.description')}
                                </p>
                            </div>
                            <button
                                type='button'
                                role='switch'
                                aria-checked={marketing}
                                onClick={() => setMarketing((v) => !v)}
                                className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer ${marketing ? 'bg-primary' : 'bg-terciary/20'}`}
                            >
                                <span
                                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 ${marketing ? 'translate-x-4.5' : 'translate-x-0.5'}`}
                                />
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex flex-wrap gap-2 justify-end border-t border-terciary/10 pt-4'>
                    {!customizing ? (
                        <>
                            <button
                                onClick={() => setCustomizing(true)}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-terciary/10 text-terciary hover:bg-terciary/20 transition-colors duration-200 cursor-pointer'
                            >
                                {t('customize')}
                            </button>
                            <button
                                onClick={rejectAll}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-terciary/10 text-terciary hover:bg-terciary/20 transition-colors duration-200 cursor-pointer'
                            >
                                {t('rejectAll')}
                            </button>
                            <button
                                onClick={acceptAll}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer'
                            >
                                {t('acceptAll')}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={rejectAll}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-terciary/10 text-terciary hover:bg-terciary/20 transition-colors duration-200 cursor-pointer'
                            >
                                {t('rejectAll')}
                            </button>
                            <button
                                onClick={saveCustom}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-200 cursor-pointer'
                            >
                                {t('save')}
                            </button>
                            <button
                                onClick={acceptAll}
                                className='px-4 py-2 text-sm font-medium rounded-full bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer'
                            >
                                {t('acceptAll')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
