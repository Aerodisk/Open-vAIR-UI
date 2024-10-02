import type { ActionTree } from 'vuex'

import { api } from '@api'
import type { AugmentedActionContext, RootState } from '@/store/types'

import type { State } from './state'
import { MonitoringMutationTypes as MT } from './mutationTypes'
import { MonitoringActionTypes as AT } from './actionTypes'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  // EVENT
  [AT.GET_EVENT_LIST](c: ActionContext): Promise<unknown>
  [AT.DOWNLOAD_LOG](c: ActionContext): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // INTERFACES
  [AT.GET_EVENT_LIST]: async ({ commit }) => {
    const { data } = await api.event.getEventsEventGet()
    commit(MT.SET_EVENT_LIST, data.items)
  },
  [AT.DOWNLOAD_LOG]: async () => {
    const res = await api.event.downloadEventsEventDownloadGet({ moduleName: 'event-store' }, { responseType: 'blob' })
    // @ts-ignore
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'logs.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },
}
