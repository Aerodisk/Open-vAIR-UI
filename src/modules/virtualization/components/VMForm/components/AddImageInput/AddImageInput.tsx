import { defineComponent, type PropType } from 'vue'
import { find, map } from 'lodash'
import { type FormKitFrameworkContext } from '@formkit/core'

import type { Image } from '@/api/generated'
import { Button } from '@/components/Button'
import { ModalForm } from '@/components/Modal'

import type { FormDataType, ImageInputValue } from './types'
import { fields } from './fields'
import InputItem from './InputItem.vue'
import { preventDefault } from '@helpers'

const defaults = {
  qos: { iops_read: 500, iops_write: 500, mb_read: 500, mb_write: 500 },
  format: 'qcow2',
  emulation: 'virtio',
} as const

export const AddImageInput = defineComponent({
  name: 'AddImageInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  computed: {
    images(): Image[] {
      return this.$store.state.storage.images
    },
    filteredImages() {
      const imageIds = map(this.value, 'image_id').filter(Boolean)
      return this.images.filter(i => !imageIds.includes(i.id))
    },
    storages() {
      return this.$store.state.storage.storages
    },
    value(): ImageInputValue[] {
      return this.context.value || []
    },
    disabled() {
      return this.context.disabled
    },
  },
  methods: {
    async submit(v: FormDataType) {
      const image = find(this.images, { id: v.image_id })
      if (!image) return
      const itemValue = {
        ...defaults,
        __id: image.id,
        name: image.name,
        image_id: image.id,
        boot_order: 1,
        order: 1,
      }
      this.$props.context.node.input([...this.value, itemValue])
    },
    removeDisk(__id: number) {
      this.$props.context.node.input(this.value.filter(i => i.__id !== __id))
    },
  },
  render() {
    return (
      <div>
        <Button
          title={this.$t('virtualization.vm.form.tabs.images.btnAdd')}
          size='small'
          variant='secondary'
          disabled={!!this.disabled}
          onClick={preventDefault}
        >
          <ModalForm
            title='Добавить виртуальный образ'
            position='top'
            fields={fields(this.storages, this.filteredImages)}
            onSubmit={this.submit}
            submitText={this.$t('add')}
            ignore
          />
        </Button>
        <div class='mt-6'>
          {this.value.map(i => (
            <InputItem imageValue={i} onRemove={this.removeDisk} disabled={!!this.disabled} />
          ))}
        </div>
      </div>
    )
  },
})
