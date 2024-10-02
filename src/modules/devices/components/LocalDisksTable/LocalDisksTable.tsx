import { defineComponent } from 'vue'
import { sortBy } from 'lodash'

import type { LocalDisk } from '@api/generated'
import { DevicesActionTypes } from '@/store'
import { compT as t } from '@/locales'
import { bytesToSize } from '@helpers'
import { getLocalDiskPath } from '@/modules/devices/utils'
import { DataTable, type DataTableHeaders } from '@/components/DataTable'
import { IsExistsHoc } from '@/components/IsExistsHoc'

import { useActions } from './actions'

const tPrefix = 'devices.physicalDisks.table'

const headers: DataTableHeaders = [
  { key: 'path', title: t('path'), link: v => getLocalDiskPath(v) },
  { key: 'size', title: t('sizes.size'), valueRender: bytesToSize },
  { key: 'mountpoint', title: t(`${tPrefix}.mountpoint`) },
  { key: 'fstype', title: t(`${tPrefix}.fsType`) },
  { key: 'fs_uuid', title: t(`${tPrefix}.fsId`), visible: false },
  { key: 'type', title: t(`${tPrefix}.type`) },
  { key: 'children', title: t(`${tPrefix}.children`), valueRender: (v: LocalDisk[]) => v.map(i => i.path).join(', ') },
]

export const LocalDisksTable = defineComponent({
  name: 'LocalDisksTable',
  computed: {
    items() {
      const disks = this.$store.state.devices.disks
      return disks
        .filter(i => !i.parent)
        .map(i => ({
          ...i,
          children: sortBy(
            disks.filter(d => d.parent === i.path && d.type === 'part'),
            'path'
          ),
        }))
    },
    error() {
      return this.$store.state.actionsState[DevicesActionTypes.GET_DISK_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(DevicesActionTypes.GET_DISK_LIST, undefined)
    },
  },
  render() {
    return (
      <IsExistsHoc actions={[DevicesActionTypes.GET_DISK_LIST]}>
        <DataTable
          headers={headers}
          items={this.items}
          itemActions={useActions}
          onRefresh={this.refresh}
          error={this.error}
          itemValue='path'
          withQuery
        />
      </IsExistsHoc>
    )
  },
})
