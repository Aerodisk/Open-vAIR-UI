import type { LayoutItem } from 'vue3-grid-layout'
import type { DashboardWidgets } from './widgets'

export type DashboardItemProp = LayoutItem<keyof typeof DashboardWidgets>
