import type { MutationTree } from 'vuex'
import type { AxiosError } from 'axios'
import { cloneDeep, keys } from 'lodash'

import type { State } from './state'
import { ActionsStateMutationTypes as MT } from './mutationTypes'
import { defaultActionState } from './state'

export type Mutations<S = State> = {
  [MT.ACTION_INITIATE](state: S, actionKey: keyof State): void
  [MT.ACTION_ERROR](state: S, payload: { actionKey: keyof State; error: AxiosError | Error }): void
  [MT.ACTION_SUCCESS](state: S, actionKey: keyof State): void
  [MT.RESET_ACTIONS_STATE](state: S): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MT.ACTION_INITIATE]: (s, key) => {
    if (!s[key]) return console.error(`Action key "${key}" not found`)
    if (s[key].isUninitialized) {
      s[key].isUninitialized = false
      s[key].isInitializing = true
    }
    s[key].isDispatching = true
  },
  [MT.ACTION_ERROR]: (s, { error, actionKey: key }) => {
    if (!s[key]) return console.error(`Action key "${key}" not found`)
    s[key].isError = true
    s[key].isSuccess = false
    s[key].isInitializing = false
    s[key].isDispatching = false
    s[key].error = error
  },
  [MT.ACTION_SUCCESS]: (s, key) => {
    if (!s[key]) return console.error(`Action key "${key}" not found`)
    s[key].isError = false
    s[key].isSuccess = true
    s[key].isInitializing = false
    s[key].isDispatching = false
    s[key].error = null
    s[key].timestamp = Date.now()
  },
  [MT.RESET_ACTIONS_STATE]: s => {
    const k = keys(s) as (keyof State)[]
    k.forEach(k => (s[k] = cloneDeep(defaultActionState)))
  },
}
