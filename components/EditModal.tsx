'use client'

import { useState } from 'react'

type UserData = {
    firstName: string
    lastName: string
    email: string
}

type BirthdayData = {
    name: string
    birthdate: string
    notes: string
}

type EditModalProps =
    | { variant: 'user'; data: UserData; onClose: () => void }
    | { variant: 'birthday'; data: BirthdayData; onClose: () => void }

const inputClass =
    'bg-accent rounded-lg px-4 py-2 text-terciary outline-none focus:ring-2 focus:ring-primary'

export default function EditModal(props: EditModalProps) {
    const { variant, data, onClose } = props

    const [form, setForm] = useState({ ...data })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onClose()
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                className='bg-accent-dark text-terciary rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl'
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className='text-xl font-semibold mb-6'>
                    {variant === 'user' ? 'Edit profile' : 'Edit birthday'}
                </h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {variant === 'user' && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    First name
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={(form as UserData).firstName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Last name
                                </label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={(form as UserData).lastName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={(form as UserData).email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </>
                    )}

                    {variant === 'birthday' && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    value={(form as BirthdayData).name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Birthdate
                                </label>
                                <input
                                    type='date'
                                    name='birthdate'
                                    value={(form as BirthdayData).birthdate}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-sm opacity-75'>
                                    Notes
                                </label>
                                <textarea
                                    name='notes'
                                    value={(form as BirthdayData).notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </>
                    )}

                    <div className='flex justify-end gap-3 mt-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-5 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-200 cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-5 py-2 rounded-full text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors duration-200 cursor-pointer'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
