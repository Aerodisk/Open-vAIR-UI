import type { MutationTree } from 'vuex'
import { pick } from 'lodash'

import type { NodeInfo } from '@api/generated'
import { setLocalStorage } from '@helpers'
import type { ArrayElement } from '@/types'
import { createMutation } from '@/store/utils'
import {
  type GridLayout,
  defaultGridSettings,
  getDefaultLayout,
  layoutWithDefault,
} from '@/modules/dashboard/components/DashboardGrid'

import type { State } from './state'
import { DashboardMutationTypes as MT } from './mutationTypes'

export type Mutations<S = State> = {
  // DATA
  [MT.SET_DATA](state: S, data: NodeInfo): void

  // GRID
  [MT.SET_GRID](state: S, layout: GridLayout): void
  [MT.ADD_GRID_ITEM](state: S, layoutItem: ArrayElement<GridLayout>): void
  [MT.REMOVE_GRID_ITEM](state: S, itemName: string): void
  [MT.SET_GRID_SETTINGS](state: S, settings: State['gridSettings']): void
  [MT.RESET_GRID](state: S): void
}
export const mutations: MutationTree<State> & Mutations = {
  // DATA
  [MT.SET_DATA]: createMutation('data'),

  // GRID
  [MT.SET_GRID]: (state, layout) => {
    state.layout = layout
    setLocalStorage(
      'dashboard_grid',
      layout.map(i => pick(i, ['i', 'w', 'h', 'x', 'y']))
    )
    setLocalStorage('dashboard_grid_ts', Date.now())
  },
  [MT.ADD_GRID_ITEM]: (state, layoutItem) => {
    state.layout = [...state.layout, layoutItem]
    setLocalStorage(
      'dashboard_grid',
      state.layout.map(i => pick(i, ['i', 'w', 'h', 'x', 'y']))
    )
    setLocalStorage('dashboard_grid_ts', Date.now())
  },
  [MT.REMOVE_GRID_ITEM]: (state, itemName) => {
    state.layout = state.layout.filter(i => i.i !== itemName)
    setLocalStorage(
      'dashboard_grid',
      state.layout.map(i => pick(i, ['i', 'w', 'h', 'x', 'y']))
    )
    setLocalStorage('dashboard_grid_ts', Date.now())
  },
  [MT.SET_GRID_SETTINGS]: (state, settings) => {
    state.gridSettings = settings
    setLocalStorage('dashboard_grid_settings', settings)
  },
  [MT.RESET_GRID](state) {
    setLocalStorage('dashboard_grid', null)
    setLocalStorage('dashboard_grid_settings', null)
    setLocalStorage('dashboard_grid_ts', null)
    state.gridSettings = defaultGridSettings
    state.layout = layoutWithDefault(getDefaultLayout())
  },
}
