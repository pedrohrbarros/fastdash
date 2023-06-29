import axios from 'axios'

export const api = axios.create ({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Origin':'*',
    'access': `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` || undefined
  }
})