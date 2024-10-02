import type { MutationTree } from 'vuex'

import type { VirtualMachineInfo, VirtualNetworkResponse } from '@api/generated'
import { createMutation, createMutationDeleteArrItem, createMutationSetArrItem } from '@/store/utils'

import type { State } from './state'
import { VirtualizationMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // VM
  [MT.SET_VM_LIST](state: S, list: VirtualMachineInfo[]): void
  [MT.SET_VM_ITEM](state: S, item: VirtualMachineInfo): void
  [MT.DELETE_VM_ITEM](state: S, id: string): void

  // VIRTUAL NETWORK
  [MT.SET_VIRTUAL_NETWORK_LIST](state: S, list: VirtualNetworkResponse[]): void
  [MT.SET_VIRTUAL_NETWORK_ITEM](state: S, item: VirtualNetworkResponse): void
  [MT.DELETE_VIRTUAL_NETWORK_ITEM](state: S, id: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  // VM
  [MT.SET_VM_LIST]: createMutation('vm'),
  [MT.SET_VM_ITEM]: createMutationSetArrItem('vm'),
  [MT.DELETE_VM_ITEM]: createMutationDeleteArrItem('vm'),

  // VIRTUAL NETWORK
  [MT.SET_VIRTUAL_NETWORK_LIST]: createMutation('virtualNetworks'),
  [MT.SET_VIRTUAL_NETWORK_ITEM]: createMutationSetArrItem('virtualNetworks'),
  [MT.DELETE_VIRTUAL_NETWORK_ITEM]: createMutationDeleteArrItem('virtualNetworks'),
}
