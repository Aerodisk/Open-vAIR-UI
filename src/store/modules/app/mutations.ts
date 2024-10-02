import type { MutationTree } from 'vuex'

import { createMutation } from '@/store/utils'
import type { User } from '@api/generated'
import { getLocalStorage, setLocalStorage } from '@helpers/localStorageHelpers'

import type { State } from './state'
import { AppMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // AUTH
  [MT.SET_AUTH](state: S, auth: { token: string | null; refresh_token: string | null }): void

  // USER
  [MT.SET_CURRENT_USER](state: S, payload: User | null): void

  // NOTIFICATIONS
  [MT.SET_NOTIFICATIONS](state: S, payload: State['notifications']): void

  // SETTINGS
  [MT.SET_SETTINGS](state: S, payload: State['settings']): void
}

export const mutations: MutationTree<State> & Mutations = {
  // AUTH
  [MT.SET_AUTH]: (state, auth) => {
    state.auth = auth
    setLocalStorage('token', auth.token)
    setLocalStorage('refresh_token', auth.refresh_token)
  },

  // USER
  [MT.SET_CURRENT_USER]: createMutation('user'),

  // NOTIFICATIONS
  [MT.SET_NOTIFICATIONS]: createMutation('notifications'),

  // SETTINGS
  [MT.SET_SETTINGS]: (state, settings) => {
    state.settings = settings
    setLocalStorage('ui_settings', { ...getLocalStorage('ui_settings'), ...settings })
  },
}
