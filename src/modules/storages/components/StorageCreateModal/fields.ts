import { sum } from 'lodash'

import type { LocalDisk } from '@api/generated'
import { DevicesActionTypes, store } from '@/store'
import { bytesToSize } from '@helpers'
import { t } from '@/locales'

import type { FieldsBlockWithFields, FieldType, TabItem, TabsPropType } from '@/components/Form/types'
import { storageTypes } from './types'

const tPrefix = 'storages.actions.create.form'

const isTypeEquals =
  (exactType: keyof typeof storageTypes) =>
  ({ storage_type }: { storage_type: string }) =>
    storage_type === exactType

const commonFields = (): (FieldType | FieldsBlockWithFields)[] => [
  {
    type: 'text',
    name: 'name',
    label: t(`${tPrefix}.fields.common.name.label`),
    placeholder: t(`${tPrefix}.fields.common.name.placeholder`),
    validation: 'required|name|length:2,45',
  },
  {
    type: 'textarea',
    name: 'description',
    label: t(`${tPrefix}.fields.common.description.label`),
    placeholder: t(`${tPrefix}.fields.common.description.placeholder`),
    minRows: 2,
    validation: 'length:0,256',
  },
]

const nfsTabs = (): TabItem[] => [
  {
    title: t(`${tPrefix}.tabs.configuration`),
    fields: [
      ...commonFields(),
      {
        type: 'text',
        name: 'ip',
        label: t(`${tPrefix}.fields.nfs.ip.label`),
        placeholder: t(`${tPrefix}.fields.nfs.ip.placeholder`),
        validation: 'required|ip',
      },
      {
        type: 'text',
        name: 'path',
        label: t(`${tPrefix}.fields.nfs.path.label`),
        placeholder: t(`${tPrefix}.fields.nfs.path.placeholder`),
        validation: 'required',
      },
    ],
  },
]

const localFsTabs = (disks: LocalDisk[]): TabItem[] => [
  {
    title: t(`${tPrefix}.tabs.configuration`),
    fields: [
      ...commonFields(),
      {
        type: 'select',
        name: 'fs_type',
        label: t(`${tPrefix}.fields.localFs.fsType.label`),
        placeholder: t(`${tPrefix}.fields.localFs.fsType.placeholder`),
        options: [
          { value: 'ext4', label: 'ext4' },
          { value: 'xfs', label: 'xfs' },
        ],
        validation: 'required',
      },
    ],
  },
  {
    title: t(`${tPrefix}.tabs.disk`),
    fields: [
      {
        type: 'table',
        name: 'path',
        headers: [
          { key: 'path', title: t(`${tPrefix}.fields.localFs.path.headers.path`) },
          { key: 'size', title: t(`${tPrefix}.fields.localFs.path.headers.size`), valueRender: bytesToSize },
          { key: 'type', title: t(`${tPrefix}.fields.localFs.path.headers.type`) },
        ],
        items: disks.map(i => {
          const childrenSize = sum(disks.filter(d => d.parent === i.path && d.type === 'part').map(i => i.size))
          return { ...i, size: i.size - childrenSize }
        }),
        itemValue: 'path',
        onRefresh: () => store.dispatch(DevicesActionTypes.GET_DISK_LIST, undefined),
        multiple: false,
        validation: 'required',
      },
    ],
  },
]

export const fields = (disks: LocalDisk[]): TabsPropType => [
  {
    title: t(`${tPrefix}.tabs.storageType`),
    fields: [
      {
        type: 'select',
        name: 'storage_type',
        label: t(`${tPrefix}.fields.storageType.label`),
        placeholder: t(`${tPrefix}.fields.storageType.placeholder`),
        validation: 'required',
        options: [
          { label: 'LocalFS', value: storageTypes.localfs },
          { label: 'NFS', value: storageTypes.nfs },
        ],
      },
    ],
  },
  ...nfsTabs().map(i => ({ ...i, showIf: isTypeEquals(storageTypes.nfs) })),
  ...localFsTabs(disks).map(i => ({ ...i, showIf: isTypeEquals(storageTypes.localfs) })),
]

export const initials = {
  description: '',
  storage_type: 'localfs',
  fs_type: 'ext4',
}
