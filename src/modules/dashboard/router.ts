import type { RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { DashboardView } from './views'

export const dashboardRouter: RouteRecordRaw[] = [{ path: routes.root, name: 'dashboard', component: DashboardView }]
