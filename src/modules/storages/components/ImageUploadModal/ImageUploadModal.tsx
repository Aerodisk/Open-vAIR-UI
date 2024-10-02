import { defineComponent } from 'vue'
import { chain, isFunction, map } from 'lodash'

import { StorageActionTypes } from '@/store'
import { bytesToSize, bytesToUnit } from '@helpers'
import type { Image, Storage } from '@/api/generated'

import { UploadImageIcon } from '@icons/form'
import { ModalForm } from '@/components/Modal'
import type { FieldsPropType } from '@/components/Form'
import { getFormValues } from '@/components/Form/helpers'
import { t } from '@/locales'

import { useSubmit } from './utils'
import { UploadingProgress } from './UploadingProgress'

const tPrefix = 'storages.images.actions.upload'

const fields = (storages: Storage[], images: Image[]): FieldsPropType => [
  {
    type: 'file',
    name: 'image',
    icon: () => <UploadImageIcon />,
    texts: {
      buttonText: t(`${tPrefix}.fields.image.buttonText`),
      dropzone: t(`${tPrefix}.fields.image.dropzone`),
      notSelected: t(`${tPrefix}.fields.image.notSelected`),
    },
    accept: '.iso,.vfd',
    validation: 'required',
  },
  {
    type: 'text',
    name: 'name',
    label: t(`${tPrefix}.fields.name.label`),
    placeholder: t(`${tPrefix}.fields.name.placeholder`),
    validation: 'required|length:2,45|takenName|name',
    validationRules: { takenName: n => !map(images, 'name').includes(n.value as string) },
    validationMessages: { takenName: t(`${tPrefix}.fields.name.validationTaken`) },
    watch: (v, oldV, n) => {
      if (!v.image?.[0] || oldV.image?.[0] === v.image?.[0]) return
      const filename = chain(v.image[0].name).split('.').dropRight().join('.').value()
      n.input(filename)
    },
  },
  {
    type: 'textarea',
    name: 'description',
    label: t(`${tPrefix}.fields.description.label`),
    placeholder: t(`${tPrefix}.fields.description.placeholder`),
    validation: 'length:0,255',
    minRows: 2,
    style: { marginTop: '4px' },
  },
  {
    type: 'select',
    name: 'storageId',
    label: t(`${tPrefix}.fields.storageId.label`),
    placeholder: t(`${tPrefix}.fields.storageId.placeholder`),
    validation: 'required|availSize',
    options: () =>
      storages.map(i => {
        const exactUnit = bytesToUnit(i.size)
        return {
          label: `${i.storage_type.toUpperCase()} | 
            ${i.name} | 
            ${bytesToSize(i.size - i.available, { exactUnit, withoutUnit: true })}/${bytesToSize(i.size, {
            exactUnit,
          })}`,
          value: i.id,
        }
      }),
    validationRules: {
      availSize: node => {
        const imageValue = getFormValues(node).image
        const fileSize = isFunction(imageValue) ? imageValue()?.files[0]?.size : null
        const storage = storages.find(i => i.id === node.value)
        if (!storage || !fileSize) return true

        return storage.available > fileSize
      },
    },
    validationMessages: { availSize: () => t(`${tPrefix}.fields.storageId.validationMessage`) },
  },
]

export const ImageUploadModal = defineComponent({
  name: 'ImageUploadModal',
  setup() {
    const { submit, uploading, progress, abortUpload } = useSubmit()
    return { submit, uploading, progress, abortUpload }
  },
  computed: {
    storages() {
      return this.$store.state.storage.storages
    },
    images() {
      return this.$store.state.storage.images
    },
  },
  render() {
    return (
      <ModalForm
        title={this.$t(`${tPrefix}.modalTitle`)}
        submitText={this.$t(`${tPrefix}.title`)}
        onSubmit={this.submit}
        fields={fields(this.storages, this.images)}
        isExist={{ actions: [StorageActionTypes.GET_STORAGE_LIST, StorageActionTypes.GET_IMAGE_LIST] }}
        onUpdate:modelValue={v => (!v ? this.abortUpload() : null)}
      >
        {{ rightActionsExtra: () => <UploadingProgress uploading={this.uploading} progress={this.progress} /> }}
      </ModalForm>
    )
  },
})
