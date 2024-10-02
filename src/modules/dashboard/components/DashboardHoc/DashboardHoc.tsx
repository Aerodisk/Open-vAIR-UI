import { defineComponent } from 'vue'

import { DashboardActionTypes, DashboardMutationTypes, store } from '@/store'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import { getLocalStorage } from '@helpers'

const POOLING_INTERVAL = 6000
const RESET_GRID_TIMESTAMP = 1715178978538

export const DashboardHoc = defineComponent({
  name: 'DashboardHoc',
  setup() {
    const updTs = getLocalStorage('dashboard_grid_ts')
    const grid = getLocalStorage('dashboard_grid')
    const isNeedResetGrid = (grid && !updTs) || (updTs && RESET_GRID_TIMESTAMP > updTs)
    if (isNeedResetGrid) store.commit(DashboardMutationTypes.RESET_GRID, undefined)

    const interval = setInterval(() => store.dispatch(DashboardActionTypes.GET_DATA, undefined), POOLING_INTERVAL)
    return { interval }
  },
  unmounted() {
    clearInterval(this.interval)
  },
  render() {
    return <IsExistsHoc actions={[DashboardActionTypes.GET_DATA]}>{this.$slots.default?.()}</IsExistsHoc>
  },
})
