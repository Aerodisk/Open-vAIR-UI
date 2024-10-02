import type { AttachDisksInnerEmulationEnum, AttachDisksInnerFormatEnum } from '@api/generated'

export type DiskExtraSettings = {
  emulation: 'virtio' | 'ide' | 'scsi'
  mb_read: number
  mb_write: number
  iops_read: number
  iops_write: number
  template: never
}

type ExistFormDataType = {
  variant: 'exist'
  volume_id: string
  storage_subtype: never
  storage_type: never
} & DiskExtraSettings

type NewDiskFormDataType = {
  variant: 'new'
  name: string
  storage_id: string
  format: 'qcow2' | 'raw'
  size: number
  read_only: boolean
  extra_settings: never
} & DiskExtraSettings

export type FormDataType = ExistFormDataType | NewDiskFormDataType

export type DiskInputValue = {
  __id: number
  name: string
  format: AttachDisksInnerFormatEnum
  emulation: AttachDisksInnerEmulationEnum
  boot_order: number
  order: number
  qos: { iops_read: number; iops_write: number; mb_read: number; mb_write: number }
  volume_id?: string
  storage_id?: string
  size?: string
  read_only?: boolean
}
