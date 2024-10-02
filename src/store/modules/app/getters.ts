import type { GetterTree } from 'vuex'
import type { RootState } from '@/store/types'
import type { State } from './state'

export type Getters = {
  isAuth(state: State): boolean
  isAppReady(state: State): boolean
}
export const getters: GetterTree<State, RootState> & Getters = {
  isAuth: state => !!state.auth.token,
  isAppReady: state => !!(state.auth.token && state.user),
}
