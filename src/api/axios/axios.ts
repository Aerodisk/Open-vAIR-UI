import axios, { type AxiosRequestConfig } from 'axios'
import { getLocalStorage } from '@helpers/localStorageHelpers'

const getHeaders = () => {
  const headers: AxiosRequestConfig['headers'] = {}

  const token = getLocalStorage('token')
  if (token) headers.Authorization = `Bearer ${token}`

  return headers
}

export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_BASE_URL.startsWith('https://')
    ? '/api'
    : import.meta.env.VITE_DEV_API_BASE_URL
  : window.origin

export const axiosInstance = axios.create({ baseURL: BASE_URL, headers: getHeaders() })
