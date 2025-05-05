import axios from 'axios'
import Cookies from 'js-cookie'
import { AuthResponse, LoginRequest, RegisterRequest } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const TOKEN_KEY = 'auth_token'

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error
    
//     // Handle unauthorized errors (401)
//     if (response && response.status === 401) {
//       removeToken()
//       // Only redirect if we're in the browser
//       if (typeof window !== 'undefined') {
//         window.location.href = '/'
//       }
//     }
    
//     return Promise.reject(error)
//   }
// )

// Get token from cookies
const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

// Save token to cookies
const saveToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }) // Expires in 7 days
}

// Remove token from cookies
const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}

export const authService = {
  // Register a new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data)
      saveToken(response.data.token)
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed')
      }
      throw new Error('Network error. Please try again.')
    }
  },

  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data)
      saveToken(response.data.token)
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Authentication failed')
      }
      throw new Error('Network error. Please try again.')
    }
  },

  // Logout user
  logout(): void {
    removeToken()
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getToken()
  },

  // Get authentication token
  getToken
}

export default authService