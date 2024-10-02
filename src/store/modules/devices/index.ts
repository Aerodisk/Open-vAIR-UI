import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const devicesStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as DevicesMutations } from './mutations'
export type { Actions as DevicesActions } from './actions'
export type { State as DevicesState } from './state'
export { DevicesActionTypes } from './actionTypes'
export { DevicesMutationTypes } from './mutationTypes'
