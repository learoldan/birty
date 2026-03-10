import Hero from '@/components/Hero'

export default function Home() {
    return (
        <div className='flex min-h-screen items-center justify-center font-sans'>
            <main className='flex min-h-screen w-full max-w-325 flex-col items-center justify-between py-8 px-4 sm:items-start'>
                <Hero />
            </main>
        </div>
    )
}
