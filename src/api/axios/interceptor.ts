import { AxiosError } from 'axios'
import { minutesToMilliseconds } from 'date-fns'

import { AppActionTypes, store } from '@/store'
import { extractErrorSnackbarProps } from '@helpers'
import { useSnackbar } from '@/components/Snackbar'

import { axiosInstance } from '../axios'

let refreshPromise: Promise<boolean> | undefined

/** Проверяет закончился ли токен */
const checkExpiresToken = (token?: string) => {
  if (!token || token === 'null') return true
  const expires = JSON.parse(window.atob(token.split('.')[1])).exp * 1000
  return expires - Date.now() < 0
}

/** Проверяет оставшееся время действия токена, если время действия меньше 5 минут, то обновляет токены */
const checkAndRefreshToken = async (token?: string) => {
  if (!token || token === 'null' || refreshPromise) return

  const expires = JSON.parse(window.atob(token.split('.')[1])).exp * 1000
  const isCloseToExpiration = expires - Date.now() < minutesToMilliseconds(5) // 5 min
  if (!isCloseToExpiration) return
  return refreshToken()
}

/** Запрашивает и обновляет токены */
const refreshToken = async () => {
  if (!refreshPromise) refreshPromise = store.dispatch(AppActionTypes.REFRESH, undefined)
  const isRefreshSuccess = await refreshPromise
  refreshPromise = undefined

  return isRefreshSuccess
}

axiosInstance.interceptors.request.use(
  req => {
    /** Обработка любого запроса
     * Фоновая провека времени действия токена, при необходимости обновление токена */
    if (!req.url?.includes('/auth/refresh')) checkAndRefreshToken(`${req.headers.Authorization}`?.split(' ')[1])
    return req
  },
  err => err
)

axiosInstance.interceptors.response.use(
  res => res,
  async (err: AxiosError<{ message: string }>) => {
    /** Обработка ошибки запроса на обновление токена */
    if (err.response?.config.url?.includes('/auth/refresh')) {
      if (
        !store.state.app.auth.token ||
        (err.response?.data as { detail?: string })?.detail === 'Invalid refresh token' ||
        checkExpiresToken(store.state.app.auth.token)
      )
        store.dispatch(AppActionTypes.LOGOUT, undefined)

      throw new AxiosError(err.message, err.code, err.config, err.request, err.response)
    }

    /** Обработка ошибки любого запроса по причине невалидного токена доступа
     * При успешном обновлении токена исходный запрос повторяется */
    if (err.response?.status === 401) {
      const isRefreshSuccess = await refreshToken()
      if (!isRefreshSuccess) return err
      const config = {
        ...err.config,
        headers: { ...err.config?.headers, Authorization: axiosInstance.defaults.headers.Authorization },
      }
      return axiosInstance(config)
    }

    /** Обработка всех ошибок, кроме GET и OPTIONS запросов */
    if (!['get', 'options'].includes(`${err.config?.method?.toLowerCase()}`))
      useSnackbar().openSnackbar(extractErrorSnackbarProps(err))

    throw new AxiosError(err.message, err.code, err.config, err.request, err.response)
  }
)
