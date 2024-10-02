import type { ActionTree } from 'vuex'
import type { AxiosRequestConfig } from 'axios'

import { api } from '@api'
import type {
  CreateStorage,
  CreateVolume,
  EditVolume,
  ExtendVolume,
  ImageApiUploadImageImagesUploadPostRequest,
} from '@api/generated'
import type { AugmentedActionContext, RootState } from '@/store/types'
import { pullItem } from '@/store/utils'

import type { State } from './state'
import { StorageMutationTypes as MT } from './mutationTypes'
import { StorageActionTypes as AT } from './actionTypes'

type ActionContext = AugmentedActionContext<State>

export type Actions = {
  // STORAGE
  [AT.GET_STORAGE_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_STORAGE](c: ActionContext, payload: CreateStorage): Promise<unknown>
  [AT.DELETE_STORAGE](c: ActionContext, storageId: string): Promise<unknown>

  // VOLUME
  [AT.GET_VOLUME_LIST](c: ActionContext): Promise<unknown>
  [AT.CREATE_VOLUME](c: ActionContext, payload: CreateVolume): Promise<unknown>
  [AT.EXTEND_VOLUME](c: ActionContext, payload: ExtendVolume & { volumeId: string }): Promise<unknown>
  [AT.EDIT_VOLUME](c: ActionContext, payload: EditVolume & { volumeId: string }): Promise<unknown>
  [AT.DELETE_VOLUME](c: ActionContext, volumeId: string): Promise<unknown>

  // IMAGE
  [AT.GET_IMAGE_LIST](c: ActionContext): Promise<unknown>
  [AT.UPLOAD_IMAGE](
    c: ActionContext,
    payload: ImageApiUploadImageImagesUploadPostRequest &
      Pick<AxiosRequestConfig<unknown>, 'signal' | 'onUploadProgress' | 'onDownloadProgress'>
  ): Promise<unknown>
  [AT.DELETE_IMAGE](c: ActionContext, imageId: string): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // STORAGE
  [AT.GET_STORAGE_LIST]: async ({ commit }) => {
    const { data } = await api.storage.getStoragesStoragesGet()
    commit(MT.SET_STORAGE_LIST, data.items)
  },
  [AT.CREATE_STORAGE]: async ({ commit }, createStorage) => {
    const { data } = await api.storage.createStorageStoragesCreatePost({ createStorage })
    commit(MT.SET_STORAGE_ITEM, data)
    pullItem(
      data,
      id => api.storage.getStorageStoragesStorageIdGet({ storageId: id }),
      i => commit(MT.SET_STORAGE_ITEM, i)
    )
  },
  [AT.DELETE_STORAGE]: async ({ commit }, storageId) => {
    const { data } = await api.storage.deleteStorageStoragesStorageIdDeleteDelete({ storageId })
    commit(MT.SET_STORAGE_ITEM, data)
    pullItem(data, id => api.storage.getStorageStoragesStorageIdGet({ storageId: id })).then(() =>
      commit(MT.DELETE_STORAGE_ITEM, storageId)
    )
  },

  // VOLUME
  [AT.GET_VOLUME_LIST]: async ({ commit }) => {
    const { data } = await api.volume.getVolumesVolumesGet()
    commit(MT.SET_VOLUME_LIST, data.items)
  },
  [AT.CREATE_VOLUME]: async ({ commit }, createVolume) => {
    const { data } = await api.volume.createVolumeVolumesCreatePost({ createVolume })
    commit(MT.SET_VOLUME_ITEM, data)
    pullItem(
      data,
      id => api.volume.getVolumeVolumesVolumeIdGet({ volumeId: id }),
      i => commit(MT.SET_VOLUME_ITEM, i)
    )
  },
  [AT.EXTEND_VOLUME]: async ({ commit }, { volumeId, ...extendVolume }) => {
    const { data } = await api.volume.extendVolumeVolumesVolumeIdExtendPost({ volumeId, extendVolume })
    commit(MT.SET_VOLUME_ITEM, data)
    pullItem(
      data,
      id => api.volume.getVolumeVolumesVolumeIdGet({ volumeId: id }),
      i => commit(MT.SET_VOLUME_ITEM, i)
    )
  },
  [AT.EDIT_VOLUME]: async ({ commit }, { volumeId, ...editVolume }) => {
    const { data } = await api.volume.editVolumeVolumesVolumeIdEditPut({ volumeId, editVolume })
    commit(MT.SET_VOLUME_ITEM, data)
    pullItem(
      data,
      id => api.volume.getVolumeVolumesVolumeIdGet({ volumeId: id }),
      i => commit(MT.SET_VOLUME_ITEM, i)
    )
  },
  [AT.DELETE_VOLUME]: async ({ commit }, volumeId) => {
    const { data } = await api.volume.deleteVolumeVolumesVolumeIdDelete({ volumeId })
    commit(MT.SET_VOLUME_ITEM, data)
    pullItem(data, id => api.volume.getVolumeVolumesVolumeIdGet({ volumeId: id })).then(() =>
      commit(MT.DELETE_VOLUME_ITEM, volumeId)
    )
  },

  // IMAGE
  [AT.GET_IMAGE_LIST]: async ({ commit }) => {
    const { data } = await api.image.getImagesImagesGet()
    commit(MT.SET_IMAGE_LIST, data.items)
  },
  [AT.UPLOAD_IMAGE]: async ({ commit }, { signal, onUploadProgress, onDownloadProgress, ...payload }) => {
    const { data } = await api.image.uploadImageImagesUploadPost(payload, {
      signal,
      onUploadProgress,
      onDownloadProgress,
    })
    commit(MT.SET_IMAGE_ITEM, data)
    pullItem(
      data,
      id => api.image.getImageImagesImageIdGet({ imageId: id }),
      i => commit(MT.SET_IMAGE_ITEM, i)
    )
  },
  [AT.DELETE_IMAGE]: async ({ commit }, imageId) => {
    const { data } = await api.image.deleteImageImagesImageIdDelete({ imageId })
    commit(MT.SET_IMAGE_ITEM, data)
    pullItem(data, id => api.image.getImageImagesImageIdGet({ imageId: id })).then(() =>
      commit(MT.DELETE_IMAGE_ITEM, imageId)
    )
  },
}
