import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { state, type State } from './state'

export const actionsStateStore: Module<State, RootState> = { state, mutations }

export type { Mutations as ActionsStateMutations } from './mutations'
export type { State as ActionsStateState } from './state'
export { ActionsStateMutationTypes } from './mutationTypes'
