import { LoginResponse } from "@/types"
import Client from "./config"

export interface LoginCredentials {
  email: string
  password: string
}

const AuthService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response: LoginResponse = await Client.post(
        "/auth/login",
        credentials
      )
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("authToken")
      sessionStorage.removeItem("userId")
    } catch (error) {
      localStorage.removeItem("authToken")
      sessionStorage.removeItem("userId")
      throw error
    }
  },

  verifyToken: async () => {
    try {
      const response = await Client.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        withCredentials: true,
      })

      return response?.data?.user
    } catch (error) {
      throw error
    }
  },
}

export default AuthService
