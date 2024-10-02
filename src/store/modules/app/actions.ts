import type { ActionTree } from 'vuex'
import { dropRight } from 'lodash'

import { api } from '@api'
import { axiosInstance, BASE_URL } from '@api/axios'

import type { AugmentedActionContext, RootState } from '@/store/types'
import {
  ActionsStateMutationTypes,
  AppMutationTypes,
  BlockDevicesActionTypes,
  DevicesActionTypes,
  MonitoringActionTypes,
  StorageActionTypes,
  VirtualizationActionTypes,
} from '@/store/modules'

import type { State } from './state'
import { AppMutationTypes as MT } from './mutationTypes'
import { AppActionTypes as AT } from './actionTypes'

type ActionContext = AugmentedActionContext<State>

const NOTIFICATIONS_URL = {
  base: `${BASE_URL.split(':').length >= 3 ? dropRight(BASE_URL.split(':')).join(':') + ':9090' : BASE_URL}`,
  storage: '/api/v1/query?query=sum(node_filesystem_avail_bytes{mountpoint=~"/opt/aero/aistov/data/mnt.*"})',
  ram: '/api/v1/query?query=node_memory_MemAvailable_bytes',
  cpu: '/api/v1/query?query=100-(avg by (instance)(rate(node_cpu_seconds_total[5m]))*100)',
}

export type Actions = {
  // INIT
  [AT.INIT](c: ActionContext): void

  // AUTH
  [AT.LOGIN](c: ActionContext, payload: { username: string; password: string }): Promise<true | void>
  [AT.LOGOUT](c: ActionContext): void
  [AT.REFRESH](c: ActionContext): Promise<boolean>

  // USER
  [AT.GET_CURRENT_USER](c: ActionContext): Promise<void>

  // NOTIFICATIONS
  [AT.GET_NOTIFICATIONS](c: ActionContext): Promise<void>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // INIT
  [AT.INIT]: async ({ dispatch }) => {
    await dispatch(AT.GET_CURRENT_USER, undefined)

    await Promise.all([
      dispatch(DevicesActionTypes.GET_INTERFACE_LIST, undefined),
      dispatch(DevicesActionTypes.GET_DISK_LIST, undefined),
      dispatch(DevicesActionTypes.GET_BRIDGE_LIST, undefined),
      dispatch(VirtualizationActionTypes.GET_VM_LIST, undefined),
      dispatch(VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST, undefined),
      dispatch(StorageActionTypes.GET_STORAGE_LIST, undefined),
      dispatch(StorageActionTypes.GET_IMAGE_LIST, undefined),
      dispatch(StorageActionTypes.GET_VOLUME_LIST, undefined),
      dispatch(BlockDevicesActionTypes.GET_IQN, undefined),
      dispatch(BlockDevicesActionTypes.GET_SESSION_LIST, undefined),
      dispatch(MonitoringActionTypes.GET_EVENT_LIST, undefined),
    ])
  },

  // AUTH
  [AT.LOGIN]: async ({ commit, dispatch }, payload) => {
    const data = await api.auth.authAuthPost(payload)

    const { access_token, refresh_token } = data.data
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`
    commit(MT.SET_AUTH, { token: access_token, refresh_token })

    dispatch(AT.INIT, undefined)
    return true
  },
  [AT.LOGOUT]: ({ commit }) => {
    commit(MT.SET_AUTH, { token: null, refresh_token: null })
    delete axiosInstance.defaults.headers['Authorization']
    commit(AppMutationTypes.SET_CURRENT_USER, null)
    commit(ActionsStateMutationTypes.RESET_ACTIONS_STATE, undefined)
  },
  [AT.REFRESH]: async ({ commit, rootState }) => {
    if (!rootState.app.auth.refresh_token) return false
    const res = await api.auth
      .refreshTokenAuthRefreshPost({ refreshToken: rootState.app.auth.refresh_token })
      .catch(() => null)
    if (!res) return false
    const { access_token, refresh_token } = res.data

    axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`
    commit(MT.SET_AUTH, { token: access_token, refresh_token })
    return true
  },

  // USER
  [AT.GET_CURRENT_USER]: async ({ commit }) => {
    const { data } = await api.user.getUserUserGet()
    commit(MT.SET_CURRENT_USER, data)
  },

  // NOTIFICATIONS
  [AT.GET_NOTIFICATIONS]: async ({ commit }: ActionContext) => {
    const res = await Promise.all([
      axiosInstance.get(NOTIFICATIONS_URL.storage, { baseURL: NOTIFICATIONS_URL.base }),
      axiosInstance.get(NOTIFICATIONS_URL.ram, { baseURL: NOTIFICATIONS_URL.base }),
      axiosInstance.get(NOTIFICATIONS_URL.cpu, { baseURL: NOTIFICATIONS_URL.base }),
    ])
    const [storage, ram, cpu] = res.map(i => i.data.data.result)
    const criticals = []
    const warnings = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storage_size = storage?.reduce((a: number, v: any) => a + Number(v?.value?.[1]), 0)
    if (storage_size) {
      if (storage_size <= 500000000)
        criticals.push({ title: 'storageSize.critical.name', msg: 'storageSize.critical.msg' })
      else if (storage_size <= 1000000000)
        warnings.push({ title: 'storageSize.warning.name', msg: 'storageSize.warning.msg' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ram_size = ram?.reduce((a: number, v: any) => a + Number(v?.value?.[1]), 0)
    if (ram_size) {
      if (ram_size <= 500000000) criticals.push({ title: 'ramSize.critical.name', msg: 'ramSize.critical.msg' })
      else if (ram_size <= 1000000000) warnings.push({ title: 'ramSize.warning.name', msg: 'ramSize.warning.msg' })
    }

    const cpu_free = Number(cpu?.[0]?.value?.[1])
    if (cpu_free) {
      if (cpu_free < 10) criticals.push({ title: 'cpuUsage.critical.name', msg: 'cpuUsage.critical.msg' })
      else if (cpu_free < 20) warnings.push({ title: 'cpuUsage.warning.name', msg: 'cpuUsage.warning.msg' })
    }

    commit(MT.SET_NOTIFICATIONS, { criticals, warnings })
  },
}
