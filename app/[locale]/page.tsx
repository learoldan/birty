import Hero from '@/components/Hero'
import Features from '@/components/Features'
import { useTranslations } from 'next-intl'

export default function Home() {
    const t = useTranslations('Features')
    return (
        <div className='flex min-h-screen items-center justify-center font-sans'>
            <main className='flex min-h-screen w-full max-w-325 flex-col items-center justify-between py-8 px-4 sm:items-start'>
                <Hero />
                <Features
                    imageSrc='/reminders.webp'
                    imageAlt='Recordatorios de cumpleaños'
                    title={t('A.title')}
                    subtitle={t('A.subtitle')}
                    cta={t('A.cta')}
                    animation='slide'
                    imagePosition='left'
                    variant='secondary'
                />
                <Features
                    imageSrc='/tracking.webp'
                    imageAlt='Seguimiento de cumpleaños'
                    title={t('B.title')}
                    subtitle={t('B.subtitle')}
                    cta={t('B.cta')}
                    animation='fade'
                    imagePosition='right'
                />
                <Features
                    imageSrc='/emails.webp'
                    imageAlt='Recordatorios de cumpleaños por correo electrónico'
                    title={t('C.title')}
                    subtitle={t('C.subtitle')}
                    cta={t('C.cta')}
                    animation='zoom'
                    imagePosition='left'
                    variant='secondary'
                />
            </main>
        </div>
    )
}
