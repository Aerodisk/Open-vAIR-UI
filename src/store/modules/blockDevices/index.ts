import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const blockDevicesStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as BlockDevicesMutations } from './mutations'
export type { Actions as BlockDevicesActions } from './actions'
export type { State as BlockDevicesState } from './state'
export { BlockDevicesActionTypes } from './actionTypes'
export { BlockDevicesMutationTypes } from './mutationTypes'
