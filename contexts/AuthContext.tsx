'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from 'react'

export type User = {
    id: string
    email: string
    firstNames: string
    lastNames: string
}

type AuthContextValue = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    refresh: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refresh = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me')
            if (res.ok) {
                const { user } = await res.json()
                setUser(user)
            } else {
                setUser(null)
            }
        } catch {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        setUser(null)
    }, [])

    useEffect(() => {
        refresh()
    }, [refresh])

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, isLoading, refresh, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}
