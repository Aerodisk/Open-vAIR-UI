import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import { state, type State } from './state'

export const appStore: Module<State, RootState> = { state, mutations, actions, getters }

export type { Mutations as AppMutations } from './mutations'
export type { Actions as AppActions } from './actions'
export type { State as AppState } from './state'
export type { Getters as AppGetters } from './getters'
export { AppActionTypes } from './actionTypes'
export { AppMutationTypes } from './mutationTypes'
