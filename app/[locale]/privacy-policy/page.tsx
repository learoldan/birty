import { useLocale } from 'next-intl'

const content = {
    en: {
        title: 'Privacy Policy',
        updated: 'Last updated: May 2025',
        sections: [
            {
                heading: 'Who we are',
                body: 'Birty ("we", "our", "us") is a birthday reminder web application. We are committed to protecting your personal data and processing it in accordance with applicable data protection laws.',
            },
            {
                heading: 'Data we collect',
                items: [
                    {
                        name: 'Account information',
                        description:
                            'When you register, we collect your first name, last name, and email address.',
                    },
                    {
                        name: 'Birthday data',
                        description:
                            'Names, birthdates, and notes you enter for the people you want to remember.',
                    },
                    {
                        name: 'Usage data',
                        description:
                            'With your consent, we may collect anonymised data about how you use the service (e.g. pages visited) through analytics tools.',
                    },
                ],
            },
            {
                heading: 'How we use your data',
                items: [
                    {
                        name: 'Service delivery',
                        description:
                            'To create and manage your account, store your birthday data, and send you reminder notifications.',
                    },
                    {
                        name: 'Security',
                        description:
                            'To protect your account and prevent unauthorised access.',
                    },
                    {
                        name: 'Improvement',
                        description:
                            'With your consent, to understand how users interact with the service in order to improve it.',
                    },
                ],
            },
            {
                heading: 'Legal basis for processing',
                body: 'We process your data based on the performance of a contract (providing the service you signed up for), your consent (for analytics and marketing cookies), and our legitimate interests (security and fraud prevention).',
            },
            {
                heading: 'Data retention',
                body: 'We retain your personal data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.',
            },
            {
                heading: 'Third parties',
                body: 'We do not sell your personal data. We may share anonymised analytics data with third-party tools (e.g. Google Analytics) strictly with your consent. We may use third-party email infrastructure to deliver reminder notifications.',
            },
            {
                heading: 'Your rights',
                body: 'Depending on your jurisdiction, you may have the right to access, rectify, erase, or port your personal data, and to object to or restrict its processing. To exercise any of these rights, please contact us through the contact page.',
            },
            {
                heading: 'Cookies',
                body: 'We use cookies as described in our Cookie Policy. You can manage your cookie preferences at any time from the cookie banner.',
            },
            {
                heading: 'Changes to this policy',
                body: 'We may update this policy from time to time. We will notify registered users of significant changes by email. Continued use of the service after changes constitutes acceptance of the updated policy.',
            },
            {
                heading: 'Contact',
                body: 'For any privacy-related questions or requests, please reach out through our contact page.',
            },
        ],
    },
    es: {
        title: 'Política de privacidad',
        updated: 'Última actualización: mayo 2025',
        sections: [
            {
                heading: 'Quiénes somos',
                body: 'Birty ("nosotros", "nuestro") es una aplicación web de recordatorio de cumpleaños. Estamos comprometidos con la protección de tus datos personales y su tratamiento conforme a la legislación aplicable.',
            },
            {
                heading: 'Datos que recopilamos',
                items: [
                    {
                        name: 'Información de cuenta',
                        description:
                            'Al registrarte, recopilamos tu nombre, apellido y dirección de correo electrónico.',
                    },
                    {
                        name: 'Datos de cumpleaños',
                        description:
                            'Nombres, fechas de cumpleaños y notas que ingresás sobre las personas que querés recordar.',
                    },
                    {
                        name: 'Datos de uso',
                        description:
                            'Con tu consentimiento, podemos recopilar datos anonimizados sobre cómo usás el servicio (p. ej., páginas visitadas) a través de herramientas analíticas.',
                    },
                ],
            },
            {
                heading: 'Cómo usamos tus datos',
                items: [
                    {
                        name: 'Prestación del servicio',
                        description:
                            'Para crear y gestionar tu cuenta, almacenar tus cumpleaños y enviarte notificaciones de recordatorio.',
                    },
                    {
                        name: 'Seguridad',
                        description:
                            'Para proteger tu cuenta y prevenir accesos no autorizados.',
                    },
                    {
                        name: 'Mejora del servicio',
                        description:
                            'Con tu consentimiento, para entender cómo los usuarios interactúan con el servicio y mejorarlo.',
                    },
                ],
            },
            {
                heading: 'Base legal del tratamiento',
                body: 'Tratamos tus datos en base a la ejecución de un contrato (prestación del servicio al que te registraste), tu consentimiento (para cookies analíticas y de marketing) y nuestros intereses legítimos (seguridad y prevención del fraude).',
            },
            {
                heading: 'Retención de datos',
                body: 'Conservamos tus datos personales mientras tu cuenta esté activa. Podés solicitar la eliminación de tu cuenta y datos asociados en cualquier momento contactándonos.',
            },
            {
                heading: 'Terceros',
                body: 'No vendemos tus datos personales. Podemos compartir datos analíticos anonimizados con herramientas de terceros (p. ej., Google Analytics) estrictamente con tu consentimiento. Podemos utilizar infraestructura de email de terceros para enviar notificaciones.',
            },
            {
                heading: 'Tus derechos',
                body: 'Según tu jurisdicción, podés tener derecho a acceder, rectificar, eliminar o portar tus datos, y a oponerte o limitar su tratamiento. Para ejercer cualquiera de estos derechos, contactanos a través de la página de contacto.',
            },
            {
                heading: 'Cookies',
                body: 'Usamos cookies tal como se describe en nuestra Política de cookies. Podés gestionar tus preferencias en cualquier momento desde el banner de cookies.',
            },
            {
                heading: 'Cambios en esta política',
                body: 'Podemos actualizar esta política periódicamente. Notificaremos a los usuarios registrados sobre cambios significativos por correo electrónico. El uso continuado del servicio tras los cambios implica la aceptación de la política actualizada.',
            },
            {
                heading: 'Contacto',
                body: 'Para cualquier consulta o solicitud relacionada con privacidad, contactanos a través de nuestra página de contacto.',
            },
        ],
    },
}

export default function PrivacyPolicyPage() {
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
                                    {section?.items?.map((item) => (
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
