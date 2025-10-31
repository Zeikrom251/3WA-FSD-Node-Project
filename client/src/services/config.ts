import axios from "axios"

const Client = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")
      window.location.href = "/login"
    } else if (error.response?.status >= 500) {
      const event = new CustomEvent("api-error", {
        detail: {
          serverMessage: "Server error occurred",
          error: error.response.data,
        },
      })
      window.dispatchEvent(event)
    }
    return Promise.reject(error)
  }
)

export default Client
