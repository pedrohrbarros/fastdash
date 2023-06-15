import axios from 'axios'

export const authAPI = axios.create ({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  timeout: 3000,
  headers: {
    'Content-Type':'application/json',
    'authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
  }
})