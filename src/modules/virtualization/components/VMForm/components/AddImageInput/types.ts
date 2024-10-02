export type FormDataType = {
  storage_type: never
  storage_subtype: never
  image_id: string
}

export type ImageInputValue = {
  __id: number
  name: string
  image_id: string
  boot_order: number
  order: number
  format: string
  emulation: string
  qos: { iops_read: number; iops_write: number; mb_read: number; mb_write: number }
}
