import { defineComponent, ref, type PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'
import { concat, isArray, map, uniq } from 'lodash'
import { compose } from 'lodash/fp'
import { useDropzone } from 'vue3-dropzone'
import { axiosInstance } from '@api/axios'

import { t } from '@/locales'
import { preventDefault, stopPropagation } from '@helpers'
import { UploadFileIcon } from '@icons/form'
import type { FileFieldType } from '@/components/Form/types'
import { Button } from '@/components/Button'

import { InputWrapper } from '../InputWrapper'

export const FileInput = defineComponent({
  name: 'FileInput',
  props: {
    context: {
      type: Object as PropType<FormKitFrameworkContext & FileFieldType>,
      required: true,
    },
  },
  setup(props) {
    const reqController = ref<AbortController | null>(null)
    const uploading = ref(false)
    const progress = ref(0)
    const handleInput = (files: File[]) => {
      if (props.context.disabled || !files?.length) return

      if (!props.context.uploadUrl) return props.context.node.input(Array.from(files))

      const promise = new Promise(async (resolve, reject) => {
        reqController.value?.abort()
        reqController.value = new AbortController()
        const formData = new FormData()
        Array.from(files).forEach(file => formData.append('file', file, file.name))

        try {
          const res = await axiosInstance.post(`${props.context.uploadUrl}`, formData, {
            signal: reqController.value.signal,
            headers: { 'Content-Type': 'multipart/form-data' },
            // onUploadProgress: event => {
            //   uploading.value = true
            //   progress.value = (event?.progress || 0) * 100
            // },
            // onDownloadProgress: () => (uploading.value = false),
          })
          resolve(res.data.data)
        } catch (err) {
          await props.context.node.input([])
          props.context.node.setErrors([t('form.fileInput.errors.uploadError')])
          reject()
        }
      })

      props.context.node.input([
        () => promise,
        Array.from(files),
        () => ({ uploading, progress, controller: reqController.value }),
      ])
    }

    const handleBlur = () => {
      if (props.context.disabled) return
      props.context.handlers.blur()
    }

    const onDrop = (acceptFiles: File[]) => handleInput(acceptFiles)

    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
      onFileDialogCancel: handleBlur,
      accept: props.context.accept,
    })
    return {
      getRootProps,
      getInputProps,
      ...rest,
      uploading,
      progress,
      handleBlur,
      reqController,
    }
  },
  computed: {
    texts() {
      return this.$props.context.texts
    },
    value() {
      return this.$props.context.value
    },
    disabled(): boolean {
      return !!this.$props.context.disabled
    },
  },
  watch: {
    fileRejections(v) {
      this.context.node.clearErrors()
      const errors: string[] = uniq(map(concat(...map(v, 'errors')), 'code'))
      if (errors.length) this.context.node.setErrors(map(errors, i => this.$t(`form.fileInput.errors.${i}`)))
    },
  },
  methods: {
    handleFocus() {
      if (this.disabled) return
      this.$props.context.handlers.touch()
    },
  },
  beforeUnmount() {
    if (!this.context.preventAbortRequestBeforeUnmount) this.reqController?.abort()
  },
  render() {
    const fileNames = this.value[1]
      ? this.value[1].map((i: File) => i.name).join('')
      : isArray(this.value)
      ? this.value.map((i: File) => i.name).join('')
      : this.value.name
    const openFileManager = () => this.open?.()
    const Icon = this.context.icon || UploadFileIcon

    return (
      <div>
        <InputWrapper>
          <div class='d-flex align-center mb-4'>
            <Button
              title={this.texts?.buttonText || this.$t('formkit.inputs.file.selectFile')}
              variant='secondary'
              color='primary'
              size='small'
              onClick={compose(openFileManager, stopPropagation, preventDefault)}
              class='mr-4'
              disabled={this.disabled}
            />
            {/*{fileNames*/}
            {/*  ? fileNames + ` - ${Math.trunc(this.progress)}%`*/}
            {/*  : this.texts?.notSelected || this.$t('formkit.inputs.file.notSelected')}*/}
            {fileNames ? fileNames : this.texts?.notSelected || this.$t('formkit.inputs.file.notSelected')}
          </div>
          {/*<VProgressLinear modelValue={this.progress} color='primary' height='12' class='formkit-file-loader mb-4' />*/}
          <div
            {...this.getRootProps()}
            class={`formkit-file-dropzone mb-4${this.isDragActive ? ' _active' : ''}${
              this.disabled ? ' _disabled' : ''
            }`}
          >
            <div class='d-flex justify-center align-center h-100'>
              <Icon />
              <div class='ml-2'>{this.texts?.dropzone || this.$t('formkit.inputs.file.dropzone')}</div>
            </div>
            <input {...this.getInputProps()} />
          </div>
        </InputWrapper>
      </div>
    )
  },
})
