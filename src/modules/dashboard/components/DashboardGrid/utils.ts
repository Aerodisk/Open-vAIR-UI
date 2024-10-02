import type { LayoutItem } from 'vue3-grid-layout'
import { chain, cloneDeep, defaults, keys } from 'lodash'
import type { CreateComponentPublicInstance } from 'vue'

import { nearestNumber } from '@helpers'
import type { ArrayElement } from '@/types'

import type { DashboardWidgets } from '../DashboardWidget/widgets'
import type { GridLayout } from './DashboardGrid'
import { defaultLayouts, MARGIN, ROW_HEIGHT, widgetsDimensionsOptions } from './constants'

function isOverlapping(widget: LayoutItem, otherWidget: LayoutItem) {
  return (
    widget.x < otherWidget.x + otherWidget.w &&
    widget.x + widget.w > otherWidget.x &&
    widget.y < otherWidget.y + otherWidget.h &&
    widget.y + widget.h > otherWidget.y
  )
}

export function findNewPosition(layout: GridLayout, widget: LayoutItem, lastBreakpoint: number) {
  // Создаём безопасную от мутаций копию объекта с нулевыми координатами
  const safeWidget = { ...widget, x: 0, y: 0 }
  // Получаем список виджетов, с которыми может пересекаться виджет
  const widgets = layout.filter(w => w.i !== safeWidget.i)

  // Перемещаем виджет вправо, пока не найдем подходящее местоположение (без пересечения с другими виджетами)
  while (widgets.some(w => isOverlapping(safeWidget, w))) {
    safeWidget.x++
    if (safeWidget.x + safeWidget.w > lastBreakpoint) {
      // Если виджет не помещается в новом положении по ширине, сбросить положение по оси X и перейти ниже по оси Y
      safeWidget.x = 0
      safeWidget.y++
    }
    if (safeWidget.y + safeWidget.h > Infinity) break // Если виджет не помещается в новом положении, выйти из цикла
  }

  // Возвращаем новое местоположение виджета
  return { x: safeWidget.x, y: safeWidget.y }
}

export const findGridRef = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: CreateComponentPublicInstance<any, any, any, any>
): { lastBreakpoint: number } | undefined => {
  let parent = component.$parent
  let gridRef = null

  while (parent && !gridRef) {
    if (parent.$refs && parent.$refs.grid) gridRef = parent.$refs.grid
    else parent = parent.$parent
  }

  return gridRef
}

export const generateBreakpoints = () => {
  const breakpoints: Record<string, number> = {}
  const cols: Record<string, number> = {}
  for (let i = 1; i <= 500; i++) {
    breakpoints[i] = i * (ROW_HEIGHT + MARGIN)
    cols[i] = i
  }
  return { breakpoints, cols }
}

export const layoutWithDefault = (
  layout: (Partial<LayoutItem> & { i: keyof typeof DashboardWidgets })[]
): GridLayout => {
  return chain(layout)
    .mapValues((i: ArrayElement<GridLayout>) => layoutItemWithDefault(i))
    .values()
    .value() as unknown as GridLayout
}

export const layoutItemWithDefault = (
  widget: Partial<LayoutItem> & { i: keyof typeof DashboardWidgets }
): ArrayElement<GridLayout> => {
  return defaults(widget, widgetsDimensionsOptions[widget.i], { minW: 6, minH: 6, w: 6, h: 6, x: 0, y: 0 })
}

export const getDefaultLayout = (): Parameters<typeof layoutWithDefault>[0] => {
  const screenWidth = window.innerWidth
  const nearestWidth = nearestNumber(keys(defaultLayouts).map(Number), screenWidth)
  return cloneDeep(defaultLayouts[nearestWidth])
}
