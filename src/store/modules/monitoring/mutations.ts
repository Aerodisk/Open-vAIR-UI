import type { MutationTree } from 'vuex'

import type { Event } from '@api/generated'
import { createMutation } from '@/store/utils'

import type { State } from './state'
import { MonitoringMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // EVENT
  [MT.SET_EVENT_LIST](state: S, list: Event[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  // EVENT
  [MT.SET_EVENT_LIST]: createMutation('events'),
}
