import { filter, isArray, map } from 'lodash'

import { isNotNullable } from '@helpers'
import type { VirtualMachineInfo } from '@api/generated'
import { store } from '@/store'
import { t } from '@/locales'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'
import { VirtualizationActionTypes } from '@/store/modules'
import { router } from '@/router'
import { getVmEditPath } from '@/modules/virtualization/utils'

const tPrefix = 'virtualization.vm.actions'

type VMAction = TableActionType<VirtualMachineInfo>
const withConfirm = useWithConfirm()

const isVmOn = (vm: VirtualMachineInfo) => vm.power_state !== 'shut_off'
const isVmOff = (vm: VirtualMachineInfo) => vm.power_state === 'shut_off'
const isVmBlockedForActions = (vm: VirtualMachineInfo) => vm.status === 'starting' || vm.status === 'shut_offing'

const useShutOffAction: VMAction = arg => {
  if (isArray(arg)) {
    const vms = filter(arg, vm => isVmOn(vm) && !isVmBlockedForActions(vm))
    if (!vms.length) return null
    return {
      title: t(`${tPrefix}.shutOff.title`),
      icon: <Icon icon='powerOff' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.shutOff.many.title`),
          text: t(`${tPrefix}.shutOff.many.text`, { count: vms.length }),
          itemsList: map(vms, 'name'),
          onConfirm: () => map(vms, i => store.dispatch(VirtualizationActionTypes.SHUT_OFF_VM, i.id)),
          confirmText: t(`${tPrefix}.shutOff.title`),
          danger: true,
        }),
    }
  }
  if (isVmOff(arg) || isVmBlockedForActions(arg)) return null
  return {
    title: t(`${tPrefix}.shutOff.title`),
    icon: <Icon icon='powerOff' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.shutOff.single.title`),
        text: t(`${tPrefix}.shutOff.single.text`, { name: arg.name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.SHUT_OFF_VM, arg.id),
        confirmText: t(`${tPrefix}.shutOff.title`),
        danger: true,
      }),
  }
}

const useStartAction: VMAction = arg => {
  if (isArray(arg)) {
    const vms = filter(arg, vm => isVmOff(vm) && !isVmBlockedForActions(vm))
    if (!vms.length) return null
    return {
      title: t('run'),
      icon: <Icon icon='power' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.start.many.title`),
          text: t(`${tPrefix}.start.many.text`, { count: vms.length }),
          itemsList: map(vms, 'name'),
          onConfirm: () => map(vms, i => store.dispatch(VirtualizationActionTypes.START_VM, i.id)),
          confirmText: t('run'),
        }),
    }
  }
  if (isVmOn(arg) || isVmBlockedForActions(arg)) return null
  return {
    title: t('run'),
    icon: <Icon icon='power' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.start.single.title`),
        text: t(`${tPrefix}.start.single.text`, { name: arg.name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.START_VM, arg.id),
        confirmText: t('run'),
      }),
  }
}

const useVNCAction: VMAction = arg => {
  if (isArray(arg)) {
    const vms = filter(arg, vm => isVmOn(vm) && !isVmBlockedForActions(vm))
    if (!vms.length) return null
    return {
      title: t(`${tPrefix}.vnc`),
      icon: <Icon icon='console' size='small' />,
      onClick: () => vms.map(i => store.dispatch(VirtualizationActionTypes.OPEN_VNC_VM, i.id)),
    }
  }
  if (isVmOff(arg) || isVmBlockedForActions(arg)) return null
  return {
    title: t(`${tPrefix}.vnc`),
    icon: <Icon icon='console' size='small' />,
    onClick: () => store.dispatch(VirtualizationActionTypes.OPEN_VNC_VM, arg.id),
  }
}

const useDeleteAction: VMAction = arg => {
  if (isArray(arg)) {
    const vms = filter(arg, vm => isVmOff(vm) && !isVmBlockedForActions(vm))
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: vms.length }),
          itemsList: map(vms, 'name'),
          onConfirm: () => map(vms, i => store.dispatch(VirtualizationActionTypes.DELETE_VM, i.id)),
          confirmText: t('delete'),
          danger: true,
        }),
    }
  }
  if (isVmOn(arg) || isVmBlockedForActions(arg)) return null
  return {
    title: t('delete'),
    icon: <Icon icon='delete' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.delete.single.title`),
        text: t(`${tPrefix}.delete.single.text`, { name: arg.name }),
        onConfirm: () => store.dispatch(VirtualizationActionTypes.DELETE_VM, arg.id),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

const useEditAction: VMAction = arg => {
  if (isArray(arg) || isVmOn(arg) || isVmBlockedForActions(arg)) return null
  return {
    title: t(`${tPrefix}.edit`),
    onClick: () => router.push(getVmEditPath(arg.id)),
    icon: <Icon icon='pencil' size='small' />,
  }
}

export const useActions: TableActionsHook<VirtualMachineInfo> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const vncAction = useVNCAction(arg)
  const startAction = useStartAction(arg)
  const shutOffAction = useShutOffAction(arg)
  const deleteAction = useDeleteAction(arg)
  const editAction = useEditAction(arg)

  return [editAction, vncAction, startAction, shutOffAction, deleteAction].filter(isNotNullable)
}
