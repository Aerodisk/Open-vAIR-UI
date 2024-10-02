import type { NodeInfo } from '@api/generated'
import { getLocalStorage } from '@helpers'

import {
  defaultGridSettings,
  getDefaultLayout,
  layoutWithDefault,
  type GridLayout,
} from '@/modules/dashboard/components/DashboardGrid'

export type State = {
  data: Omit<NodeInfo, 'iops' | 'io_latency' | 'bandwith_data' | 'disk_data'> & {
    iops: NodeInfo['iops'] | null
    io_latency: NodeInfo['io_latency'] | null
    bandwith_data: NodeInfo['bandwith_data'] | null
    disk_data: NodeInfo['disk_data'] | null
  }
  layout: GridLayout
  gridSettings: {
    isResizable: boolean
    isDraggable: boolean
    preventCollision: boolean
    verticalCompact: boolean
  }
}

export const state: State = {
  data: {
    cpu: { count: 0, percentage: 0 },
    memory: { value: 0, used: 0, available: 0, percentage: 0 },
    storage: { size: 0, used: 0, free: 0, percentage: 0, cls: '' },
    iops: null,
    io_latency: null,
    bandwith_data: null,
    disk_data: null,
  },
  layout: layoutWithDefault(getLocalStorage('dashboard_grid') || getDefaultLayout()),
  gridSettings: getLocalStorage('dashboard_grid_settings') || defaultGridSettings,
}
