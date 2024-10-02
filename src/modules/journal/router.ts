import { type RouteRecordRaw } from 'vue-router'

import { routes } from '@/router/routes'
import { JournalView } from './views'

export const journalRouter: RouteRecordRaw[] = [
  {
    path: routes.journal.root,
    name: 'journal',
    component: JournalView,
    meta: { breadcrumb: 'journal' },
  },
]
