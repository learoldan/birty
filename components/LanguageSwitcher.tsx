'use client'

import { useLocale } from 'next-intl'
import { useTransition, useState, useRef, useEffect } from 'react'
import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'

type LanguageSwitcherProps = {
    className?: string
}

const localeLabels: Record<(typeof routing.locales)[number], string> = {
    en: 'EN',
    es: 'ES',
}

export default function LanguageSwitcher({
    className = '',
}: LanguageSwitcherProps) {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function switchLocale(next: (typeof routing.locales)[number]) {
        if (next === locale) {
            setOpen(false)
            return
        }
        startTransition(() => {
            router.replace(pathname, { locale: next })
        })
        setOpen(false)
    }

    const otherLocales = routing.locales.filter((l) => l !== locale)

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type='button'
                onClick={() => setOpen((prev) => !prev)}
                disabled={isPending}
                aria-haspopup='listbox'
                aria-expanded={open}
                className={`flex items-center gap-1.5 rounded-full bg-accent-dark px-3 py-2 text-sm lg:text-lg font-semibold text-terciary transition-colors duration-300 hover:bg-terciary hover:text-black ${isPending ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
            >
                {localeLabels[locale as (typeof routing.locales)[number]]}
                <svg
                    className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    viewBox='0 0 10 6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                >
                    <path
                        d='M1 1l4 4 4-4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    role='listbox'
                    className='absolute right-0 top-full mt-1 min-w-full overflow-hidden rounded-2xl bg-accent-dark py-1 shadow-lg'
                >
                    {otherLocales.map((nextLocale) => (
                        <li key={nextLocale}>
                            <button
                                role='option'
                                aria-selected={false}
                                type='button'
                                onClick={() => switchLocale(nextLocale)}
                                className='w-full px-3 py-2 text-sm font-semibold text-terciary transition-colors duration-200 hover:bg-terciary hover:text-black cursor-pointer'
                            >
                                {localeLabels[nextLocale]}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
