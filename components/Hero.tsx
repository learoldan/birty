import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Button from './Button'

export default function Hero() {
    const t = useTranslations('Hero')

    return (
        <section className='flex min-h-screen flex-col items-center justify-center py-8 text-center'>
            <h1 className='mb-6 text-5xl/12 font-extrabold uppercase tracking-tight font-stretch-50% sm:text-7xl/17 lg:text-9xl/30 xl:text-[160px]/38 text-primary'>
                {t('title')}
            </h1>

            <p className='mb-10 max-w-md text-base leading-relaxed sm:text-lg xl:text-xl'>
                {t('subtitle')}
            </p>

            <Link href='/login'>
                <Button variant='secondary'>{t('cta')}</Button>
            </Link>
        </section>
    )
}
