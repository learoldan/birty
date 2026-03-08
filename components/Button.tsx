import React from 'react'

type ButtonProps = {
    variant: 'primary' | 'secondary'
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

export default function Button({
    variant,
    children,
    onClick,
    className = '',
}: ButtonProps) {
    const base =
        'px-5 py-2 rounded-full border-none font-medium transition-all duration-300 cursor-pointer text-sm tracking-wide lg:text-lg'

    const variants = {
        primary:
            'bg-accent-dark text-terciary hover:bg-terciary hover:text-black',
        secondary: 'bg-terciary text-black hover:bg-black hover:text-terciary',
    }

    return (
        <button
            onClick={onClick}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
