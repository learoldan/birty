'use client'

import { useCallback, useEffect, useState } from 'react'

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

type Reminder = {
    alertDate: string
    birthdayId: string
    userId: string
    userEmail: string
    userName: string
    birthdayName: string
}

type Birthday = {
    id: string
    name: string
    birthDate: string
    notes?: string
}

type AlertsModalProps = {
    birthday: Birthday
    onClose: () => void
}

export default function AlertsModal({ birthday, onClose }: AlertsModalProps) {
    const [alerts, setAlerts] = useState<Reminder[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newAlertMonth, setNewAlertMonth] = useState('')
    const [newAlertDay, setNewAlertDay] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [addError, setAddError] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [deletingDate, setDeletingDate] = useState<string | null>(null)

    const loadAlerts = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/birthdays/${birthday.id}/alerts`)
            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}))
                throw new Error(message || 'Failed to load alerts')
            }
            const data = await res.json()
            setAlerts(data.alerts ?? [])
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Could not load alerts',
            )
        } finally {
            setIsLoading(false)
        }
    }, [birthday.id])

    useEffect(() => {
        loadAlerts()
    }, [loadAlerts])

    const handleAddAlert = async (e: React.FormEvent) => {
        e.preventDefault()
        const alertDate =
            newAlertMonth && newAlertDay
                ? `${newAlertMonth}-${newAlertDay.padStart(2, '0')}`
                : ''
        if (!alertDate) return
        setIsAdding(true)
        setAddError(null)
        try {
            const res = await fetch(`/api/birthdays/${birthday.id}/alerts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: alertDate }),
            })
            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}))
                throw new Error(message || 'Failed to create alert')
            }
            setNewAlertMonth('')
            setNewAlertDay('')
            setShowAddForm(false)
            await loadAlerts()
        } catch (err) {
            setAddError(
                err instanceof Error ? err.message : 'Could not create alert',
            )
        } finally {
            setIsAdding(false)
        }
    }

    const handleDeleteAlert = async (date: string) => {
        setDeletingDate(date)
        try {
            const res = await fetch(
                `/api/birthdays/${birthday.id}/alerts/${encodeURIComponent(date)}`,
                { method: 'DELETE' },
            )
            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}))
                throw new Error(message || 'Failed to delete alert')
            }
            await loadAlerts()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Could not delete alert',
            )
        } finally {
            setDeletingDate(null)
        }
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                className='bg-accent-dark text-terciary rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl flex flex-col gap-6'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className='flex items-start justify-between gap-4'>
                    <h2 className='text-xl font-semibold'>Alerts</h2>
                    <button
                        onClick={onClose}
                        className='text-terciary/50 hover:text-terciary transition-colors duration-200 cursor-pointer text-lg leading-none'
                        aria-label='Close'
                    >
                        ✕
                    </button>
                </div>

                {/* Birthday info */}
                <div className='flex flex-col gap-1 rounded-xl bg-primary/10 px-5 py-4'>
                    <span className='text-base font-semibold'>
                        {birthday.name}
                    </span>
                    <span className='text-sm text-terciary/70'>
                        {birthday.birthDate}
                    </span>
                    {birthday.notes && (
                        <span className='text-sm text-terciary/60 mt-1'>
                            {birthday.notes}
                        </span>
                    )}
                </div>

                {/* Alerts section */}
                <div className='flex flex-col gap-3'>
                    <span className='text-sm font-medium opacity-75'>
                        Alerts
                    </span>

                    {isLoading ? (
                        <div className='flex flex-col gap-2'>
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className='h-10 rounded-lg bg-primary/10 animate-pulse'
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <p className='text-sm text-red-400'>{error}</p>
                    ) : alerts.length === 0 ? (
                        <p className='text-sm text-terciary/50'>
                            No alerts configured.
                        </p>
                    ) : (
                        <ul className='flex flex-col gap-2'>
                            {alerts.map((reminder) => (
                                <li
                                    key={reminder.alertDate}
                                    className='flex items-center justify-between rounded-lg bg-primary/10 px-4 py-2.5'
                                >
                                    <span className='text-sm'>
                                        {reminder.alertDate}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleDeleteAlert(
                                                reminder.alertDate,
                                            )
                                        }
                                        disabled={
                                            deletingDate === reminder.alertDate
                                        }
                                        className='px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-accent transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {deletingDate === reminder.alertDate
                                            ? 'Deleting…'
                                            : 'Delete'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Add alert */}
                    {!isLoading && alerts.length < 2 && (
                        <>
                            {showAddForm ? (
                                <form
                                    onSubmit={handleAddAlert}
                                    className='flex flex-col gap-2 mt-1'
                                >
                                    <div className='flex gap-2'>
                                        <select
                                            value={newAlertMonth}
                                            onChange={(e) =>
                                                setNewAlertMonth(e.target.value)
                                            }
                                            required
                                            className='flex-1 rounded-lg px-3 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                                        >
                                            <option value=''>Month</option>
                                            {MONTHS.map((m) => (
                                                <option
                                                    key={m.value}
                                                    value={m.value}
                                                >
                                                    {m.label}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type='number'
                                            min={1}
                                            max={31}
                                            placeholder='Day'
                                            value={newAlertDay}
                                            onChange={(e) =>
                                                setNewAlertDay(e.target.value)
                                            }
                                            required
                                            className='w-20 rounded-lg px-3 py-2.5 bg-accent text-terciary border border-terciary/20 focus:outline-none focus:border-terciary/60 text-sm transition-colors duration-200'
                                        />
                                    </div>
                                    {addError && (
                                        <p className='text-xs text-red-400'>
                                            {addError}
                                        </p>
                                    )}
                                    <div className='flex gap-2'>
                                        <button
                                            type='submit'
                                            disabled={
                                                isAdding ||
                                                !newAlertMonth ||
                                                !newAlertDay
                                            }
                                            className='flex-1 px-4 py-2 text-sm font-medium rounded-full bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {isAdding ? 'Adding…' : 'Add'}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setShowAddForm(false)
                                                setNewAlertMonth('')
                                                setNewAlertDay('')
                                                setAddError(null)
                                            }}
                                            className='flex-1 px-4 py-2 text-sm font-medium rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-200 cursor-pointer'
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className='self-start px-4 py-2 text-sm font-medium rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-accent transition-colors duration-200 cursor-pointer'
                                >
                                    + Add alert
                                </button>
                            )}
                        </>
                    )}

                    {!isLoading && alerts.length >= 2 && (
                        <p className='text-xs text-terciary/50'>
                            Maximum of 2 alerts reached.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
