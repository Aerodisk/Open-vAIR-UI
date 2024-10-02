import { markRaw } from 'vue'

import { routes } from '@/router'
import * as Icons from '@icons/sidebar'
import type { Component } from '@/types'

type Path = string | Record<'root' | string, string>

export type PathObject = Path | Record<'root' | string, Path>

/** @title локализационный ключ из раздела sidebar
 *  @path путь (ключ из объекта routes)
 *  @icon JSX иконка
 *  @children вложенные ссылки */
export type SidebarItemType = {
  title: string
  path?: PathObject
  icon?: Component
  available?: Function
  children?: { title: string; path: PathObject }[]
}

export const sidebarConfig: SidebarItemType[] = markRaw([
  {
    title: 'dashboard',
    icon: <Icons.MonitorIcon />,
    path: routes.root,
  },
  {
    title: 'devices',
    icon: <Icons.DevicesIcon />,
    children: [
      { title: 'networkAdapters', path: routes.devices.interfaces.root },
      { title: 'physicalDisks', path: routes.devices.disks },
    ],
  },
  {
    title: 'virtualization',
    icon: <Icons.CloudIcon />,
    children: [
      { title: 'virtualMachines', path: routes.virtualization.virtualMachines },
      { title: 'virtualNetworks', path: routes.virtualization.virtualNetworks },
    ],
  },
  {
    title: 'storage',
    icon: <Icons.StorageIcon />,
    children: [
      { title: 'storages', path: routes.storage.storages },
      { title: 'disks', path: routes.storage.volumes.root },
      { title: 'images', path: routes.storage.images.root },
    ],
  },
  {
    title: 'blockDevices',
    icon: <Icons.SettingsIcon />,
    path: routes.blockDevices.root,
  },
  {
    title: 'journal',
    icon: <Icons.JournalIcon />,
    path: routes.journal.root,
  },
])
