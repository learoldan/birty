'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'
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

    return (
        <div
            className={`inline-flex items-center gap-1 rounded-full bg-accent-dark px-1 py-1 ${className}`}
        >
            {routing.locales.map((nextLocale) => {
                const isActive = locale === nextLocale

                return (
                    <button
                        key={nextLocale}
                        type='button'
                        onClick={() => {
                            if (nextLocale === locale) return

                            startTransition(() => {
                                router.replace(pathname, { locale: nextLocale })
                            })
                        }}
                        disabled={isPending}
                        aria-pressed={isActive}
                        className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                            isActive
                                ? 'bg-terciary text-black'
                                : 'bg-transparent text-terciary hover:bg-terciary hover:text-black'
                        } ${isPending ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
                    >
                        {localeLabels[nextLocale]}
                    </button>
                )
            })}
        </div>
    )
}
