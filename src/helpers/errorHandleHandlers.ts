import type { AxiosError } from 'axios'
import { chain } from 'lodash'
import { i18n, t } from '@/locales'
import type { SnackbarProps } from '@/components/Snackbar'

export function extractErrorMessage(err: AxiosError | Error) {
  if ('response' in err) return (err?.response?.data as { message?: string })?.message || ''
  return err?.message || ''
}

const extractErrorSnackbarDescription = (err: AxiosError) => {
  if (err.response?.status === 422)
    return (err.response?.data as { detail: { loc: string[]; msg: string }[] })?.detail
      ?.map(i => `${i.loc.join('.')} - ${i.msg}`)
      .join('\n')

  if ((err.response?.data as { error?: string })?.error === 'RpcCallException') {
    const rpcErrorName = (err.response?.data as { message?: string })?.message?.split(':')[1].trim()
    // @ts-ignore
    const isHasTranslation = !!i18n.global?.messages?.[i18n.global?.locale]?.apiErrors?.rpcException?.[rpcErrorName]
    const rawErrorMessage = chain((err.response?.data as { message?: string })?.message)
      .split(':')
      .slice(1)
      .join(':')
      .value()

    return isHasTranslation ? t(`apiErrors.rpcException.${rpcErrorName}`) : rawErrorMessage
  }

  return (err?.response?.data as { message?: string })?.message || err?.message || ''
}

const extractErrorSnackbarTitle = (err: AxiosError) => {
  if (err.code === 'ERR_CANCELED') return t(`apiErrors.canceled`)
  if ([400, 403, 422, 500].includes(err.request.status)) return t(`apiErrors.code.${err.request.status}`)
  return t('apiErrors.code.500')
}

export function extractErrorSnackbarProps(err: AxiosError): SnackbarProps {
  return { variant: 'error', text: extractErrorSnackbarTitle(err), description: extractErrorSnackbarDescription(err) }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...data: any) {
  if (import.meta.env.DEV) console.log(...data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logError(...data: any) {
  if (import.meta.env.DEV) console.error(...data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logGroupCollapsed(...data: any) {
  if (import.meta.env.DEV) console.groupCollapsed(...data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logGroupEnd() {
  if (import.meta.env.DEV) console.groupEnd()
}
