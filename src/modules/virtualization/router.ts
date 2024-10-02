import { type RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { VMListView, VirtualNetworksView, VMCreateView, VMEditView, VMView, VirtualNetworkView } from './views'

export const virtualizationRouter: RouteRecordRaw[] = [
  {
    path: routes.virtualization.root,
    name: 'virtualization',
    meta: { breadcrumb: 'virtualization' },
    redirect: () => routes.virtualization.virtualMachines.root,
    children: [
      {
        path: routes.virtualization.virtualMachines.root,
        name: 'vm',
        meta: { breadcrumb: 'virtualMachines' },
        children: [
          {
            path: routes.virtualization.virtualMachines.root,
            name: 'vmList',
            component: VMListView,
          },
          {
            path: routes.virtualization.virtualMachines.create,
            name: 'virtualMachinesCreate',
            component: VMCreateView,
            meta: { breadcrumb: 'vmCreate' },
          },
          {
            path: routes.virtualization.virtualMachines.item.root,
            name: 'virtualMachine',
            meta: { breadcrumb: 'custom:id' },
            children: [
              {
                path: routes.virtualization.virtualMachines.item.root,
                name: 'virtualMachineItem',
                component: VMView,
              },
              {
                path: routes.virtualization.virtualMachines.item.edit,
                name: 'virtualMachinesEdit',
                component: VMEditView,
                meta: { breadcrumb: 'vmEdit' },
              },
            ],
          },
        ],
      },
      {
        path: routes.virtualization.virtualNetworks.root,
        name: 'vnet',
        meta: { breadcrumb: 'virtualNetworks' },
        children: [
          {
            path: routes.virtualization.virtualNetworks.root,
            name: 'vnetList',
            component: VirtualNetworksView,
          },
          {
            path: routes.virtualization.virtualNetworks.item.root,
            name: 'vnetItem',
            component: VirtualNetworkView,
            // meta: { breadcrumb: 'vnetItem' },
            meta: { breadcrumb: 'custom:id' },
          },
        ],
      },
    ],
  },
]
