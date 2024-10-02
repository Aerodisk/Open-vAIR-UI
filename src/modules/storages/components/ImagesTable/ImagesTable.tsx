import { defineComponent } from 'vue'
import { find } from 'lodash'

import { StorageActionTypes } from '@/store'
import { bytesToSize } from '@helpers'
import { compT as t } from '@/locales'

import { IsExistsHoc } from '@/components/IsExistsHoc'
import { DataTable, DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import type { ButtonProps } from '@/components/Button'

import { getStoragePath } from '../../utils'
import { ImageUploadModal } from '../ImageUploadModal'
import { useActions } from './actions'

const tPrefix = 'storages.images.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name') },
  { key: 'description', title: t('description') },
  { key: 'path', title: t('path') },
  { key: 'storageName', title: t(`${tPrefix}.storage`), link: (_, i) => getStoragePath(i.storage_id) },
  { key: 'size', title: t('sizes.size'), valueRender: bytesToSize },
  {
    key: 'attachments',
    title: t(`${tPrefix}.attachments`),
    valueRender: v => v?.map((i: { vm_id: string }) => i.vm_id).join(', '),
  },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'information', title: t(`${tPrefix}.information`) },
]

export const ImagesTable = defineComponent({
  name: 'ImagesTable',
  computed: {
    items() {
      const storages = this.$store.state.storage.storages
      return this.$store.state.storage.images.map(i => {
        const storage = find(storages, { id: i.storage_id })
        return { ...i, storageName: `${storage?.storage_type} | ${storage?.name}` }
      })
    },
    error() {
      return this.$store.state.actionsState[StorageActionTypes.GET_IMAGE_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(StorageActionTypes.GET_IMAGE_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      {
        title: this.$t('storages.images.actions.upload.title'),
        icon: { icon: 'upload', size: 'small' },
        modal: <ImageUploadModal />,
      },
    ]

    return (
      <IsExistsHoc actions={[StorageActionTypes.GET_IMAGE_LIST, StorageActionTypes.GET_STORAGE_LIST]}>
        <DataTable
          headers={headers}
          items={this.items}
          onRefresh={this.refresh}
          error={this.error}
          tableActions={tableActions}
          itemActions={useActions}
          withQuery
        />
      </IsExistsHoc>
    )
  },
})
