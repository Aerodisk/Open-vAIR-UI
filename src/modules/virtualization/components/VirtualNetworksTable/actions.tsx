import { isArray, map } from 'lodash'

import { isNotNullable } from '@helpers'
import type { VirtualNetworkResponse } from '@api/generated'
import { store } from '@/store'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { ModalForm, useModalOpenState, useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'
import { VirtualizationActionTypes } from '@/store/modules'
import { PortGroupCreateModalForm } from '@/modules/virtualization/components/PortGroupCreateModal'
import { t } from '@/locales'

type VNetAction = TableActionType<VirtualNetworkResponse>
const withConfirm = useWithConfirm()

const tPrefix = 'virtualization.virtualNetworks.actions'

const isTurnedOff = (net: VirtualNetworkResponse) => net.state === 'inactive'
const isTurnedOn = (net: VirtualNetworkResponse) => net.state === 'active'

const useDeleteAction: VNetAction = arg => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: arg.length }),
          itemsList: map(arg, 'network_name') as string[],
          onConfirm: () => map(arg, i => store.dispatch(VirtualizationActionTypes.DELETE_VIRTUAL_NETWORK, i.id)),
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
        title: t(`${tPrefix}.delete.single.title`),
        text: t(`${tPrefix}.delete.single.text`, { name: arg.network_name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.DELETE_VIRTUAL_NETWORK, arg.id),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

const useTurnOnAction: VNetAction = arg => {
  if (isArray(arg)) {
    const nets = arg.filter(isTurnedOff)
    if (!nets.length) return null
    return {
      title: t(`${tPrefix}.turnOn.title`),
      icon: <Icon icon='power' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.turnOn.many.title`),
          text: t(`${tPrefix}.turnOn.many.text`, { count: nets.length }),
          itemsList: map(nets, 'network_name') as string[],
          onConfirm: () => map(nets, i => store.dispatch(VirtualizationActionTypes.TURN_ON_VIRTUAL_NETWORK, i.id)),
          confirmText: t(`${tPrefix}.turnOn.title`),
        }),
    }
  }
  if (!isTurnedOff(arg)) return null
  return {
    title: t(`${tPrefix}.turnOn.title`),
    icon: <Icon icon='power' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.turnOn.single.title`),
        text: t(`${tPrefix}.turnOn.single.text`, { name: arg.network_name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.TURN_ON_VIRTUAL_NETWORK, arg.id),
        confirmText: t(`${tPrefix}.turnOn.title`),
      }),
  }
}

const useTurnOffAction: VNetAction = arg => {
  if (isArray(arg)) {
    const nets = arg.filter(isTurnedOn)
    if (!nets.length) return null
    return {
      title: t(`${tPrefix}.turnOff.title`),
      icon: <Icon icon='powerOff' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.turnOff.many.title`),
          text: t(`${tPrefix}.turnOff.many.text`, { count: nets.length }),
          itemsList: map(nets, 'network_name') as string[],
          onConfirm: () => map(nets, i => store.dispatch(VirtualizationActionTypes.TURN_OFF_VIRTUAL_NETWORK, i.id)),
          confirmText: t(`${tPrefix}.turnOn.title`),
          danger: true,
        }),
    }
  }
  if (!isTurnedOn(arg)) return null
  return {
    title: t(`${tPrefix}.turnOff.title`),
    icon: <Icon icon='powerOff' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.turnOff.single.title`),
        text: t(`${tPrefix}.turnOff.single.text`, { name: arg.network_name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.TURN_OFF_VIRTUAL_NETWORK, arg.id),
        confirmText: t(`${tPrefix}.turnOff.title`),
        danger: true,
      }),
  }
}

const useCreatePortGroupAction: VNetAction = arg => {
  if (isArray(arg)) return null
  const [onClick, props] = useModalOpenState('create_pg' + arg.id)
  return {
    title: t(`${tPrefix}.createPortgroup.title`),
    icon: <Icon icon='plus' size='small' />,
    modal: (
      <PortGroupCreateModalForm
        {...props}
        onSubmit={v =>
          store.dispatch(VirtualizationActionTypes.ADD_PORTGROUP, {
            id: arg.id,
            ...v,
            is_trunk: v.is_trunk ? 'yes' : 'no',
          })
        }
      />
    ),
    onClick,
  }
}

const useDeletePortGroupAction: VNetAction = arg => {
  if (isArray(arg)) return null
  const [onClick, props] = useModalOpenState('delete_pg' + arg.id)
  return {
    title: t(`${tPrefix}.deletePortgroup.title`),
    icon: <Icon icon='minus' size='small' />,
    modal: (
      <ModalForm
        {...props}
        title={t(`${tPrefix}.deletePortgroup.modalTitle`)}
        submitText={t('delete')}
        submitDanger
        onSubmit={v =>
          v.port_groups.map((i: string) =>
            store.dispatch(VirtualizationActionTypes.DELETE_PORTGROUP, { id: arg.id, portGroupName: i })
          )
        }
        fields={[
          {
            type: 'table',
            name: 'port_groups',
            items: arg.port_groups,
            itemValue: 'port_group_name',
            headers: [
              { key: 'port_group_name', title: t(`${tPrefix}.deletePortgroup.portgroup.name`) },
              { key: 'is_trunk', title: t(`${tPrefix}.deletePortgroup.portgroup.isTrunk`) },
              { key: 'tags', title: t(`${tPrefix}.deletePortgroup.portgroup.tags`), valueRender: v => v?.join(', ') },
            ],
          },
        ]}
      />
    ),
    onClick,
  }
}

export const useActions: TableActionsHook<VirtualNetworkResponse> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const createPortGroup = useCreatePortGroupAction(arg)
  const deletePortGroup = useDeletePortGroupAction(arg)
  const turnOnAction = useTurnOnAction(arg)
  const turnOffAction = useTurnOffAction(arg)
  const deleteAction = useDeleteAction(arg)

  return [createPortGroup, deletePortGroup, turnOnAction, turnOffAction, deleteAction].filter(isNotNullable)
}
