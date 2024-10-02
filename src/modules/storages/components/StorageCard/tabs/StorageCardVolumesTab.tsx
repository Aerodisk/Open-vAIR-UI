import { defineComponent, PropType } from 'vue'
import { filter } from 'lodash'

import type { Storage } from '@api/generated'
import { compT as t } from '@/locales'
import { bytesToSize } from '@helpers'

import { DataTable, DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import { ProgressLinearWidget } from '@/components/Widget'

import { useActions } from '../../VolumesTable/actions'

const tPrefix = 'storages.disks.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name') },
  { key: 'description', title: t('description') },
  { key: 'format', title: t('format') },
  { key: 'size', title: t('sizes.size'), valueRender: bytesToSize },
  { key: 'used', title: t(`sizes.used`), valueRender: bytesToSize },
  {
    key: 'avail_percentage',
    title: t('sizes.availPercentage'),
    valueRender: v => <ProgressLinearWidget value={v} />,
    width: 200,
    visible: false,
  },
  {
    key: 'attachments',
    title: t(`${tPrefix}.attachments`),
    visible: false,
    valueRender: v => v?.map((i: { vm_id: string }) => i.vm_id).join(', '),
  },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'information', title: t(`${tPrefix}.information`) },
]

export const StorageCardVolumesTab = defineComponent({
  name: 'StorageCardVolumesTab',
  props: { item: { type: Object as PropType<Storage>, required: true } },
  computed: {
    items() {
      return filter(this.$store.state.storage.volumes, { storage_id: this.item.id })
    },
  },
  render() {
    return <DataTable items={this.items} headers={headers} itemActions={useActions} />
  },
})
