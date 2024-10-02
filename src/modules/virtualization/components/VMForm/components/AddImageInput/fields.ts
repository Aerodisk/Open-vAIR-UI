import { find, pick } from 'lodash'

import { StorageActionTypes, store } from '@/store'
import type { Storage, Image } from '@/api/generated'
import { t } from '@/locales'
import { bytesToSize } from '@helpers'
import type { FieldsPropType } from '@/components/Form'

const tPrefix = 'virtualization.vm.form.tabs.images'

export const fields = (storages: Storage[], images: Image[]): FieldsPropType => [
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
    name: 'image_id',
    headers: [
      { key: 'name', title: t('name') },
      { key: 'size', title: t('sizes.volume'), valueRender: bytesToSize },
      { key: 'storage_name', title: t(`${tPrefix}.fields.image.headers.storageName`) },
      { key: 'storage_type', title: t(`${tPrefix}.fields.image.headers.storageType`) },
    ],
    items: v =>
      images
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
    onRefresh: () => store.dispatch(StorageActionTypes.GET_IMAGE_LIST, undefined),
    validationMessages: { required: t(`${tPrefix}.fields.image.validationMessage`) },
  },
]
