'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  token: string | null;
  user: { id: number; username: string } | null;
  login: (token: string, user: { id: number; username: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<{ id: number; username: string } | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e)
        setUser(null)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (newToken: string, userData: { id: number; username: string }) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
