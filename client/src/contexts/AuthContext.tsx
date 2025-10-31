import AuthService, { LoginCredentials } from "../services/auth.service"
import { User } from "@/types"
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")
      if (token) {
        const userData = await AuthService.verifyToken()
        setUser(userData)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await AuthService.login(credentials)
      if (response.token) {
        localStorage.setItem("authToken", response.token)
        setUser(response.user)
        setIsAuthenticated(true)
      }
      setTimeout(() => {
        localStorage.setItem("authToken", response.token)
        setUser(response.user)
        setIsAuthenticated(true)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
      throw error
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      throw error
    } finally {
      localStorage.removeItem("authToken")
      sessionStorage.removeItem("userId")
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
