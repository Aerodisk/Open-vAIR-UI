import { defineComponent, type PropType } from 'vue'

import type { PortGroup, VirtualNetworkResponse } from '@api/generated'
import { DataTable, type DataTableHeaders, type TableActionsHook } from '@/components/DataTable'
import { isArray, map } from 'lodash'
import { Icon } from '@/components/Icon'
import { store } from '@/store'
import { VirtualizationActionTypes } from '@/store/modules'
import { useWithConfirm } from '@/components/Modal'
import { isNotNullable } from '@helpers'
import type { ButtonProps } from '@/components/Button'
import { PortGroupCreateModal } from '@/modules/virtualization/components/PortGroupCreateModal'

const withConfirm = useWithConfirm()

const headers: DataTableHeaders = [
  { key: 'port_group_name', title: 'Имя' },
  { key: 'is_trunk', title: 'Trunk' },
  { key: 'tags', title: 'Тэги', valueRender: v => v?.join(', ') },
]

const useDeleteAction = (arg: PortGroup | PortGroup[], vnetId: string) => {
  if (isArray(arg)) {
    return {
      title: 'Удалить',
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: 'Удалить портгруппы',
          text: `Вы действительно хотите удалить портгруппы (${arg.length})?`,
          itemsList: map(arg, 'port_group_name') as string[],
          onConfirm: () =>
            map(arg, i =>
              store.dispatch(VirtualizationActionTypes.DELETE_PORTGROUP, {
                id: vnetId,
                portGroupName: `${i.port_group_name}`,
              })
            ),
          confirmText: 'Удалить',
          danger: true,
        }),
    }
  }
  return {
    title: 'Удалить',
    icon: <Icon icon='delete' size='small' />,
    onClick: () =>
      withConfirm({
        title: 'Удалить портгруппу',
        text: `Вы действительно хотите удалить портгруппу ${arg.port_group_name}?`,
        onConfirm: () =>
          store.dispatch(VirtualizationActionTypes.DELETE_PORTGROUP, {
            id: vnetId,
            portGroupName: `${arg.port_group_name}`,
          }),
        confirmText: 'Удалить',
        danger: true,
      }),
  }
}

export const VirtualNetworkCardPortgroupTab = defineComponent({
  name: 'VirtualNetworkCardPortgroupTab',
  props: { vnet: { type: Object as PropType<VirtualNetworkResponse>, required: true } },
  render() {
    const useActions: TableActionsHook<PortGroup> = v => {
      const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
      const deletePortGroup = useDeleteAction(arg, this.vnet.id)
      return [deletePortGroup].filter(isNotNullable)
    }
    const tableActions: ButtonProps[] = [
      {
        title: 'Создать',
        icon: { icon: 'plus', size: 'small' },
        modal: <PortGroupCreateModal id={this.vnet.id} />,
      },
    ]

    return (
      <DataTable
        items={this.vnet.port_groups}
        headers={headers}
        tableActions={tableActions}
        itemActions={useActions}
        itemValue='port_group_name'
      />
    )
  },
})
