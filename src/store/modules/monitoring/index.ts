import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const monitoringStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as MonitoringMutations } from './mutations'
export type { Actions as MonitoringActions } from './actions'
export type { State as MonitoringState } from './state'
export { MonitoringActionTypes } from './actionTypes'
export { MonitoringMutationTypes } from './mutationTypes'
