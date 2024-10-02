import { onUnmounted, ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'

import { StorageActionTypes, store } from '@/store'
import { chain } from 'lodash'

type FormDataType = {
  image: File[]
  name: string
  storageId: string
  description: string
}

export const useSubmit = () => {
  const reqController = ref<AbortController | null>(null)
  const uploading = ref(false)
  const progress = ref(0)

  const abortUpload = () => {
    reqController.value?.abort()
    uploading.value = false
    progress.value = 0
  }
  onUnmounted(abortUpload)

  const submit = (v: FormDataType) => {
    reqController.value?.abort()
    reqController.value = new AbortController()

    const progressHandlers: Pick<AxiosRequestConfig<unknown>, 'signal' | 'onUploadProgress' | 'onDownloadProgress'> = {
      signal: reqController.value.signal,
      onUploadProgress: e => {
        uploading.value = true
        progress.value = (e?.progress || 0) * 100
      },
      onDownloadProgress: () => (uploading.value = false),
    }

    return store.dispatch(StorageActionTypes.UPLOAD_IMAGE, {
      ...v,
      name: v.name + '.' + chain(v.image[0].name).split('.').takeRight().value(),
      image: v.image[0],
      ...progressHandlers,
    })
  }

  return { submit, uploading, progress, abortUpload }
}
