import { isArray, map, pick } from 'lodash'

import { isNotNullable } from '@helpers'
import { BlockDevicesActionTypes, store } from '@/store'
import type { Session } from '@/store/modules/blockDevices/state'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { Icon } from '@/components/Icon'
import { useWithConfirm } from '@/components/Modal'
import { t } from '@/locales'

type InterfaceAction = TableActionType<Session>

const withConfirm = useWithConfirm()

const tPrefix = 'blockDevices.actions'

const useLogoutAction: InterfaceAction = arg => {
  if (isArray(arg)) {
    return {
      title: t(`${tPrefix}.logout.title`),
      icon: <Icon icon='logout' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.logout.many.title`),
          text: t(`${tPrefix}.logout.many.text`, { count: arg.length }),
          itemsList: map(arg, i => `${i.inf_type} ${i.ip}`),
          confirmText: t(`${tPrefix}.logout.title`),
          danger: true,
          onConfirm: () =>
            map(arg, i => store.dispatch(BlockDevicesActionTypes.LOGOUT_SESSION, pick(i, ['inf_type', 'ip']))),
        }),
    }
  }
  return {
    title: t(`${tPrefix}.logout.title`),
    icon: <Icon icon='logout' size='small' />,
    onClick: () =>
      withConfirm({
        title: t(`${tPrefix}.logout.single.title`),
        text: t(`${tPrefix}.logout.single.text`, { name: `${arg.inf_type} ${arg.ip}` }),
        confirmText: t(`${tPrefix}.logout.title`),
        danger: true,
        onConfirm: () => store.dispatch(BlockDevicesActionTypes.LOGOUT_SESSION, pick(arg, ['inf_type', 'ip'])),
      }),
  }
}

export const useActions: TableActionsHook<Session> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const logoutAction = useLogoutAction(arg)

  return [logoutAction].filter(isNotNullable)
}
