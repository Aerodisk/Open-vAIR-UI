import { type RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { StoragesView, StorageView, ImagesView, VolumesView } from './views'

export const storagesRouter: RouteRecordRaw[] = [
  {
    path: routes.storage.root,
    name: 'storage',
    redirect: () => routes.storage.storages.root,
    meta: { breadcrumb: 'storage' },
    children: [
      {
        path: routes.storage.storages.root,
        name: 'storages',
        meta: { breadcrumb: 'storages' },
        children: [
          {
            path: routes.storage.storages.root,
            name: 'storagesList',
            component: StoragesView,
          },
          {
            path: routes.storage.storages.item,
            name: 'storagesItem',
            component: StorageView,
            meta: { breadcrumb: 'custom:id' },
          },
        ],
      },
      {
        path: routes.storage.volumes.root,
        name: 'volumesList',
        component: VolumesView,
        meta: { breadcrumb: 'disks' },
      },
      {
        path: routes.storage.images.root,
        name: 'imagesList',
        component: ImagesView,
        meta: { breadcrumb: 'images' },
      },
    ],
  },
]
