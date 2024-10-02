import { type RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { BlockDevicesView } from './views'

export const blockDevicesRouter: RouteRecordRaw[] = [
  {
    path: routes.blockDevices.root,
    name: 'blockDevices',
    component: BlockDevicesView,
    meta: { breadcrumb: 'blockDevices' },
  },
]
