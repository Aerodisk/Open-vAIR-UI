import type { ActionTree } from 'vuex'

import { api } from '@api'
import type { BridgeCreate, BridgeDelete, CreateLocalPartition, DeleteLocalPartition } from '@api/generated'
import type { AugmentedActionContext, RootState } from '@/store/types'

import type { State } from './state'
import { DevicesMutationTypes as MT } from './mutationTypes'
import { DevicesActionTypes as AT } from './actionTypes'
import { pullItem } from '@/store/utils'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  // INTERFACES
  [AT.GET_INTERFACE_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_BRIDGE](c: ActionContext, payload: BridgeCreate): Promise<unknown>
  [AT.DELETE_BRIDGE](c: ActionContext, payload: BridgeDelete['data']): Promise<unknown>
  [AT.GET_BRIDGE_LIST](c: ActionContext): Promise<unknown>
  [AT.TURN_ON_INTERFACE](c: ActionContext, payload: string): Promise<unknown>
  [AT.TURN_OFF_INTERFACE](c: ActionContext, payload: string): Promise<unknown>

  // DISKS
  [AT.GET_DISK_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_DISK_PARTITION](c: ActionContext, payload: CreateLocalPartition): Promise<unknown>
  [AT.DELETE_DISK_PARTITION](c: ActionContext, payload: DeleteLocalPartition): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // INTERFACES
  [AT.GET_INTERFACE_LIST]: async ({ commit }) => {
    const { data } = await api.interface.getInterfacesInterfacesGet()
    commit(MT.SET_INTERFACE_LIST, data.items)
  },
  [AT.CREATE_BRIDGE]: async ({ commit }, bridgeCreate) => {
    const { data } = await api.interface.bridgeCreateInterfacesCreatePost({ bridgeCreate })
    commit(MT.SET_INTERFACE_ITEM, data)
    pullItem(
      data,
      id => api.interface.getInterfaceInterfacesIfaceIdGet({ ifaceId: id }),
      i => commit(MT.SET_INTERFACE_ITEM, i)
    )
  },
  [AT.DELETE_BRIDGE]: async ({ commit }, data) => {
    await api.interface.bridgeDeleteInterfacesDeleteDelete({ bridgeDelete: { data } })
    data.forEach(i => commit(MT.DELETE_INTERFACE_ITEM, i.id))
  },
  [AT.GET_BRIDGE_LIST]: async ({ commit }) => {
    const { data } = await api.interface.getBridgesListInterfacesBridgesGet()
    commit(MT.SET_BRIDGE_LIST, data)
  },
  [AT.TURN_ON_INTERFACE]: async ({ dispatch }, name) => {
    await api.interface.turnOnInterfaceInterfacesNameTurnOnPut({ name })
    dispatch(AT.GET_INTERFACE_LIST, undefined)
  },
  [AT.TURN_OFF_INTERFACE]: async ({ dispatch }, name) => {
    await api.interface.turnOffInterfaceInterfacesNameTurnOffPut({ name })
    dispatch(AT.GET_INTERFACE_LIST, undefined)
  },

  // DISKS
  [AT.GET_DISK_LIST]: async ({ commit }) => {
    const { data } = await api.storage.getLocalDisksStoragesLocalDisksGet()
    commit(MT.SET_DISK_LIST, data.disks)
  },
  [AT.CREATE_DISK_PARTITION]: async ({ commit }, createLocalPartition) => {
    const { data } = await api.storage.createLocalPartitionStoragesLocalDisksCreatePartitionPost({
      createLocalPartition,
    })
    commit(MT.SET_DISK_ITEM, data)
  },
  [AT.DELETE_DISK_PARTITION]: async ({ commit }, deleteLocalPartition) => {
    await api.storage.deleteLocalPartitionStoragesLocalDisksDeletePartitionDelete({ deleteLocalPartition })
    commit(MT.DELETE_DISK_ITEM, deleteLocalPartition.local_disk_path + deleteLocalPartition.partition_number)
  },
}
