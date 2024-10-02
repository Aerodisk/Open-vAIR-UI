import { createRouter, createWebHashHistory } from 'vue-router'

import { NotFound } from '@/modules/app'
import { dashboardRouter } from '@/modules/dashboard'
import { devicesRouter } from '@/modules/devices'
import { virtualizationRouter } from '@/modules/virtualization'
import { storagesRouter } from '@/modules/storages'
import { journalRouter } from '@/modules/journal'
import { appRouter } from '@/modules/app'
import { blockDevicesRouter } from '@/modules/blockDevices'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...dashboardRouter,
    ...devicesRouter,
    ...virtualizationRouter,
    ...storagesRouter,
    ...journalRouter,
    ...blockDevicesRouter,
    ...appRouter,
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})
