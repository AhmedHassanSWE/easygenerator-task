import axios from 'axios'
import { authService } from './auth-service'
import { UpdateProfileRequest, UserProfile } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://13.48.131.154:80/api'

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
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const userService = {
  // Get user profile
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await api.get<UserProfile>('/users/profile')
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to get user profile')
      }
      throw new Error('Network error. Please try again.')
    }
  },

  // Update user profile
  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const response = await api.patch<UserProfile>('/users/profile', data)
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to update profile')
      }
      throw new Error('Network error. Please try again.')
    }
  },
}

export default userService