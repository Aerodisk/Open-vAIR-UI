import { find, get, pick } from 'lodash'
import type { DataTableHeaders } from '@/components/DataTable/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getItemKeyValue = (i: any, h: DataTableHeaders, key: string) => {
  return (
    get(
      i.raw,
      h
        .map(i => pick(i, ['title', 'key']))
        .find(
          i =>
            i.key?.toLowerCase() === key ||
            (typeof i.title === 'string' ? i.title : i.title?.value)?.toLowerCase() === key
        )?.key || ''
    )
      ?.toString()
      .toLowerCase() || ''
  )
}

/* case 1: "A001"
 * case 2: "name=A001|name=A002"
 * case 3: "name=A001&type=ardfs|name=A002&type=ardfs"
 * case 4: "name=A001&type=ardfs|name=A002&type=ardfs" */
export const customFilter =
  (headers: DataTableHeaders) =>
  (
    value: string,
    filter: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item?: any
  ): boolean | number | [number, number] | [number, number][] => {
    if (value == null || filter == null) return -1

    value = value.toString().toLowerCase()
    filter = filter.toString().toLowerCase()

    if (filter.includes('|')) return itemsFilter(value, filter, item, headers)
    if (filter.includes('&')) return fieldsFilter(value, filter, item, headers)
    if (filter.includes('=')) return fieldFilter(value, filter, item, headers)

    const ind = value.indexOf(filter)
    const customFilterMatch = headers.find(i => {
      const result = i.customKeyFilter?.(value, filter, item, headers)
      const checkCustomRender = !!headers.find(i => {
        const v = i.valueRender?.(item.raw[i.key], item.raw) || item.raw[i.key]
        return ['string', 'number', 'boolean'].includes(typeof v) ? v.toString().toLowerCase().includes(filter) : false
      })

      return result === 1 || result === true || checkCustomRender
    })

    return ind === -1 ? !!customFilterMatch : ind
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemsFilter = (value: any, filter: string, item: any, headers: DataTableHeaders) => {
  const items = filter.split('|')
  return items.find(i => fieldsFilter(value, i, item, headers) === 1) ? 1 : -1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fieldsFilter = (value: any, filter: string, item: any, headers: DataTableHeaders) => {
  const fields = filter.split('&')
  const isMatch = fields.map(i => fieldFilter(value, i, item, headers)).every(i => i === 1)
  return isMatch ? 1 : -1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fieldFilter = (value: any, filter: string, item: any, headers: DataTableHeaders) => {
  const [key, search] = filter.split('=')
  const itemKeyValue = getItemKeyValue(item, headers, key)
  if (!search) return 1
  if (itemKeyValue !== value && !itemKeyValue?.includes?.(search)) return -1
  const customFieldMatch = find(
    headers,
    i => i.key?.toLowerCase() === key || (typeof i.title === 'string' ? i.title : i.title?.value)?.toLowerCase() === key
  )?.customKeyFilter?.(value, search, item, headers)
  return itemKeyValue.includes(search) ||
    find(headers, { key })?.valueRender?.(itemKeyValue, item).toString().toLowerCase().includes(search) ||
    customFieldMatch === 1 ||
    customFieldMatch === true
    ? 1
    : -1
}
