import { find, pick } from 'lodash'

import type { Storage, Volume } from '@api/generated'
import { StorageActionTypes, store } from '@/store'
import { bytesToSize, sizeToBytes } from '@helpers'
import { t } from '@/locales'

import type { TabsPropType } from '@/components/Form'
import type { FieldsBlockWithFields, FieldType } from '@/components/Form/types'
import { getFormValues } from '@/components/Form/helpers'

const tPrefix = 'virtualization.vm.form.tabs.disks'

const diskCreateFields = (storages: Storage[]): (FieldType | FieldsBlockWithFields)[] => [
  {
    type: 'text',
    name: 'name',
    label: 'Имя',
    placeholder: 'Укажите имя',
    validation: 'required|length:2,45|name',
  },
  {
    type: 'select',
    name: 'storage_id',
    label: 'Хранилище',
    placeholder: 'Выберите хранилище',
    validation: 'required',
    options: () =>
      (storages || []).map(i => ({
        label: `${i.storage_type} | 
            ${i.name} | 
            ${bytesToSize(i.size - i.available)}/${bytesToSize(i.size)}`,
        value: i.id,
      })),
  },
  {
    direction: 'row',
    fields: [
      {
        type: 'select',
        name: 'format',
        label: 'Формат',
        placeholder: 'Выберите формат',
        validation: 'required',
        options: [
          { label: 'qcow2', value: 'qcow2' },
          { label: 'raw', value: 'raw' },
        ],
      },
    ],
  },
  {
    type: 'size',
    name: 'size',
    label: 'Размер',
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
        return t('storages.disks.actions.create.fields.size.validation', { size: bytesToSize(storage.available) })
      },
    },
  },
  {
    type: 'checkbox',
    name: 'read_only',
    label: t(`storages.disks.actions.create.fields.read_only.label`),
    style: { marginTop: '8px' },
  },
]

export const extraSettingsFields = (): (FieldType | FieldsBlockWithFields)[] => [
  {
    direction: 'row',
    fields: [
      {
        type: 'select',
        name: 'emulation',
        label: t(`${tPrefix}.fields.emulation.label`),
        placeholder: t(`${tPrefix}.fields.emulation.placeholder`),
        options: [
          { label: 'virtio', value: 'virtio' },
          { label: 'ide', value: 'ide' },
          { label: 'scsi', value: 'scsi' },
        ],
        validation: 'required',
      },
    ],
  },
  {
    title: t(`${tPrefix}.sections.qos`),
    direction: 'column',
    fields: [
      {
        type: 'select',
        name: 'template',
        label: t(`${tPrefix}.fields.template.label`),
        placeholder: t(`${tPrefix}.fields.template.placeholder`),
        options: [],
      },
    ],
  },
  {
    title: t(`${tPrefix}.sections.readWriteSec`),
    direction: 'row',
    fields: [
      {
        type: 'number',
        name: 'mb_read',
        label: t(`${tPrefix}.fields.iopsRead.label`),
        validation: 'required|min:0|max:3000',
        style: { width: '32.353%' },
      },
      {
        type: 'number',
        name: 'mb_write',
        label: t(`${tPrefix}.fields.iopsWrite.label`),
        validation: 'required|min:0|max:3000',
        style: { width: '32.353%' },
      },
    ],
  },
  {
    title: t(`${tPrefix}.sections.iops`),
    direction: 'row',
    fields: [
      {
        type: 'number',
        name: 'iops_read',
        label: t(`${tPrefix}.fields.iopsRead.label`),
        validation: 'required|min:0|max:10000',
        style: { width: '32.353%' },
      },
      {
        type: 'number',
        name: 'iops_write',
        label: t(`${tPrefix}.fields.iopsWrite.label`),
        validation: 'required|min:0|max:10000',
        style: { width: '32.353%' },
      },
    ],
  },
]

export const tabs = (volumes: Volume[], storages: Storage[]): TabsPropType => [
  {
    title: t('add'),
    fields: [
      {
        type: 'radio',
        name: 'variant',
        options: [
          { label: t(`${tPrefix}.fields.variant.options.exist`), value: 'exist' },
          { label: t(`${tPrefix}.fields.variant.options.new`), value: 'new' },
        ],
      },
    ],
  },
  {
    title: t(`${tPrefix}.tabs.existDisk`),
    showIf: values => values.variant === 'exist',
    fields: [
      {
        direction: 'row',
        fields: [
          {
            type: 'select',
            name: 'storage_type',
            label: t(`${tPrefix}.fields.storageType.label`),
            placeholder: t(`${tPrefix}.fields.storageType.placeholder`),
            options: [
              { label: 'NFS', value: 'nfs' },
              { label: 'LocalFS', value: 'localfs' },
            ],
          },
          {
            type: 'select',
            name: 'storage_subtype',
            label: t(`${tPrefix}.fields.storageSubtype.label`),
            placeholder: t(`${tPrefix}.fields.storageSubtype.placeholder`),
            options: v =>
              storages
                .filter(i => (v.storage_type ? i.storage_type === v.storage_type : true))
                .map(i => ({ value: i.id, label: `${i.storage_type} | ${i.name}` })),
          },
        ],
      },
      {
        type: 'table',
        name: 'volume_id',
        headers: [
          { key: 'name', title: t('name') },
          { key: 'size', title: t('sizes.volume'), valueRender: bytesToSize },
          { key: 'storage_name', title: t(`${tPrefix}.fields.disk.headers.storageName`) },
          { key: 'storage_type', title: t(`${tPrefix}.fields.disk.headers.storageType`) },
        ],
        items: v =>
          volumes
            .map(i => {
              const storage = find(storages, { id: i.storage_id })
              return {
                ...pick(i, ['id', 'name', 'size']),
                storage_id: storage?.id,
                storage_type: storage?.storage_type,
                storage_name: storage?.name,
              }
            })
            .filter(i => (v.storage_type ? i.storage_type === v.storage_type : true))
            .filter(i => (v.storage_subtype ? i.storage_id === v.storage_subtype : true)),
        multiple: false,
        validation: 'required',
        onRefresh: () => store.dispatch(StorageActionTypes.GET_VOLUME_LIST, undefined),
        validationMessages: { required: t(`${tPrefix}.fields.disk.validationMessage`) },
      },
    ],
  },
  // {
  //   title: t(`${tPrefix}.tabs.existDiskExtra`),
  //   showIf: v => v.variant === 'exist',
  //   fields: extraSettingsFields(),
  // },
  {
    title: t(`${tPrefix}.tabs.new`),
    showIf: values => values.variant === 'new',
    fields: [
      ...diskCreateFields(storages),
      // {
      //   showIf: v => v.extra_settings,
      //   direction: 'column',
      //   title: t(`${tPrefix}.sections.diskConfiguration`),
      //   fields: extraSettingsFields(),
      // },
      // {
      //   type: 'checkbox',
      //   name: 'extra_settings',
      //   label: t(`${tPrefix}.fields.extraSettings`),
      //   style: { marginTop: '8px' },
      // },
    ],
  },
]

export const initials = {
  variant: 'exist',
  emulation: 'virtio',
  mb_read: 150,
  mb_write: 100,
  iops_read: 500,
  iops_write: 500,
  format: 'qcow2',
  size: sizeToBytes(1, 'G'),
  read_only: false,
}
