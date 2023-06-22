import axios from 'axios'
import { getCookie } from 'cookies-next';

export const authAPI = axios.create ({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
  headers: {
    'Content-Type':'application/json',
    'access': `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` || undefined,
    'authorization': getCookie('authorization') || undefined
  }
})