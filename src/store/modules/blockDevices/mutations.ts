import type { MutationTree } from 'vuex'

import type { InterfaceDeleted } from '@api/generated'
import { createMutation, createMutationSetArrItem } from '@/store/utils'

import type { Session, State } from './state'
import { BlockDevicesMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  [MT.SET_SESSION_LIST](state: S, list: Session[]): void
  [MT.SET_IQN](state: S, iqn: string): void
  [MT.SET_SESSION_ITEM](state: S, item: Session): void
  [MT.DELETE_SESSION_ITEM](state: S, payload: InterfaceDeleted): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MT.SET_SESSION_LIST]: createMutation('sessions'),
  [MT.SET_IQN]: createMutation('iqn'),
  [MT.SET_SESSION_ITEM]: createMutationSetArrItem('sessions'),
  [MT.DELETE_SESSION_ITEM]: (state, payload) =>
    (state.sessions = state.sessions.filter(i => i.inf_type !== payload.inf_type && i.ip !== payload.ip)),
}
