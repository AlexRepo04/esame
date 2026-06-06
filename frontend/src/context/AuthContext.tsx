import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authAPI } from '../api/api'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      try { setUser(JSON.parse(savedUser)) } 
      catch { localStorage.removeItem('token'); localStorage.removeItem('user') }
    }
    setLoading(false)
  }, [])

  // USA L'API PER IL LOGIN
    const login = async (username: string, password: string) => {
    const response = await authAPI.login({ username, password })
    const { token, username: name, email } = response

    const userData: User = { username: name, email }
    // Preferisci il token dal backend se presente, altrimenti mantieni un token fittizio
    localStorage.setItem('token', token || 'fake-token-for-frontend-routing')
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const register = async (username: string, email: string, password: string) => {
    const response = await authAPI.register({ username, email, password })
    const { token, username: name, email: mail } = response

    const userData: User = { username: name, email: mail }
    localStorage.setItem('token', token || 'fake-token-for-frontend-routing')
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve essere usato dentro <AuthProvider>')
  return context
}