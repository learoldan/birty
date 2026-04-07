import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Footer() {
    const t = useTranslations('Footer')

    const navLinks = [
        { label: t('nav.contact'), href: '/contact' },
        { label: t('nav.blog'), href: '/blog' },
        { label: t('nav.login'), href: '/login' },
    ]

    const policyLinks = [
        { label: t('policies.cookies'), href: '/cookie-policy' },
        { label: t('policies.privacy'), href: '/privacy-policy' },
    ]

    return (
        <footer className='w-full bg-accent-dark text-terciary mt-16'>
            <div className='mx-auto px-4 py-10'>
                <div className='flex flex-row gap-12'>
                    {/* Logo */}
                    <div className='shrink-0 flex items-center lg:justify-start'>
                        <Link href='/'>
                            <Image
                                src='/logo.png'
                                alt={t('logoAlt')}
                                width={90}
                                height={36}
                                className='md:w-32.5 md:h-13'
                            />
                        </Link>
                    </div>

                    {/* Links columns */}
                    <div className='flex flex-1 gap-6 md:gap-16 lg:justify-center'>
                        {/* Navigation */}
                        <div className='flex flex-col gap-3'>
                            <p className='font-semibold text-sm uppercase tracking-widest opacity-60 mb-1'>
                                {t('menuTitle')}
                            </p>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className='text-sm hover:opacity-70 transition-opacity duration-200'
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Policies */}
                        <div className='flex flex-col gap-3'>
                            <p className='font-semibold text-sm uppercase tracking-widest opacity-60 mb-1'>
                                {t('legalTitle')}
                            </p>
                            {policyLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className='text-sm hover:opacity-70 transition-opacity duration-200'
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className='border-t border-terciary/20 py-4 text-center text-xs opacity-50'>
                {t('madeBy')}
            </div>
        </footer>
    )
}
