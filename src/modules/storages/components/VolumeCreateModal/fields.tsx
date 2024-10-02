import type { CreateVolumeFormatEnum, Storage } from '@/api/generated'
import { t } from '@/locales'
import { bytesToSize, bytesToUnit, sizeToBytes } from '@helpers'

import { FieldsPropType } from '@/components/Form/types'
import { getFormValues } from '@/components/Form/helpers'

const tPrefix = 'storages.disks.actions.create'

export const fields = (storages: Storage[]): FieldsPropType => [
  {
    type: 'text',
    name: 'name',
    label: t(`${tPrefix}.fields.name.label`),
    placeholder: t(`${tPrefix}.fields.name.placeholder`),
    validation: 'required|length:2,45|name',
  },
  {
    type: 'textarea',
    name: 'description',
    label: t(`${tPrefix}.fields.description.label`),
    placeholder: t(`${tPrefix}.fields.description.placeholder`),
    validation: 'length:0,255',
    minRows: 2,
  },
  {
    type: 'select',
    name: 'storage_id',
    label: t(`${tPrefix}.fields.storage.label`),
    placeholder: t(`${tPrefix}.fields.storage.placeholder`),
    validation: 'required',
    options: () =>
      (storages || []).map(i => {
        const exactUnit = bytesToUnit(i.size)
        return {
          label: `${i.storage_type.toUpperCase()} | 
            ${i.name} | 
            ${bytesToSize(i.size - i.available, { exactUnit })}/${bytesToSize(i.size, {
            exactUnit,
          })}`,
          value: i.id,
        }
      }),
  },
  {
    type: 'select',
    name: 'format',
    label: t(`${tPrefix}.fields.format.label`),
    placeholder: t(`${tPrefix}.fields.format.placeholder`),
    validation: 'required',
    options: [
      { label: 'qcow2', value: 'qcow2' },
      { label: 'raw', value: 'raw' },
    ],
  },
  {
    type: 'size',
    name: 'size',
    label: t(`${tPrefix}.fields.size.label`),
    allowed: ['M', 'G', 'T'],
    validation: 'required|min:1|maxSize',
    validationRules: {
      maxSize: node => {
        const { storage_id } = getFormValues(node)
        if (!storage_id) return true
        const storage = storages.find(i => i.id === storage_id)
        if (!storage) return true
        return Number(node.value) <= Number(storage.available)
      },
    },
    validationMessages: {
      maxSize: ({ node }) => {
        const { storage_id } = getFormValues(node)
        const storage = storages.find(i => i.id === storage_id)
        if (!storage) return ''
        return t(`${tPrefix}.fields.size.validation`, { size: bytesToSize(storage.available) })
      },
    },
  },
  {
    type: 'checkbox',
    name: 'read_only',
    label: t(`${tPrefix}.fields.read_only.label`),
    style: { marginTop: '8px' },
  },
]

export type FormDataType = {
  name: string
  description: string
  storage_id: string
  size: number
  format: CreateVolumeFormatEnum
  read_only: boolean
}

export const initials: Partial<FormDataType> = {
  description: '',
  format: 'qcow2',
  size: sizeToBytes(1, 'G'),
  read_only: false,
}
