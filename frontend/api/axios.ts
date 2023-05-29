import axios from 'axios'

export const authAPI = axios.create ({
  baseURL: process.env.AUTH_URL,
  timeout: 3000,
  headers: {
    'Content-Type':'application/json',
    'Bearer ': process.env.AUTH_TOKEN
  }
})