import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AUTH_KEY = 'cresco_hrms_auth'
const TOKEN_KEY = 'cresco_hrms_token'
const API_URL = import.meta.env.VITE_API_URL || '/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setUser(null)
      return
    }

    axios
      .get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUser(response.data.user)
        localStorage.setItem(AUTH_KEY, JSON.stringify(response.data.user))
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(AUTH_KEY)
        setUser(null)
      })
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const { token, user: authUser } = response.data
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
      setUser(authUser)
      return { success: true, user: authUser }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unable to login. Please try again.'
      }
    }
  }

  const signup = async ({ name, email, password, role, department, title }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        role,
        department,
        title
      })
      const { token, user: authUser } = response.data
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
      setUser(authUser)
      return { success: true, user: authUser }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unable to create account.'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
