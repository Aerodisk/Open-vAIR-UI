import { defineComponent, type PropType, ref } from 'vue'

import type { FormKitFrameworkContext } from '@formkit/core'

import { textTransform } from '../../helpers'
import type { TextAreaFieldType } from '../../types'
import { InputWrapper } from '../InputWrapper'

const ROW_HEIGHT = 14
const PADDING_VERTICAL = 10
export const TextareaInput = defineComponent({
  name: 'TextareaInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext & TextAreaFieldType>, required: true } },
  setup(props) {
    return {
      value: ref(props.context.value),
      height: ref('auto'),
      overflow: ref(props.context.noResize ? 'auto' : 'hidden'),
    }
  },
  mounted() {
    this.resize()
  },
  watch: {
    ['context.value'](v) {
      this.value = v
    },
  },
  methods: {
    resize() {
      if (this.context.noResize) return

      const { minRows, maxRows } = this.context
      const ta = this.$refs.el as HTMLTextAreaElement
      this.height = '24px'
      this.overflow = 'hidden'

      this.$nextTick(() => {
        let height = ta.scrollHeight + 2
        if (maxRows) {
          const maxHeight = ROW_HEIGHT * maxRows + PADDING_VERTICAL
          if (height > maxHeight) {
            height = maxHeight
            this.overflow = 'auto'
          }
        }
        if (minRows) {
          const minHeight = ROW_HEIGHT * minRows + PADDING_VERTICAL
          height = height < minHeight ? minHeight : height
        }
        this.height = `${height}px`
      })
    },
    handleInput(event: Event) {
      if (this.context.disabled) return
      const rawV = (event.target as HTMLInputElement).value
      const v = textTransform(rawV, this.context.textTransform)
      this.value = v
      this.$props.context.node.input(v)
      this.resize()
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
        <textarea
          data-type='text'
          class='formkit-input'
          id={id}
          aria-describedby={`help-${id}`}
          placeholder={placeholder}
          disabled={!!disabled}
          value={this.value}
          ref='el'
          style={{ height: this.height, overflow: this.overflow, resize: 'none' }}
          {...handlers}
        />
      </InputWrapper>
    )
  },
})
