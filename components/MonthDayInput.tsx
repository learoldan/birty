'use client'

import { useState } from 'react'

const MONTHS = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
]

type Props = {
    value: string // MM-DD or ''
    onChange: (value: string) => void
    className?: string
    required?: boolean
}

export default function MonthDayInput({
    value,
    onChange,
    className,
    required,
}: Props) {
    const parts = value ? value.split('-') : ['', '']
    const [month, setMonth] = useState(parts[0] ?? '')
    const [day, setDay] = useState(
        parts[1] ? parseInt(parts[1], 10).toString() : '',
    )

    const emit = (m: string, d: string) => {
        if (m && d) {
            onChange(`${m}-${d.padStart(2, '0')}`)
        } else {
            onChange('')
        }
    }

    const handleMonth = (m: string) => {
        setMonth(m)
        emit(m, day)
    }

    const handleDay = (d: string) => {
        setDay(d)
        emit(month, d)
    }

    return (
        <div className='flex gap-2'>
            <select
                value={month}
                onChange={(e) => handleMonth(e.target.value)}
                required={required}
                className={`flex-1 ${className ?? ''}`}
            >
                <option value=''>Month</option>
                {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                        {m.label}
                    </option>
                ))}
            </select>
            <input
                type='number'
                min={1}
                max={31}
                placeholder='Day'
                value={day}
                onChange={(e) => handleDay(e.target.value)}
                required={required}
                className={`w-20 ${className ?? ''}`}
            />
        </div>
    )
}
