import type { MutationTree } from 'vuex'

import type { Storage, Volume, Image } from '@api/generated'
import { createMutation, createMutationDeleteArrItem, createMutationSetArrItem } from '@/store/utils'

import type { State } from './state'
import { StorageMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // STORAGE
  [MT.SET_STORAGE_LIST](state: S, list: Storage[]): void
  [MT.SET_STORAGE_ITEM](state: S, item: Storage): void
  [MT.DELETE_STORAGE_ITEM](state: S, id: string): void

  // VOLUME
  [MT.SET_VOLUME_LIST](state: S, list: Volume[]): void
  [MT.SET_VOLUME_ITEM](state: S, item: Volume): void
  [MT.DELETE_VOLUME_ITEM](state: S, id: string): void

  // IMAGE
  [MT.SET_IMAGE_LIST](state: S, list: Image[]): void
  [MT.SET_IMAGE_ITEM](state: S, item: Image): void
  [MT.DELETE_IMAGE_ITEM](state: S, id: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  // STORAGE
  [MT.SET_STORAGE_LIST]: createMutation('storages'),
  [MT.SET_STORAGE_ITEM]: createMutationSetArrItem('storages'),
  [MT.DELETE_STORAGE_ITEM]: createMutationDeleteArrItem('storages'),

  // VOLUME
  [MT.SET_VOLUME_LIST]: createMutation('volumes'),
  [MT.SET_VOLUME_ITEM]: createMutationSetArrItem('volumes'),
  [MT.DELETE_VOLUME_ITEM]: createMutationDeleteArrItem('volumes'),

  // IMAGE
  [MT.SET_IMAGE_LIST]: createMutation('images'),
  [MT.SET_IMAGE_ITEM]: createMutationSetArrItem('images'),
  [MT.DELETE_IMAGE_ITEM]: createMutationDeleteArrItem('images'),
}
