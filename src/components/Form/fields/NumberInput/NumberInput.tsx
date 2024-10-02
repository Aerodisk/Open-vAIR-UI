import { defineComponent, type PropType, ref } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'
import { InputWrapper } from '../InputWrapper'

export const NumberInput = defineComponent({
  name: 'NumberInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
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
      const v = (event.target as HTMLInputElement).value
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
    const { id, attrs, disabled } = this.context
    const { placeholder } = attrs
    const handlers = { onBlur: this.handleBlur, onFocus: this.handleFocus, onInput: this.handleInput }
    return (
      <InputWrapper>
        <input
          type='number'
          data-type='number'
          class='formkit-input'
          id={id}
          aria-describedby={`help-${id}`}
          placeholder={placeholder}
          disabled={!!disabled}
          value={this.value}
          step='any'
          {...handlers}
        />
      </InputWrapper>
    )
  },
})
