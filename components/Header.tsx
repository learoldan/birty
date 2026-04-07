'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import Button from './Button'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslations } from 'next-intl'

export default function Header() {
    const t = useTranslations('Header')
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { label: t('nav.contact'), href: '/contact' },
        { label: t('nav.blog'), href: '/blog' },
    ]

    return (
        <header className='w-full bg-transparent absolute top-0 left-0 z-50'>
            <div className='max-w-7xl mx-auto p-4 flex items-center gap-4'>
                {/* Left: nav (desktop) | hamburger (mobile) */}
                <div className='flex-1 flex items-center gap-2'>
                    <nav className='hidden md:flex items-center gap-2'>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <Button variant='primary'>{link.label}</Button>
                            </Link>
                        ))}
                        <LanguageSwitcher />
                    </nav>

                    <button
                        className='md:hidden flex flex-col gap-1.5 p-2'
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={t('toggleMenu')}
                    >
                        <span
                            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                                menuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                                menuOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                                menuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        />
                    </button>
                    <div className='md:hidden'>
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Center: logo */}
                <Link href='/' className='flex justify-center'>
                    <Image
                        src='/logo.png'
                        alt={t('logoAlt')}
                        width={130}
                        height={52}
                        priority
                    />
                </Link>

                {/* Right: login button */}
                <div className='flex-1 flex items-center justify-end gap-3'>
                    <Link href='/login'>
                        <Button variant='secondary'>{t('login')}</Button>
                    </Link>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <nav className='flex flex-col gap-2 px-6 pb-6'>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Button
                                variant='primary'
                                className='w-full text-left'
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                    <div>
                        <Link href='/login'>
                            <Button variant='secondary' className='w-full'>
                                {t('login')}
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
