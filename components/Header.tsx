'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import Button from './Button'
import LanguageSwitcher from './LanguageSwitcher'

const navLinks = ['Exhibits', 'Contact', 'Blog']

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className='w-full bg-transparent absolute top-0 left-0 z-50'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center'>
                {/* Left: nav (desktop) | hamburger (mobile) */}
                <div className='flex-1 flex items-center gap-2'>
                    <nav className='hidden md:flex items-center gap-2'>
                        {navLinks.map((link) => (
                            <Button key={link} variant='primary'>
                                {link}
                            </Button>
                        ))}
                    </nav>

                    <button
                        className='md:hidden flex flex-col gap-1.5 p-2'
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label='Toggle menu'
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
                </div>

                {/* Center: logo */}
                <Link href='/' className='flex justify-center'>
                    <Image
                        src='/logo.png'
                        alt='Logo'
                        width={130}
                        height={52}
                        priority
                    />
                </Link>

                {/* Right: login button */}
                <div className='flex-1 flex items-center justify-end gap-3'>
                    <LanguageSwitcher />
                    <Button variant='secondary'>Login</Button>
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
                        <Button
                            key={link}
                            variant='primary'
                            className='w-full text-left'
                        >
                            {link}
                        </Button>
                    ))}
                    <div className='mt-2'>
                        <LanguageSwitcher className='w-full justify-center' />
                    </div>
                    <div>
                        <Button variant='secondary' className='w-full'>
                            Login
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
