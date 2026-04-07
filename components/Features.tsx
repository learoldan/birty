'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState, CSSProperties } from 'react'
import Button from './Button'

export type AnimationType = 'slide' | 'fade' | 'zoom'

type FeaturesProps = {
    imageSrc: string
    imageAlt: string
    title: string
    subtitle: string
    cta: string
    animation?: AnimationType
    imagePosition?: 'left' | 'right'
    variant?: 'primary' | 'secondary'
    href?: string
}

function getHiddenStyle(
    type: AnimationType,
    side: 'left' | 'right',
): CSSProperties {
    const base: CSSProperties = {
        opacity: 0,
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    }
    switch (type) {
        case 'slide':
            return {
                ...base,
                transform:
                    side === 'left' ? 'translateX(-60px)' : 'translateX(60px)',
            }
        case 'fade':
            return { ...base, transform: 'translateY(48px)' }
        case 'zoom':
            return { ...base, transform: 'scale(0.82)' }
    }
}

const shownStyle: CSSProperties = {
    opacity: 1,
    transform: 'none',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
}

export default function Features({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    cta,
    animation = 'slide',
    imagePosition = 'left',
    variant = 'primary',
    href = '/login',
}: FeaturesProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const imgSide = imagePosition === 'left' ? 'left' : 'right'
    const textSide = imagePosition === 'left' ? 'right' : 'left'
    const textColor = variant === 'primary' ? 'text-primary' : 'text-secondary'

    const imageStyle: CSSProperties = visible
        ? shownStyle
        : getHiddenStyle(animation, imgSide)

    const textStyle: CSSProperties = visible
        ? { ...shownStyle, transitionDelay: '0.15s' }
        : {
              ...getHiddenStyle(animation, textSide),
              transitionDelay: '0.15s',
          }

    return (
        <section
            ref={sectionRef}
            className='flex flex-col items-center gap-10 px-6 py-20 lg:flex-row lg:gap-20 lg:items-center'
        >
            {/* Image */}
            <div
                className={`w-full lg:w-1/2 ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
                style={imageStyle}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className='w-full h-auto rounded-2xl object-cover'
                />
            </div>

            {/* Text */}
            <div
                className={`w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
                style={textStyle}
            >
                <h2
                    className={`mb-4 text-3xl font-extrabold uppercase tracking-tight font-stretch-50% ${textColor} sm:text-4xl lg:text-5xl`}
                >
                    {title}
                </h2>
                <p className='mb-8 max-w-md text-base leading-relaxed sm:text-lg'>
                    {subtitle}
                </p>
                <Link href={href}>
                    <Button variant='secondary'>{cta}</Button>
                </Link>
            </div>
        </section>
    )
}
