import type { LayoutItem } from 'vue3-grid-layout'
import type { DashboardWidgets } from '../DashboardWidget/widgets'
import { layoutWithDefault } from './utils'

export const ROW_HEIGHT = 10
export const MARGIN = 16

/** Параметры минимальной и начальной высоты/ширины виджетов
 * @minH/minW - минимально возможная высота/ширина
 * @h/w - стандартная высота/ширина */
export const widgetsDimensionsOptions: Partial<
  Record<keyof typeof DashboardWidgets, Omit<LayoutItem, 'i' | 'x' | 'y'>>
> = {
  StorageWidget: { minH: 6, minW: 12, h: 7, w: 12 },
  CPUWidget: { minH: 6, minW: 11, h: 7, w: 11 },
  RAMWidget: { minH: 6, minW: 11, h: 7, w: 11 },
  IOPSChart: { minH: 10, minW: 15, h: 13, w: 17 },
  IODiskBandwidthChart: { minH: 10, minW: 15, h: 13, w: 17 },
  IONetworkBandwidthChart: { minH: 10, minW: 15, h: 13, w: 17 },
  IOLatencyChart: { minH: 10, minW: 15, h: 13, w: 17 },
  GridSettingsWidget: { minH: 5, minW: 5, h: 6, w: 6 },
}

/** Настройки сетки по умолчанию */
export const defaultGridSettings = {
  preventCollision: true,
  isResizable: true,
  isDraggable: true,
  verticalCompact: false,
}

/** Виджеты по-умолчанию отображаемые в сетки */
export const defaultLayouts: Record<number, Parameters<typeof layoutWithDefault>[0]> = {
  2100: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 42, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 28 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 28 },
    { i: 'IOPSChart', w: 34, h: 14, x: 33, y: 0 },
    { i: 'IONetworkBandwidthChart', w: 33, h: 14, x: 0, y: 0 },
    { i: 'IOLatencyChart', w: 33, h: 14, x: 0, y: 14 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 28 },
    { i: 'IODiskBandwidthChart', w: 34, h: 14, x: 33, y: 14 },
  ],
  2000: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 42, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 28 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 28 },
    { i: 'IONetworkBandwidthChart', w: 32, h: 14, x: 0, y: 0 },
    { i: 'IOLatencyChart', w: 31, h: 14, x: 32, y: 0 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 28 },
    { i: 'IOPSChart', w: 32, h: 14, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 31, h: 14, x: 32, y: 14 },
  ],
  1900: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 43, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 27 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 27 },
    { i: 'IONetworkBandwidthChart', w: 30, h: 14, x: 0, y: 0 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 27 },
    { i: 'IOPSChart', w: 30, h: 14, x: 30, y: 0 },
    { i: 'IOLatencyChart', w: 30, h: 13, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 30, h: 13, x: 30, y: 14 },
  ],
  1800: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 43, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 27 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 27 },
    { i: 'IONetworkBandwidthChart', w: 28, h: 14, x: 0, y: 0 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 27 },
    { i: 'IOPSChart', w: 28, h: 14, x: 28, y: 0 },
    { i: 'IOLatencyChart', w: 28, h: 13, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 28, h: 13, x: 28, y: 14 },
  ],
  1700: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 43, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 27 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 27 },
    { i: 'IONetworkBandwidthChart', w: 26, h: 14, x: 0, y: 0 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 27 },
    { i: 'IOPSChart', w: 26, h: 14, x: 26, y: 0 },
    { i: 'IOLatencyChart', w: 26, h: 13, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 26, h: 13, x: 26, y: 14 },
  ],
  1600: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 43, y: 28 },
    { i: 'RAMWidget', w: 14, h: 7, x: 14, y: 27 },
    { i: 'StorageWidget', w: 14, h: 7, x: 0, y: 27 },
    { i: 'IONetworkBandwidthChart', w: 24, h: 14, x: 0, y: 0 },
    { i: 'CPUWidget', w: 14, h: 7, x: 28, y: 27 },
    { i: 'IOPSChart', w: 24, h: 14, x: 24, y: 0 },
    { i: 'IOLatencyChart', w: 24, h: 13, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 24, h: 13, x: 24, y: 14 },
  ],
  1500: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 39, y: 27 },
    { i: 'RAMWidget', w: 13, h: 7, x: 13, y: 27 },
    { i: 'StorageWidget', w: 13, h: 7, x: 0, y: 27 },
    { i: 'IONetworkBandwidthChart', w: 22, h: 14, x: 0, y: 0 },
    { i: 'CPUWidget', w: 13, h: 7, x: 26, y: 27 },
    { i: 'IOPSChart', w: 22, h: 14, x: 22, y: 0 },
    { i: 'IOLatencyChart', w: 22, h: 13, x: 0, y: 14 },
    { i: 'IODiskBandwidthChart', w: 22, h: 13, x: 22, y: 14 },
  ],
  1400: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 35, y: 25 },
    { i: 'RAMWidget', w: 12, h: 7, x: 12, y: 25 },
    { i: 'StorageWidget', w: 12, h: 7, x: 0, y: 25 },
    { i: 'IONetworkBandwidthChart', w: 20, h: 13, x: 0, y: 0 },
    { i: 'CPUWidget', w: 11, h: 7, x: 24, y: 25 },
    { i: 'IOPSChart', w: 20, h: 13, x: 20, y: 0 },
    { i: 'IOLatencyChart', w: 20, h: 12, x: 0, y: 13 },
    { i: 'IODiskBandwidthChart', w: 20, h: 12, x: 20, y: 13 },
  ],
  1300: [
    { i: 'GridSettingsWidget', w: 5, h: 5, x: 0, y: 29 },
    { i: 'RAMWidget', w: 12, h: 6, x: 12, y: 23 },
    { i: 'StorageWidget', w: 12, h: 6, x: 0, y: 23 },
    { i: 'IONetworkBandwidthChart', w: 18, h: 12, x: 0, y: 0 },
    { i: 'CPUWidget', w: 11, h: 6, x: 24, y: 23 },
    { i: 'IOPSChart', w: 17, h: 12, x: 18, y: 0 },
    { i: 'IOLatencyChart', w: 18, h: 11, x: 0, y: 12 },
    { i: 'IODiskBandwidthChart', w: 17, h: 11, x: 18, y: 12 },
  ],
}
