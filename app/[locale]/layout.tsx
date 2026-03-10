import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/Header'
import '../globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Birty',
    description: 'Your friendly birthday reminder app',
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()

    return (
        <div
            lang={locale}
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-accent`}
        >
            <NextIntlClientProvider>
                <Header />
                {children}
            </NextIntlClientProvider>
        </div>
    )
}
