import { routeReplaceQuery } from '@helpers'
import { routes } from '@/router/routes'

export const getVmEditPath = (id: string) => routeReplaceQuery(routes.virtualization.virtualMachines.item.edit, { id })

export const getVmPath = (id: string) => routeReplaceQuery(routes.virtualization.virtualMachines.item.root, { id })

export const getVnetPath = (id: string) => routeReplaceQuery(routes.virtualization.virtualNetworks.item.root, { id })
