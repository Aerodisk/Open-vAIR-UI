import { chain } from 'lodash'
import type { RouteParams } from 'vue-router'

/** Заменяет параметры в строке пути реальными значениями.
 * @param path строка пути
 * @param params параметры роута
 * @example
 * routeReplaceQuery("/virtualization/virtual-machines/edit/:id", {id: "7ece5dfc-49ce-483a-9f09-f01cb8b6947c"})
 * // => "/virtualization/virtual-machines/edit/7ece5dfc-49ce-483a-9f09-f01cb8b6947c"
 * routeReplaceQuery("/virtualization/:something/:id", {id: "7ece5dfc-49ce-483a-9f09-f01cb8b6947c", something: "value"})
 * // => "/virtualization/value/7ece5dfc-49ce-483a-9f09-f01cb8b6947c" */
export const routeReplaceQuery = (path: string, params: RouteParams) =>
  path
    .split('/')
    .map(path => (path.startsWith(':') ? `${params[path.slice(1)]}` : path))
    .join('/')

/** формирует url строку с query фильтрами для таблицы
 * @param path строка пути
 * @param filters query фильтры
 * @example
 * routeFilters('/virtualization/virtual-machines', {node: 'NODE-0001'}) // => /virtualization/virtual-machines?search=state.node=NODE-0001
 * routeFilters('/virtualization/virtual-machines', {node: 'NODE-0001', name: 'VM_1'}) // => /virtualization/virtual-machines?search=state.node=NODE-0001&name=VM_1 */
export const routeFilters = (path: string, filters: Record<string, string>) => {
  return `${path}?search=${chain(filters)
    .mapValues((v, k) => `${k}=${v}`)
    .values()
    .value()
    .join('%26')}`
}
