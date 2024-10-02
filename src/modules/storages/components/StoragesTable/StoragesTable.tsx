import { defineComponent } from 'vue'

import { StorageActionTypes } from '@/store'
import { bytesToSize } from '@helpers'
import { compT as t } from '@/locales'

import { DataTable, DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import type { ButtonProps } from '@/components/Button'
import { ProgressLinearWidget } from '@/components/Widget'

import { getStoragePath } from '../../utils'
import { StorageCreateModal } from '../StorageCreateModal'
import { useActions } from './actions'

const tPrefix = 'storages.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name'), link: (_, i) => getStoragePath(i.id) },
  { key: 'description', title: t('description') },
  { key: 'storage_type', title: t(`${tPrefix}.storageType`) },
  { key: 'size', title: t('sizes.size'), valueRender: bytesToSize },
  { key: 'used', title: t(`sizes.used`), valueRender: bytesToSize },
  {
    key: 'avail_percentage',
    title: t('sizes.availPercentage'),
    valueRender: v => <ProgressLinearWidget value={v} />,
    width: 200,
  },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'information', title: t(`${tPrefix}.information`) },
]

export const StoragesTable = defineComponent({
  name: 'StoragesTable',
  computed: {
    items() {
      return this.$store.state.storage.storages.map(i => ({
        ...i,
        used: i.size - i.available,
        avail_percentage: (i.size - i.available) / (i.size / 100),
      }))
    },
    error() {
      return this.$store.state.actionsState[StorageActionTypes.GET_STORAGE_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(StorageActionTypes.GET_STORAGE_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      { title: this.$t('create'), icon: { icon: 'plus', size: 'small' }, modal: <StorageCreateModal /> },
    ]

    return (
      <IsExistsHoc actions={[StorageActionTypes.GET_STORAGE_LIST]}>
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
