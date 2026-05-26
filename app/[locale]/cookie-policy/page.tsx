import { useLocale } from 'next-intl'

const content = {
    en: {
        title: 'Cookie Policy',
        updated: 'Last updated: May 2025',
        sections: [
            {
                heading: 'What are cookies?',
                body: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.',
            },
            {
                heading: 'How we use cookies',
                body: 'Birty uses cookies to keep you signed in, remember your preferences, and — with your consent — to understand how our service is used and to deliver relevant content.',
            },
            {
                heading: 'Types of cookies we use',
                items: [
                    {
                        name: 'Necessary cookies',
                        description:
                            'These cookies are essential for the website to function correctly. They enable core features such as authentication and security. They cannot be disabled.',
                    },
                    {
                        name: 'Analytics cookies',
                        description:
                            'These cookies help us understand how visitors interact with our website (e.g. pages visited, time spent). We may use tools such as Google Analytics for this purpose. They are only set with your consent.',
                    },
                    {
                        name: 'Marketing cookies',
                        description:
                            'These cookies may be used in the future to deliver relevant advertisements and measure campaign effectiveness. They are only set with your explicit consent.',
                    },
                ],
            },
            {
                heading: 'Managing your preferences',
                body: 'You can change your cookie preferences at any time by clicking "Customize" in the cookie banner that appears when you visit our site. You may also clear cookies through your browser settings at any time.',
            },
            {
                heading: 'Third-party cookies',
                body: 'Some cookies may be set by third-party services that appear on our pages (e.g. Google Analytics). These third parties have their own privacy and cookie policies, which we encourage you to review.',
            },
            {
                heading: 'Contact',
                body: 'If you have any questions about our use of cookies, please contact us via our contact page.',
            },
        ],
    },
    es: {
        title: 'Política de cookies',
        updated: 'Última actualización: mayo 2025',
        sections: [
            {
                heading: '¿Qué son las cookies?',
                body: 'Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitás un sitio web. Ayudan al sitio a recordar tus preferencias y mejorar tu experiencia.',
            },
            {
                heading: 'Cómo usamos las cookies',
                body: 'Birty utiliza cookies para mantenerte conectado, recordar tus preferencias y, con tu consentimiento, para entender cómo se usa nuestro servicio y ofrecerte contenido relevante.',
            },
            {
                heading: 'Tipos de cookies que usamos',
                items: [
                    {
                        name: 'Cookies necesarias',
                        description:
                            'Estas cookies son esenciales para el correcto funcionamiento del sitio. Habilitan funciones básicas como la autenticación y la seguridad. No pueden desactivarse.',
                    },
                    {
                        name: 'Cookies analíticas',
                        description:
                            'Estas cookies nos ayudan a entender cómo interactúan los visitantes con nuestro sitio (p. ej., páginas visitadas, tiempo de permanencia). Podemos usar herramientas como Google Analytics. Solo se activan con tu consentimiento.',
                    },
                    {
                        name: 'Cookies de marketing',
                        description:
                            'Estas cookies podrían usarse en el futuro para mostrar publicidad relevante y medir la efectividad de campañas. Solo se activan con tu consentimiento explícito.',
                    },
                ],
            },
            {
                heading: 'Gestionar tus preferencias',
                body: 'Podés cambiar tus preferencias de cookies en cualquier momento haciendo clic en "Personalizar" en el banner de cookies que aparece al visitar el sitio. También podés eliminar las cookies desde la configuración de tu navegador.',
            },
            {
                heading: 'Cookies de terceros',
                body: 'Algunas cookies pueden ser establecidas por servicios de terceros presentes en nuestras páginas (p. ej., Google Analytics). Estos terceros tienen sus propias políticas de privacidad y cookies, que te recomendamos revisar.',
            },
            {
                heading: 'Contacto',
                body: 'Si tenés preguntas sobre el uso de cookies, podés contactarnos a través de nuestra página de contacto.',
            },
        ],
    },
}

export default function CookiePolicyPage() {
    const locale = useLocale()
    const c = content[locale as keyof typeof content] ?? content.en

    return (
        <div className='min-h-screen px-4 py-24'>
            <div className='mx-auto max-w-2xl'>
                <h1 className='text-3xl font-bold text-terciary mb-2'>
                    {c.title}
                </h1>
                <p className='text-sm text-terciary/50 mb-10'>{c.updated}</p>

                <div className='flex flex-col gap-8'>
                    {c.sections.map((section) => (
                        <section key={section.heading}>
                            <h2 className='text-lg font-semibold text-terciary mb-2'>
                                {section.heading}
                            </h2>
                            {'body' in section && (
                                <p className='text-sm text-terciary/70 leading-relaxed'>
                                    {section.body}
                                </p>
                            )}
                            {'items' in section && (
                                <ul className='flex flex-col gap-3 mt-2'>
                                    {section.items.map((item) => (
                                        <li key={item.name}>
                                            <span className='text-sm font-medium text-terciary'>
                                                {item.name}:{' '}
                                            </span>
                                            <span className='text-sm text-terciary/70 leading-relaxed'>
                                                {item.description}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
