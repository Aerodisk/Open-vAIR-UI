import { isArray, map } from 'lodash'

import { isNotNullable } from '@helpers'
import type { Image } from '@api/generated'
import { StorageActionTypes, store } from '@/store'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'
import { t } from '@/locales'

type ImageAction = TableActionType<Image>
const withConfirm = useWithConfirm()
const tPrefix = 'storages.images.actions'

const useDeleteAction: ImageAction = arg => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: arg.length }),
          itemsList: map(arg, 'name'),
          onConfirm: () => map(arg, i => store.dispatch(StorageActionTypes.DELETE_IMAGE, i.id)),
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
        onConfirm: () => store.dispatch(StorageActionTypes.DELETE_IMAGE, arg.id),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

export const useActions: TableActionsHook<Image> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const deleteAction = useDeleteAction(arg)

  return [deleteAction].filter(isNotNullable)
}
