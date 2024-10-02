import type { MutationTree } from 'vuex'

import type { LocalDisk } from '@api/generated'
import { createMutation, createMutationDeleteArrItem, createMutationSetArrItem } from '@/store/utils'

import type { Interface, State, Bridge } from './state'
import { DevicesMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // INTERFACES
  [MT.SET_INTERFACE_LIST](state: S, list: Interface[]): void
  [MT.SET_INTERFACE_ITEM](state: S, item: Interface): void
  [MT.DELETE_INTERFACE_ITEM](state: S, id: string): void
  [MT.SET_BRIDGE_LIST](state: S, list: Bridge[]): void

  // DISKS
  [MT.SET_DISK_LIST](state: S, list: LocalDisk[]): void
  [MT.SET_DISK_ITEM](state: S, item: LocalDisk): void
  [MT.DELETE_DISK_ITEM](state: S, path: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  // INTERFACES
  [MT.SET_INTERFACE_LIST]: createMutation('interfaces'),
  [MT.SET_INTERFACE_ITEM]: createMutationSetArrItem('interfaces'),
  [MT.DELETE_INTERFACE_ITEM]: createMutationDeleteArrItem('interfaces'),
  [MT.SET_BRIDGE_LIST]: createMutation('bridges'),

  // DISKS
  [MT.SET_DISK_LIST]: createMutation('disks'),
  [MT.SET_DISK_ITEM]: createMutationSetArrItem('disks', 'path'),
  [MT.DELETE_DISK_ITEM]: createMutationDeleteArrItem('disks', 'path'),
}
