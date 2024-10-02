import type { RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { SettingsView } from './views'

export const appRouter: RouteRecordRaw[] = [{ path: routes.settings.root, name: 'settings', component: SettingsView }]
