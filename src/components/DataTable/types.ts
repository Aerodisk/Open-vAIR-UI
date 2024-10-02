/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComputedRef, VNode } from 'vue'
import type { ButtonProps } from '@/components/Button'

type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any)

type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string | ComputedRef<string>
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end' | 'center'
  width?: number | string
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  sort?: DataTableCompareFunction
  valueRender?: (value: any, item: any) => any
  link?: string | ((value: any, item: any) => string | null)
  noWrap?: boolean
  visible?: boolean
  customKeyFilter?: (
    value: any,
    filter: string,
    item: any,
    headers: DataTableHeaders
  ) => boolean | number | [number, number] | [number, number][]
}

export type DataTableHeaders = DataTableHeader[]

export type DataTableSortBy = {
  key: string
  order: 'asc' | 'desc'
}[]
interface InternalItem<T> {
  value: any
  raw: T
}
interface GroupableItem<T> {
  type: 'item'
  raw: T
}
interface SelectableItem {
  value: any
  selectable: boolean
}
export interface DataTableItem<T> extends InternalItem<T>, GroupableItem<T>, SelectableItem {
  key: any
  index: number
  columns: {
    [key: string]: any
  }
}

export type DataTableItemSlotProps = {
  internalItem: DataTableItem<unknown>
  isSelected: Function
  toggleSelect: Function
}

export type DataTableSelectHeaderSlotProps = {
  allSelected: boolean
  someSelected: boolean
  selectAll: (value: boolean) => void
}

type ItemActions<T = any, U extends T | T[] = T | T[]> = (
  arg: U
) => U extends Array<T> ? DataTableHeaderItemsActionsAction<T>[] : DataTableCellActionsAction<T>[]

export type DataTableProps<T extends object = object> = {
  items: T[]
  headers: DataTableHeaders
  itemValue?: string
  itemTitle?: string
  title?: string
  initialSortBy?: { key: string; order: 'desc' | 'asc' }
  tableActions?: ButtonProps[]
  selected?: string[]
  short?: boolean
  disableItemPerPageSelect?: boolean
  multiple?: boolean
  clickable?: boolean
  itemActions?: ItemActions
}

export type DataTableCellActionsProps = {
  item: any
  actions: DataTableCellActionsAction<any>[]
}

export type DataTableHeaderItemsActionsProps = {
  items: object[]
  actions: DataTableHeaderItemsActionsAction<any>[]
}

export type DataTableCellActionsAction<T = {}> = Omit<ButtonProps, 'onClick' | 'modal'> & {
  onClick?: (item: DataTableItem<T>) => void
  icon?: ButtonProps['icon']
  modal?: VNode
}

export type DataTableHeaderItemsActionsAction<T = {}> = Omit<ButtonProps, 'onClick' | 'modal'> & {
  onClick?: (items: T[]) => void
  icon?: ButtonProps['icon']
  modal?: VNode
}

export type TableActionType<T> = (
  arg: T | T[]
) => (typeof arg extends T[] ? DataTableHeaderItemsActionsAction<T> : DataTableCellActionsAction<T>) | null

export type TableActionsHook<Item, T = Item | Item[]> = (
  v: T
) => T extends Array<Item> ? DataTableHeaderItemsActionsAction<Item>[] : DataTableCellActionsAction<Item>[]
