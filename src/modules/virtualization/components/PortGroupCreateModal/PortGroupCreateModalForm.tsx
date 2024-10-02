import { defineComponent, type PropType } from 'vue'

import { ModalForm } from '@/components/Modal'

import { fields } from './fields'
import type { FormDataType } from './types'

const tPrefix = 'virtualization.virtualNetworks.actions.createPortgroup'

export const PortGroupCreateModalForm = defineComponent({
  name: 'PortGroupCreateModalForm',
  props: {
    onSubmit: Function as PropType<(v: FormDataType) => void>,
    ignore: Boolean,
    modelValue: { type: Boolean, default: undefined },
  },
  emits: ['update:modelValue'],
  render() {
    return (
      <ModalForm
        title={this.$t(`${tPrefix}.modalTitle`)}
        fields={fields()}
        submitText={this.$t(`${tPrefix}.submitText`)}
        onSubmit={this.onSubmit}
        ignore={this.ignore}
        modelValue={this.modelValue}
        onUpdate:modelValue={v => this.$emit('update:modelValue', v)}
      />
    )
  },
})
