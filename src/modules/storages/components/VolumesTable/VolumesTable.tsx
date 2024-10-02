import { defineComponent } from 'vue'
import { find } from 'lodash'

import { booleanTranslate, bytesToSize } from '@helpers'
import { StorageActionTypes } from '@/store/modules'
import { compT as t } from '@/locales'

import { IsExistsHoc } from '@/components/IsExistsHoc'
import { DataTable, DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import type { ButtonProps } from '@/components/Button'
import { ProgressLinearWidget } from '@/components/Widget'

import { getStoragePath } from '../../utils'
import { VolumeCreateModal } from '../VolumeCreateModal'
import { useActions } from './actions'

const tPrefix = 'storages.disks.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name') },
  { key: 'description', title: t('description') },
  { key: 'format', title: t('format') },
  { key: 'storageName', title: t(`${tPrefix}.storage`), link: (_, i) => getStoragePath(i.storage_id) },
  { key: 'size', title: t('sizes.size'), valueRender: bytesToSize },
  { key: 'used', title: t(`sizes.used`), valueRender: bytesToSize },
  {
    key: 'avail_percentage',
    title: t('sizes.availPercentage'),
    valueRender: v => <ProgressLinearWidget value={v} />,
    width: 200,
  },
  { key: 'read_only', title: t(`${tPrefix}.readOnly`), valueRender: booleanTranslate },
  {
    key: 'attachments',
    title: t(`${tPrefix}.attachments`),
    valueRender: v => v?.map((i: { vm_id: string }) => i.vm_id).join(', '),
  },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'information', title: t(`${tPrefix}.information`) },
]

export const VolumesTable = defineComponent({
  name: 'VolumesTable',
  computed: {
    items() {
      const storages = this.$store.state.storage.storages
      return this.$store.state.storage.volumes.map(i => {
        const storage = find(storages, { id: i.storage_id })
        return {
          ...i,
          storageName: `${storage?.storage_type} | ${storage?.name}`,
          avail_percentage: (i.used || 0) / (i.size / 100),
        }
      })
    },
    error() {
      return this.$store.state.actionsState[StorageActionTypes.GET_VOLUME_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(StorageActionTypes.GET_VOLUME_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      { title: this.$t('create'), icon: { icon: 'plus', size: 'small' }, modal: <VolumeCreateModal /> },
    ]

    return (
      <IsExistsHoc actions={[StorageActionTypes.GET_VOLUME_LIST, StorageActionTypes.GET_STORAGE_LIST]}>
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
