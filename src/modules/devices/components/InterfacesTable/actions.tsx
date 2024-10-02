import { isArray, map } from 'lodash'

import { t } from '@/locales'
import { isNotNullable } from '@helpers'
import { DevicesActionTypes, store } from '@/store'
import type { Interface } from '@/store/modules/devices/state'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { Icon } from '@/components/Icon'
import { useWithConfirm } from '@/components/Modal'

type InterfaceAction = TableActionType<Interface>

const tPrefix = 'devices.networkAdapters.actions'

const withConfirm = useWithConfirm()

const isIfaceUp = (iface: Interface) => iface.power_state === 'UP'
const isIfaceDown = (iface: Interface) => iface.power_state === 'DOWN'

const useDeleteAction: InterfaceAction = arg => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: arg.length }),
          itemsList: map(arg, 'name'),
          danger: true,
          confirmText: t('delete'),
          onConfirm: () => store.dispatch(DevicesActionTypes.DELETE_BRIDGE, arg),
        }),
    }
  }
  return {
    title: t('delete'),
    icon: <Icon icon='delete' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.delete.single.title`),
        text: t(`${tPrefix}.delete.single.text`, { name: arg.name }),
        confirmText: t('delete'),
        danger: true,
        onConfirm: () => store.dispatch(DevicesActionTypes.DELETE_BRIDGE, [arg]),
      }),
  }
}

const useIfaceUpAction: InterfaceAction = arg => {
  if (isArray(arg)) {
    const ifaces = arg.filter(i => i.power_state !== 'UP')
    return {
      title: t(`${tPrefix}.turnOn.confirm`),
      icon: <Icon icon='power' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.turnOn.many.title`),
          text: t(`${tPrefix}.turnOn.many.text`, { count: ifaces.length }),
          itemsList: map(ifaces, 'name'),
          confirmText: t(`${tPrefix}.turnOn.confirm`),
          onConfirm: () => map(ifaces, i => store.dispatch(DevicesActionTypes.TURN_ON_INTERFACE, i.name)),
        }),
    }
  }
  if (isIfaceUp(arg)) return null
  return {
    title: t(`${tPrefix}.turnOn.confirm`),
    icon: <Icon icon='power' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.turnOn.single.title`),
        text: t(`${tPrefix}.turnOn.single.text`, { name: arg.name }),
        confirmText: t(`${tPrefix}.turnOn.confirm`),
        onConfirm: () => store.dispatch(DevicesActionTypes.TURN_ON_INTERFACE, arg.name),
      }),
  }
}

const useIfaceDownAction: InterfaceAction = arg => {
  if (isArray(arg)) {
    const ifaces = arg.filter(i => i.power_state !== 'DOWN')
    return {
      title: t(`${tPrefix}.turnOff.confirm`),
      icon: <Icon icon='power' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.turnOff.many.title`),
          text: t(`${tPrefix}.turnOff.many.text`, { count: ifaces.length }),
          itemsList: map(ifaces, 'name'),
          confirmText: t(`${tPrefix}.turnOff.confirm`),
          danger: true,
          onConfirm: () => map(ifaces, i => store.dispatch(DevicesActionTypes.TURN_OFF_INTERFACE, i.name)),
        }),
    }
  }
  if (isIfaceDown(arg)) return null
  return {
    title: t(`${tPrefix}.turnOff.confirm`),
    icon: <Icon icon='power' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.turnOff.single.title`),
        text: t(`${tPrefix}.turnOff.single.text`, { name: arg.name }),
        confirmText: t(`${tPrefix}.turnOff.confirm`),
        danger: true,
        onConfirm: () => store.dispatch(DevicesActionTypes.TURN_OFF_INTERFACE, arg.name),
      }),
  }
}

export const useActions: TableActionsHook<Interface> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const turnUpAction = useIfaceUpAction(arg)
  const turnDownAction = useIfaceDownAction(arg)
  const deleteAction = useDeleteAction(arg)

  return [turnUpAction, turnDownAction, deleteAction].filter(isNotNullable)
}
