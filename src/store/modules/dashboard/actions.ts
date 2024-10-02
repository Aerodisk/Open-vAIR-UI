import type { ActionTree } from 'vuex'

import { api } from '@api'
import type { AugmentedActionContext, RootState } from '@/store/types'

import type { State } from './state'
import { DashboardMutationTypes as MT } from './mutationTypes'
import { DashboardActionTypes as AT } from './actionTypes'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  [AT.GET_DATA](c: ActionContext): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  [AT.GET_DATA]: async ({ commit }) => {
    const { data } = await api.dashboard.getNodeDataDashboardGet()
    commit(MT.SET_DATA, data)
  },
}
