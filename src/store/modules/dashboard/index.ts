import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const dashboardStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as DashboardMutations } from './mutations'
export type { Actions as DashboardActions } from './actions'
export type { State as DashboardState } from './state'
export { DashboardActionTypes } from './actionTypes'
export { DashboardMutationTypes } from './mutationTypes'
