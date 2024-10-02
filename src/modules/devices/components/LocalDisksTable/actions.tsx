import { isArray, map } from 'lodash'

import { isNotNullable } from '@helpers'
import type { LocalDisk } from '@api/generated'
import { t } from '@/locales'
import { DevicesActionTypes, store } from '@/store'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { Icon } from '@/components/Icon'
import { ModalForm, useModalOpenState, useWithConfirm } from '@/components/Modal'

import { DiskPartitionCreateModal } from '../DiskPartitionCreateModal'

type LocalDiskAction = TableActionType<LocalDisk & { children: LocalDisk[] }>

const tPrefix = 'devices.physicalDisks.actions'
const withConfirm = useWithConfirm()

const useCreatePartitionAction: LocalDiskAction = arg => {
  if (isArray(arg)) return null
  const [onClick, p] = useModalOpenState('disk_partition_create' + arg.path)
  return {
    title: t(`${tPrefix}.createPartition.title`),
    icon: <Icon icon='harddiskPlus' size='small' />,
    modal: <DiskPartitionCreateModal {...p} disk={arg} />,
    onClick,
  }
}

const useDeletePartitionAction: LocalDiskAction = arg => {
  if (isArray(arg) || !arg.children?.length) return null
  const [onClick, p] = useModalOpenState('disk_partition_delete' + arg.path)
  return {
    title: t(`${tPrefix}.deletePartition.title`),
    icon: <Icon icon='harddiskRemove' size='small' />,
    modal: (
      <ModalForm
        {...p}
        title={t(`${tPrefix}.deletePartition.many.title`)}
        fields={[
          {
            type: 'multiselect',
            name: 'partitions',
            label: t(`${tPrefix}.deletePartition.form.select.label`),
            placeholder: t(`${tPrefix}.deletePartition.form.select.placeholder`),
            options: arg.children.map(i => ({ label: i.path, value: i.path })),
          },
        ]}
        onSubmit={({ partitions }) =>
          withConfirm({
            title: t(`${tPrefix}.deletePartition.many.title`),
            text: t(`${tPrefix}.deletePartition.many.text`, { count: partitions.length }),
            itemsList: partitions,
            onConfirm: () =>
              map(partitions, i =>
                store.dispatch(DevicesActionTypes.DELETE_DISK_PARTITION, {
                  local_disk_path: arg.path,
                  storage_type: 'local_partition',
                  partition_number: i.replace(arg.path, ''),
                })
              ),
            confirmText: t('delete'),
            danger: true,
          })
        }
        submitText={t('delete')}
        submitDanger
      />
    ),
    onClick,
  }
}

export const useActions: TableActionsHook<LocalDisk & { children: LocalDisk[] }> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const createPartitionAction = useCreatePartitionAction(arg)
  const deletePartitionAction = useDeletePartitionAction(arg)

  return [createPartitionAction, deletePartitionAction].filter(isNotNullable)
}
