import { type RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { InterfacesView, LocalDisksView, LocalDiskView } from './views'

export const devicesRouter: RouteRecordRaw[] = [
  {
    path: routes.devices.root,
    name: 'devices',
    meta: { breadcrumb: 'devices' },
    redirect: () => routes.devices.interfaces.root,
    children: [
      {
        path: routes.devices.interfaces.root,
        name: 'interfaces',
        component: InterfacesView,
        meta: { breadcrumb: 'networkAdapters' },
      },
      {
        path: routes.devices.disks.root,
        name: 'localDisks',
        meta: { breadcrumb: 'physicalDisks' },
        children: [
          {
            path: routes.devices.disks.root,
            name: 'localDisksList',
            component: LocalDisksView,
          },
          {
            path: routes.devices.disks.item.root,
            name: 'localDisksItem',
            component: LocalDiskView,
            meta: { breadcrumb: 'custom:path' },
          },
        ],
      },
    ],
  },
]
