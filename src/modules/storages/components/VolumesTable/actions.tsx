import { isArray, map } from 'lodash'

import { bytesToSize, isNotNullable } from '@helpers'
import type { Volume } from '@api/generated'
import { StorageActionTypes, store } from '@/store'
import { t } from '@/locales'

import type { TableActionsHook, TableActionType } from '@/components/DataTable'
import { ModalForm, useModalOpenState, useWithConfirm } from '@/components/Modal'
import { Icon } from '@/components/Icon'

type VolumeAction = TableActionType<Volume>
const withConfirm = useWithConfirm()

const tPrefix = 'storages.disks.actions'

const useDeleteAction: VolumeAction = arg => {
  if (isArray(arg)) {
    return {
      title: t('delete'),
      icon: <Icon icon='delete' size='small' />,
      onClick: () =>
        withConfirm({
          title: t(`${tPrefix}.delete.many.title`),
          text: t(`${tPrefix}.delete.many.text`, { count: arg.length }),
          itemsList: map(arg, 'name'),
          onConfirm: () => map(arg, i => store.dispatch(StorageActionTypes.DELETE_VOLUME, i.id)),
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
        onConfirm: () => store.dispatch(StorageActionTypes.DELETE_VOLUME, arg.id),
        confirmText: t('delete'),
        danger: true,
      }),
  }
}

const useExtendAction: VolumeAction = arg => {
  if (isArray(arg)) return null
  const [onClick, p] = useModalOpenState('disk_resize' + arg.id)

  const storage = store.state.storage.storages.find(i => i.id === arg.storage_id)
  if (!storage) return null

  const maxSize = storage ? storage.available : 0
  const minSize = Number(arg.size)

  return {
    title: t(`${tPrefix}.extend.title`),
    icon: <Icon icon='resize' size='small' />,
    onClick,
    modal: (
      <ModalForm
        {...p}
        title={t(`${tPrefix}.extend.formTitle`)}
        submitText={t(`${tPrefix}.extend.submitText`)}
        onSubmit={v => store.dispatch(StorageActionTypes.EXTEND_VOLUME, { volumeId: arg.id, new_size: v.size })}
        hint={{ text: t(`${tPrefix}.extend.formHint`, { name: arg.name }) }}
        initials={{ size: minSize }}
        isExist={{ actions: [StorageActionTypes.GET_STORAGE_LIST] }}
        fields={[
          {
            type: 'size',
            name: 'size',
            label: t(`${tPrefix}.extend.formInput.label`),
            allowed: ['M', 'G', 'T'],
            validation: 'minSize|maxSize',
            validationRules: {
              maxSize: node => Number(node.value) <= Number(maxSize),
              minSize: node => Number(node.value) >= minSize,
            },
            validationMessages: {
              maxSize: () =>
                t(`${tPrefix}.extend.formInput.validationMessages.maxSize`, { size: bytesToSize(maxSize) }),
              minSize: () =>
                t(`${tPrefix}.extend.formInput.validationMessages.minSize`, { size: bytesToSize(minSize) }),
            },
          },
        ]}
      />
    ),
  }
}

const useEditAction: VolumeAction = arg => {
  if (isArray(arg)) return null
  const [onClick, p] = useModalOpenState('disk_edit' + arg.id)
  return {
    title: t(`${tPrefix}.edit.title`),
    icon: <Icon icon='pencil' size='small' />,
    onClick,
    modal: (
      <ModalForm
        {...p}
        title={t(`${tPrefix}.edit.formTitle`)}
        hint={{ text: t(`${tPrefix}.edit.formHint`, { name: arg.name }) }}
        submitText={t('save')}
        onSubmit={v => store.dispatch(StorageActionTypes.EDIT_VOLUME, { volumeId: arg.id, ...v })}
        initials={{ name: arg.name || '', description: arg.description || '', read_only: !!arg.read_only }}
        fields={[
          {
            type: 'text',
            name: 'name',
            label: t(`storages.disks.actions.create.fields.name.label`),
            placeholder: t(`storages.disks.actions.create.fields.name.placeholder`),
            validation: 'required|length:2,45|name',
          },
          {
            type: 'textarea',
            name: 'description',
            label: t(`storages.disks.actions.create.fields.description.label`),
            placeholder: t(`storages.disks.actions.create.fields.description.placeholder`),
            validation: 'length:0,255',
            minRows: 2,
          },
          {
            type: 'checkbox',
            name: 'read_only',
            label: t(`storages.disks.actions.create.fields.read_only.label`),
            style: { marginTop: '8px' },
          },
        ]}
      />
    ),
  }
}

export const useActions: TableActionsHook<Volume> = v => {
  const arg = isArray(v) ? (v.length === 1 ? v[0] : v) : v
  const deleteAction = useDeleteAction(arg)
  const extendAction = useExtendAction(arg)
  const editAction = useEditAction(arg)

  return [editAction, extendAction, deleteAction].filter(isNotNullable)
}
