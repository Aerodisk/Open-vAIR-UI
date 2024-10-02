import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const virtualizationStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as VirtualizationMutations } from './mutations'
export type { Actions as VirtualizationActions } from './actions'
export type { State as VirtualizationState } from './state'
export { VirtualizationActionTypes } from './actionTypes'
export { VirtualizationMutationTypes } from './mutationTypes'
