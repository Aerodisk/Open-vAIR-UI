import type { ActionTree } from 'vuex'

import { api } from '@api'
import type { AugmentedActionContext, RootState } from '@/store/types'
import type {
  InterfaceDeleted,
  OpenvairModulesBlockDeviceEntrypointsSchemasInterface as InterfaceCreated,
} from '@api/generated'

import type { State } from './state'
import { BlockDevicesMutationTypes as MT } from './mutationTypes'
import { BlockDevicesActionTypes as AT } from './actionTypes'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  // ISCSI
  [AT.GET_SESSION_LIST](c: ActionContext): Promise<unknown>
  [AT.GET_IQN](c: ActionContext): Promise<unknown>
  [AT.LOGIN_SESSION](c: ActionContext, payload: InterfaceCreated): Promise<unknown>
  [AT.LOGOUT_SESSION](c: ActionContext, payload: InterfaceDeleted): Promise<unknown>
  [AT.FC_LIP_SCAN](c: ActionContext): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // ISCSI
  [AT.GET_SESSION_LIST]: async ({ commit }) => {
    const { data } = await api.blockDevices.getSessionsBlockDevicesSessionsGet()
    commit(MT.SET_SESSION_LIST, data)
  },
  [AT.GET_IQN]: async ({ commit }) => {
    const { data } = await api.blockDevices.getHostIqnBlockDevicesGetIqnGet()
    commit(MT.SET_IQN, data.iqn)
  },
  [AT.LOGIN_SESSION]: async ({ commit }, payload) => {
    const { data } = await api.blockDevices.loginBlockDevicesLoginPost({
      openvairModulesBlockDeviceEntrypointsSchemasInterface: payload,
    })
    commit(MT.SET_SESSION_ITEM, data)
  },
  [AT.LOGOUT_SESSION]: async ({ commit }, interfaceDeleted) => {
    await api.blockDevices.logoutBlockDevicesLogoutPost({ interfaceDeleted })
    commit(MT.DELETE_SESSION_ITEM, interfaceDeleted)
  },
  [AT.FC_LIP_SCAN]: () => api.blockDevices.lipScanBlockDevicesLipScanGet(),
}
