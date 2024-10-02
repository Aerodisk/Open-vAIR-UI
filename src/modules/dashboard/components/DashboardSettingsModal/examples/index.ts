import type { RenderComponent } from '@/types'
import type { DashboardWidgets } from '../../DashboardWidget/widgets'
import { default as StorageWidgetExample } from './StorageWidgetExample.vue'
import { default as CPUWidgetExample } from './CPUWidgetExample.vue'
import { default as RAMWidgetExample } from './RAMWidgetExample.vue'
import { default as IopsChartExample } from './IopsChartExample.vue'
import { default as NetworkBandwidthChartExample } from './NetworkBandwidthChartExample.vue'
import { default as IOLatencyChartExample } from './IOLatencyChartExample.vue'
import { default as DiskChartExample } from './DiskChartExample.vue'

export const widgetExamples: Partial<Record<keyof typeof DashboardWidgets, RenderComponent>> = {
  CPUWidget: CPUWidgetExample,
  RAMWidget: RAMWidgetExample,
  StorageWidget: StorageWidgetExample,
  IOPSChart: IopsChartExample,
  IONetworkBandwidthChart: NetworkBandwidthChartExample,
  IODiskBandwidthChart: DiskChartExample,
  IOLatencyChart: IOLatencyChartExample,
}
