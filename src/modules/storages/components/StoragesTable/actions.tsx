import { isArray, map } from 'lodash'

import { isNotNullable } from '@helpers'
import type { Storage } from '@api/generated'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'
import { StorageActionTypes, store } from '@/store'
import { t } from '@/locales'

type StorageAction = TableActionType<Storage>
const withConfirm = useWithConfirm()

const tPrefix = 'storages.actions'

const useDeleteAction: StorageAction = arg => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: arg.length }),
          itemsList: map(arg, 'name'),
          onConfirm: () => map(arg, i => store.dispatch(StorageActionTypes.DELETE_STORAGE, i.id)),
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
        text: t(`${tPrefix}.delete.single.text`, { name: arg.name }),
        onConfirm: () => store.dispatch(StorageActionTypes.DELETE_STORAGE, arg.id),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

export const useActions: TableActionsHook<Storage> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const deleteAction = useDeleteAction(arg)

  return [deleteAction].filter(isNotNullable)
}
