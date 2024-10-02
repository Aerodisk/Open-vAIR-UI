import { routeReplaceQuery } from '@helpers'
import { routes } from '@/router/routes'

export const getStoragePath = (id: string) => routeReplaceQuery(routes.storage.storages.item, { id })
