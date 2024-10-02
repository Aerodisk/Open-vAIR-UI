import { booleanTranslate, bytesToSize, formatDate } from '@helpers'
import type { DataTableHeader } from './types'

export const sizeFilter: DataTableHeader['customKeyFilter'] = (v, f) => {
  v = v.toString().toLowerCase()
  f = f.toString().toLowerCase()

  if (isNaN(Number(v))) return false

  const matchedKeys = [v, bytesToSize(v).toLowerCase()]

  return !!matchedKeys.find(key => key.includes(f))
}

export const booleanFilter: DataTableHeader['customKeyFilter'] = (v, f) => {
  const trueKeys = [booleanTranslate(true).toLowerCase(), '1', 'true']
  const falseKeys = [booleanTranslate(false).toLowerCase(), '0', 'false']

  v = v.toString().toLowerCase()
  f = f.toString().toLowerCase()

  return ([trueKeys, falseKeys].find(arr => arr.find(key => key.includes(f))) || []).includes(v) ? 1 : -1
}

export const statusFilter: DataTableHeader['customKeyFilter'] = (v, f) => {
  const statusOkKeys = ['true', '1', 'ok', 'ок']
  const statusErrorKeys = ['false', '0', 'error', 'ошибка']

  v = v.toString().toLowerCase()
  f = f.toString().toLowerCase()

  return ([statusOkKeys, statusErrorKeys].find(arr => arr.find(key => key.includes(f))) || []).includes(v) ? 1 : -1
}

export const dateFilter: DataTableHeader['customKeyFilter'] = (v, f) => {
  v = v.toString().toLowerCase()
  f = f.toString().toLowerCase()

  if (isNaN(Number(v))) {
    if (typeof v === 'string') return v.includes(f)
    return false
  }

  const matchedKeys = [v, formatDate(Number(v)).toLowerCase(), formatDate(Number(v), { from: 'unix' }).toLowerCase()]

  return !!matchedKeys.find(key => key.includes(f))
}
