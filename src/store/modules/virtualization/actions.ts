import type { ActionTree } from 'vuex'

import { api } from '@api'
import type { CreateVirtualMachine, EditVm, PortGroup, VirtualNetwork } from '@api/generated'
import type { AugmentedActionContext, RootState } from '@/store/types'
import { pullItem } from '@/store/utils'

import type { State } from './state'
import { VirtualizationMutationTypes as MT } from './mutationTypes'
import { VirtualizationActionTypes as AT } from './actionTypes'
import { find } from 'lodash'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  // VM
  [AT.GET_VM_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_VM](c: ActionContext, payload: CreateVirtualMachine): Promise<unknown>
  [AT.DELETE_VM](c: ActionContext, id: string): Promise<unknown>
  [AT.START_VM](c: ActionContext, id: string): Promise<unknown>
  [AT.SHUT_OFF_VM](c: ActionContext, id: string): Promise<unknown>
  [AT.OPEN_VNC_VM](c: ActionContext, id: string): Promise<unknown>
  [AT.EDIT_VM](c: ActionContext, payload: EditVm & { id: string }): Promise<unknown>

  // VIRTUAL NETWORK
  [AT.GET_VIRTUAL_NETWORK_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_VIRTUAL_NETWORK](c: ActionContext, payload: VirtualNetwork): Promise<unknown>
  [AT.DELETE_VIRTUAL_NETWORK](c: ActionContext, id: string): Promise<unknown>
  [AT.TURN_ON_VIRTUAL_NETWORK](c: ActionContext, id: string): Promise<unknown>
  [AT.TURN_OFF_VIRTUAL_NETWORK](c: ActionContext, id: string): Promise<unknown>
  [AT.ADD_PORTGROUP](c: ActionContext, payload: PortGroup & { id: string }): Promise<unknown>
  [AT.DELETE_PORTGROUP](c: ActionContext, payload: { id: string; portGroupName: string }): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // VM
  [AT.GET_VM_LIST]: async ({ commit }) => {
    const { data } = await api.vm.getVmsVirtualMachinesGet()
    commit(MT.SET_VM_LIST, data.items)
  },
  [AT.CREATE_VM]: async ({ commit }, createVirtualMachine) => {
    const { data } = await api.vm.createVmVirtualMachinesCreatePost({ createVirtualMachine })
    commit(MT.SET_VM_ITEM, data)
    pullItem(
      data,
      id => api.vm.getVmVirtualMachinesVmIdGet({ vmId: id }),
      i => commit(MT.SET_VM_ITEM, i)
    )
  },
  [AT.DELETE_VM]: async ({ commit }, vmId) => {
    const { data } = await api.vm.deleteVmVirtualMachinesVmIdDelete({ vmId })
    commit(MT.SET_VM_ITEM, data)
    pullItem(data, id => api.vm.getVmVirtualMachinesVmIdGet({ vmId: id })).then(() => commit(MT.DELETE_VM_ITEM, vmId))
  },
  [AT.START_VM]: async ({ commit }, vmId) => {
    const { data } = await api.vm.startVmVirtualMachinesVmIdStartPost({ vmId })
    commit(MT.SET_VM_ITEM, data)
    pullItem(
      data,
      id => api.vm.getVmVirtualMachinesVmIdGet({ vmId: id }),
      i => commit(MT.SET_VM_ITEM, i)
    )
  },
  [AT.SHUT_OFF_VM]: async ({ commit }, vmId) => {
    const { data } = await api.vm.shutOffVmVirtualMachinesVmIdShutOffPost({ vmId })
    commit(MT.SET_VM_ITEM, data)
    pullItem(
      data,
      id => api.vm.getVmVirtualMachinesVmIdGet({ vmId: id }),
      i => commit(MT.SET_VM_ITEM, i)
    )
  },
  [AT.OPEN_VNC_VM]: async (_, vmId) => {
    const { data } = await api.vm.vncVmVirtualMachinesVmIdVncGet({ vmId })
    window.open(data.url, '_blank')
  },
  [AT.EDIT_VM]: async ({ commit, state }, { id: vmId, ...editVm }) => {
    const vm = find(state.vm, { id: vmId })
    if (!vm || vm.power_state !== 'shut_off' || !(vm.status === 'available' || vm.status === 'error')) return
    const { data } = await api.vm.editVmVirtualMachinesVmIdEditPost({ vmId, editVm })
    commit(MT.SET_VM_ITEM, data)
    pullItem(
      { ...data, status: 'editing' },
      id => api.vm.getVmVirtualMachinesVmIdGet({ vmId: id }),
      i => commit(MT.SET_VM_ITEM, i)
    )
  },

  // VIRTUAL NETWORK
  [AT.GET_VIRTUAL_NETWORK_LIST]: async ({ commit }) => {
    const { data } = await api.virtualNetwork.getVirtualNetworksVirtualNetworksGet()
    commit(MT.SET_VIRTUAL_NETWORK_LIST, data.virtual_networks)
  },
  [AT.CREATE_VIRTUAL_NETWORK]: async ({ commit }, virtualNetwork) => {
    const { data } = await api.virtualNetwork.createVirtualNetworkVirtualNetworksCreatePost({ virtualNetwork })
    commit(MT.SET_VIRTUAL_NETWORK_ITEM, data)
  },
  [AT.DELETE_VIRTUAL_NETWORK]: async ({ commit }, virtualNetworkId) => {
    await api.virtualNetwork.deleteVirtualNetworkVirtualNetworksVirtualNetworkIdDelete({ virtualNetworkId })
    commit(MT.DELETE_VIRTUAL_NETWORK_ITEM, virtualNetworkId)
  },
  [AT.TURN_ON_VIRTUAL_NETWORK]: async ({ commit }, virtualNetworkId) => {
    const requestParams = { virtualNetworkId }
    await api.virtualNetwork.turnOnVirtualNetworkVirtualNetworksVirtualNetworkIdTurnOnPut(requestParams)
    const { data } = await api.virtualNetwork.getVirtualNetworkByIdVirtualNetworksVirtualNetworkIdGet(requestParams)
    commit(MT.SET_VIRTUAL_NETWORK_ITEM, data)
  },
  [AT.TURN_OFF_VIRTUAL_NETWORK]: async ({ commit }, virtualNetworkId) => {
    const requestParams = { virtualNetworkId }
    await api.virtualNetwork.turnOffVirtualNetworkVirtualNetworksVirtualNetworkIdTurnOffPut(requestParams)
    const { data } = await api.virtualNetwork.getVirtualNetworkByIdVirtualNetworksVirtualNetworkIdGet(requestParams)
    commit(MT.SET_VIRTUAL_NETWORK_ITEM, data)
  },
  [AT.ADD_PORTGROUP]: async ({ commit }, { id: virtualNetworkId, ...portGroup }) => {
    await api.virtualNetwork.addPortGroupVirtualNetworksVirtualNetworkIdAddPortGroupPost({
      virtualNetworkId,
      portGroup,
    })
    const { data } = await api.virtualNetwork.getVirtualNetworkByIdVirtualNetworksVirtualNetworkIdGet({
      virtualNetworkId,
    })
    commit(MT.SET_VIRTUAL_NETWORK_ITEM, data)
  },
  [AT.DELETE_PORTGROUP]: async ({ commit }, { id: virtualNetworkId, portGroupName }) => {
    await api.virtualNetwork.deletePortGroupVirtualNetworksVirtualNetworkIdDeletePortGroupDelete({
      virtualNetworkId,
      portGroupName,
    })
    const { data } = await api.virtualNetwork.getVirtualNetworkByIdVirtualNetworksVirtualNetworkIdGet({
      virtualNetworkId,
    })
    commit(MT.SET_VIRTUAL_NETWORK_ITEM, data)
  },
}
