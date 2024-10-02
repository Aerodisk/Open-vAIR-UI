import { defineComponent, type PropType, ref } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

import type { TextFieldType } from '../../types'
import { textTransform } from '../../helpers'
import { InputWrapper } from '../InputWrapper'

export const TextInput = defineComponent({
  name: 'TextInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext & TextFieldType>, required: true } },
  setup(props) {
    return { value: ref(props.context.value) }
  },
  watch: {
    ['context.value'](v) {
      this.value = v
    },
  },
  methods: {
    handleInput(event: Event) {
      if (this.context.disabled) return
      const rawV = (event.target as HTMLInputElement).value
      const v = textTransform(rawV, this.context.textTransform)
      this.value = v
      this.$props.context.node.input(v)
    },
    handleFocus() {
      if (this.context.disabled) return
      this.$props.context.handlers.touch()
    },
    handleBlur() {
      if (this.context.disabled) return
      this.$props.context.handlers.blur()
    },
  },
  render() {
    const { id, attrs, disabled, variant = 'text' } = this.context
    const { placeholder } = attrs
    const handlers = { onBlur: this.handleBlur, onFocus: this.handleFocus, onInput: this.handleInput }
    return (
      <InputWrapper>
        <input
          type={variant}
          data-type='text'
          class='formkit-input'
          id={id}
          aria-describedby={`help-${id}`}
          placeholder={placeholder}
          disabled={!!disabled}
          value={this.value}
          {...handlers}
        />
      </InputWrapper>
    )
  },
})
