import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react"

interface User {
  id: number
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
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
        // const userData = await authService.verifyToken();
        // setUser(userData);
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      // const response = await authService.login(credentials);
      // if (response.token) {
      //   localStorage.setItem('authToken', response.token);
      //   setUser(response.user);
      //   setIsAuthenticated(true);
      // }
      setTimeout(() => {
        localStorage.setItem("authToken", "fake-token")
        setUser({ id: 1, email: credentials.email, role: "user" })
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

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
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
