import type { User } from '@api/generated'
import { getLocalStorage } from '@helpers/localStorageHelpers'

export type Notification = { title: string; msg: string }

export type State = {
  auth: { token: string | null; refresh_token: string | null }
  user: User | null
  settings: { sizeNotation: 'si' | 'iec' }
  notifications: { warnings: Notification[]; criticals: Notification[] }
}

export const state: State = {
  user: null,
  auth: { token: getLocalStorage('token') || null, refresh_token: getLocalStorage('refresh_token') || null },
  settings: { sizeNotation: getLocalStorage('ui_settings')?.sizeNotation || 'si' },
  notifications: { warnings: [], criticals: [] },
}
