import { routeReplaceQuery } from '@helpers'
import { routes } from '@/router'

export const getLocalDiskPath = (path: string) =>
  routeReplaceQuery(routes.devices.disks.item.root, { path: encodeURIComponent(path) })
