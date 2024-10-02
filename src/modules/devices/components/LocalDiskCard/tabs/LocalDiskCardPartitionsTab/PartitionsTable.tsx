import { defineComponent, PropType } from 'vue'
import { isArray, map } from 'lodash'

import type { LocalDisk } from '@api/generated'
import { DevicesActionTypes, store } from '@/store'
import { compT, t } from '@/locales'
import { bytesToSize, isNotNullable } from '@helpers'

import { DataTable, type DataTableHeaders, type TableActionsHook } from '@/components/DataTable'
import { useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'
import type { ButtonProps } from '@/components/Button'

import { DiskPartitionCreateModal } from '@/modules/devices/components/DiskPartitionCreateModal'

const tPrefix = 'devices.physicalDisks'

const headers: DataTableHeaders = [
  { key: 'path', title: compT('path') },
  { key: 'size', title: compT('sizes.size'), valueRender: bytesToSize },
  { key: 'fstype', title: compT(`${tPrefix}.table.fsType`) },
  { key: 'mountpoint', title: compT(`${tPrefix}.table.mountpoint`) },
  { key: 'fs_uuid', title: compT(`${tPrefix}.table.fsId`), visible: false },
]

const withConfirm = useWithConfirm()

const useDeleteAction = (arg: LocalDisk | LocalDisk[], diskPath: string) => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.actions.deletePartition.many.title`),
          text: t(`${tPrefix}.actions.deletePartition.many.text`, { count: arg.length }),
          itemsList: map(arg, 'path'),
          onConfirm: () =>
            map(arg, i =>
              store.dispatch(DevicesActionTypes.DELETE_DISK_PARTITION, {
                local_disk_path: diskPath,
                storage_type: 'local_partition',
                partition_number: i.path.replace(diskPath, ''),
              })
            ),
          confirmText: t('delete'),
          danger: true,
        }),
    }
  }
  return {
    title: t('delete'),
    icon: <Icon icon='delete' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.actions.deletePartition.single.title`),
        text: t(`${tPrefix}.actions.deletePartition.single.text`, { name: arg.path }),
        onConfirm: () =>
          store.dispatch(DevicesActionTypes.DELETE_DISK_PARTITION, {
            local_disk_path: diskPath,
            storage_type: 'local_partition',
            partition_number: arg.path.replace(diskPath, ''),
          }),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

export const PartitionsTable = defineComponent({
  name: 'PartitionsTable',
  props: { disk: { type: Object as PropType<LocalDisk & { children: LocalDisk[] }>, required: true } },
  render() {
    const useActions: TableActionsHook<unknown> = v => {
      const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
      const deletePartition = useDeleteAction(arg, this.disk.path)
      return [deletePartition].filter(isNotNullable)
    }
    const tableActions: ButtonProps[] = [
      {
        title: this.$t('create'),
        icon: { icon: 'plus', size: 'small' },
        modal: <DiskPartitionCreateModal disk={this.disk} />,
      },
    ]

    return (
      <DataTable
        headers={headers}
        items={this.disk.children}
        itemValue='path'
        tableActions={tableActions}
        itemActions={useActions}
      />
    )
  },
})
