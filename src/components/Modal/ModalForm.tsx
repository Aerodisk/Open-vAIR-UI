import { defineComponent, type PropType, type Ref } from 'vue'

import Form, { type FieldsPropType } from '@/components/Form'
import type { FormHintType } from '@/components/Form/types'
import { IsExistsHoc, type IsExistsHocProps } from '@/components/IsExistsHoc'

import Modal from './Modal.vue'

export const ModalForm = defineComponent({
  name: 'ModalForm',
  emits: ['submit', 'update:modelValue'],
  props: {
    position: String as PropType<'top' | 'center'>,
    title: String,
    initials: Object as PropType<object>,
    fields: {
      type: [Array, Object] as PropType<FieldsPropType>,
      required: true,
    },
    hint: [Object, Function] as PropType<FormHintType | ((v: Record<string, unknown>) => FormHintType | null)>,
    submitText: String,
    submitDanger: Boolean,
    onSubmit: Function,
    modelValue: {
      type: [Boolean, Object] as PropType<boolean | undefined | null | Ref<boolean>>,
      default: null,
    },
    preventCloseAfterSubmit: Boolean,
    formId: String,
    disableEqualInitialsReset: Boolean,
    isExist: Object as PropType<IsExistsHocProps>,
    ignore: Boolean,
  },
  methods: {
    async submit(data: unknown, callback: Function) {
      this.onSubmit ? await this.onSubmit?.(data, callback) : this.$emit('submit', data)
      if (!this.preventCloseAfterSubmit) callback()
    },
  },
  render() {
    return (
      <Modal
        title={this.title}
        modelValue={this.modelValue}
        onUpdate:modelValue={e => this.$emit('update:modelValue', e)}
        position={this.position}
      >
        {{
          default: ({ closeModal }: { closeModal: () => void }) => {
            const content = (
              <Form
                fields={this.fields}
                initials={this.initials}
                onSubmit={e => this.submit(e, closeModal)}
                hint={this.hint}
                submitText={this.submitText}
                submitDanger={this.submitDanger}
                formId={this.formId}
                disableEqualInitialsReset={this.disableEqualInitialsReset}
                ignore={this.ignore}
                onReset={closeModal}
              >
                {{ ...this.$slots }}
              </Form>
            )

            return this.isExist ? <IsExistsHoc {...this.isExist}>{content}</IsExistsHoc> : content
          },
        }}
      </Modal>
    )
  },
})
