import { computed, ComputedRef } from 'vue'
import { concat } from 'lodash'
import type { LocationQueryRaw } from 'vue-router'

import { BlockDevicesActionTypes, type RootActions, store } from '@/store'
import { t } from '@/locales'
import { routes } from '@/router/routes'
import { useModalOpenState, useWithConfirm } from '@/components/Modal'

import { BridgeCreateModal } from '@/modules/devices/components/BridgeCreateModal'
import { VirtualNetworkCreateModal } from '@/modules/virtualization/components/VirtualNetworkCreateModal'
import { StorageCreateModal } from '@/modules/storages/components/StorageCreateModal'
import { VolumeCreateModal } from '@/modules/storages/components/VolumeCreateModal'
import { ImageUploadModal } from '@/modules/storages/components/ImageUploadModal'
import { SessionLoginModal } from '@/modules/blockDevices/components/SessionLoginModal'

import {
  createKeywords,
  fibreChannelKeywords,
  imageKeywords,
  iscsiSessionKeywords,
  networkInterfaceKeywords,
  physicalDisksKeywords,
  scanKeywords,
  storagesKeywords,
  storagesTypesKeywords,
  virtualVolumeKeywords,
  vmKeywords,
  vNetKeywords,
} from './keywords'
import { getVmPath, getVnetPath } from '@/modules/virtualization/utils'
import { getStoragePath } from '@/modules/storages/utils'

export type SearchAction =
  | { type: 'redirect'; path: string; query?: LocationQueryRaw }
  | { type: 'modal'; modal: ReturnType<typeof useModalWithState> }
  | { type: 'dispatchEvent'; event: keyof RootActions }
  | { type: 'function'; fc: Function }
export type SearchItem = {
  label: ComputedRef<string> | string
  description?: ComputedRef<string> | string
  keywords: string[]
  action: SearchAction
}

const tPrefix = 'header.search.options.labels'
const tPrefixDesc = 'header.search.options.descriptions'

const useModalWithState = (Component: Function, id: string) => {
  const [openModal, p] = useModalOpenState(id)
  return { component: <Component {...p} />, openModal }
}
const useConfirm = (props: Parameters<typeof useWithConfirm>[0]) => () => useWithConfirm()(props)

const interfacesSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.devices.interfaces.map(i => ({
    label: i.name,
    description: t(`${tPrefixDesc}.interface`),
    keywords: networkInterfaceKeywords,
    action: { type: 'redirect', path: routes.devices.interfaces.root, query: { search: `name=${i.name}` } },
  }))
)

const physicalDiskSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.devices.disks.map(i => ({
    label: i.path,
    description: t(`${tPrefixDesc}.physicalDisk`),
    keywords: physicalDisksKeywords,
    action: { type: 'redirect', path: routes.devices.disks.root, query: { search: `path=${i.path}` } },
  }))
)

const vmSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.virtualization.vm.map(i => ({
    label: i.name,
    description: t(`${tPrefixDesc}.virtualMachine`),
    keywords: vmKeywords,
    action: { type: 'redirect', path: getVmPath(i.id) },
  }))
)

const vnetSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.virtualization.virtualNetworks.map(i => ({
    label: `${i.network_name}`,
    description: t(`${tPrefixDesc}.vnet`),
    keywords: vNetKeywords,
    action: { type: 'redirect', path: getVnetPath(i.id) },
  }))
)

const storageSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.storage.storages.map(i => ({
    label: i.name,
    description: t(`${tPrefixDesc}.storage`),
    keywords: concat(storagesKeywords, storagesTypesKeywords),
    action: { type: 'redirect', path: getStoragePath(i.id) },
  }))
)

const volumesSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.storage.volumes.map(i => ({
    label: i.name,
    description: t(`${tPrefixDesc}.volume`),
    keywords: virtualVolumeKeywords,
    action: { type: 'redirect', path: routes.storage.volumes.root, query: { search: `name=${i.name}` } },
  }))
)

const imagesSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.storage.images.map(i => ({
    label: i.name,
    description: t(`${tPrefixDesc}.image`),
    keywords: imageKeywords,
    action: { type: 'redirect', path: routes.storage.images.root, query: { search: `name=${i.name}` } },
  }))
)

const iscsiSessionsSearchItems: ComputedRef<SearchItem[]> = computed(() =>
  store.state.blockDevices.sessions.map(i => ({
    label: i.ip,
    description: t(`${tPrefixDesc}.iscsiSession`),
    keywords: iscsiSessionKeywords,
    action: { type: 'redirect', path: routes.blockDevices.root, query: { search: `ip=${i.ip}` } },
  }))
)

export const searchArray: ComputedRef<SearchItem[]> = computed(() => [
  {
    label: t(`${tPrefix}.bridgeCreate`),
    keywords: concat(createKeywords, networkInterfaceKeywords),
    action: { type: 'modal', modal: useModalWithState(BridgeCreateModal, 'hs_bridgeCreate') },
  },
  {
    label: t(`${tPrefix}.vmCreate`),
    keywords: concat(createKeywords, vmKeywords),
    action: { type: 'redirect', path: routes.virtualization.virtualMachines.create },
  },
  {
    label: t(`${tPrefix}.vnetCreate`),
    keywords: concat(createKeywords, vNetKeywords),
    action: { type: 'modal', modal: useModalWithState(VirtualNetworkCreateModal, 'hs_vnetCreate') },
  },
  {
    label: t(`${tPrefix}.storageCreate`),
    keywords: concat(createKeywords, storagesKeywords),
    action: { type: 'modal', modal: useModalWithState(StorageCreateModal, 'hs_storageCreate') },
  },
  {
    label: t(`${tPrefix}.volumeCreate`),
    keywords: concat(createKeywords, virtualVolumeKeywords),
    action: { type: 'modal', modal: useModalWithState(VolumeCreateModal, 'hs_volumeCreate') },
  },
  {
    label: t(`${tPrefix}.imageCreate`),
    keywords: concat(createKeywords, imageKeywords),
    action: { type: 'modal', modal: useModalWithState(ImageUploadModal, 'hs_imageCreate') },
  },
  {
    label: t(`${tPrefix}.iscsiSessionCreate`),
    keywords: concat(createKeywords, iscsiSessionKeywords),
    action: { type: 'modal', modal: useModalWithState(SessionLoginModal, 'hs_iscsiSessionCreate') },
  },
  {
    label: t(`${tPrefix}.fibreChannelLipScan`),
    keywords: concat(scanKeywords, fibreChannelKeywords),
    action: {
      type: 'function',
      fc: useConfirm({
        title: t(`blockDevices.actions.scan.modalTitle`),
        text: t(`blockDevices.actions.scan.text`),
        confirmText: t(`blockDevices.actions.scan.confirmText`),
        onConfirm: () => store.dispatch(BlockDevicesActionTypes.FC_LIP_SCAN, undefined),
      }),
    },
  },
  ...interfacesSearchItems.value,
  ...physicalDiskSearchItems.value,
  ...vmSearchItems.value,
  ...vnetSearchItems.value,
  ...storageSearchItems.value,
  ...volumesSearchItems.value,
  ...imagesSearchItems.value,
  ...iscsiSessionsSearchItems.value,
])
