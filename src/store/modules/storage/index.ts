import type { Module } from 'vuex'
import type { RootState } from '@/store/types'

import { mutations } from './mutations'
import { actions } from './actions'
import { state, type State } from './state'

export const storageStore: Module<State, RootState> = { state, mutations, actions }

export type { Mutations as StorageMutations } from './mutations'
export type { Actions as StorageActions } from './actions'
export type { State as StorageState } from './state'
export { StorageActionTypes } from './actionTypes'
export { StorageMutationTypes } from './mutationTypes'
