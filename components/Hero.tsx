import { useTranslations } from 'next-intl'
import Button from './Button'

export default function Hero() {
    const t = useTranslations('Hero')

    return (
        <section className='flex min-h-screen flex-col items-center justify-center py-8 text-center'>
            <h1 className='mb-6 text-5xl/10 font-extrabold uppercase tracking-tight font-stretch-50% sm:text-7xl/14 lg:text-9xl/26 xl:text-[160px]/32 text-primary'>
                {t('title')}
            </h1>

            <p className='mb-10 max-w-md text-base leading-relaxed sm:text-lg xl:text-xl'>
                {t('subtitle')}
            </p>

            <Button variant='secondary'>{t('cta')}</Button>
        </section>
    )
}
