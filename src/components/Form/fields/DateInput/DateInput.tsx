import { defineComponent, PropType } from 'vue'
import { getHours, isSameDay } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker'
import { FormKitFrameworkContext } from '@formkit/core'

import type { DateFieldType } from '@/components/Form/types'
import { Button } from '@/components/Button'

import { InputWrapper } from '../InputWrapper'

export const DateInput = defineComponent({
  name: 'DateInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext & DateFieldType>, required: true } },
  data() {
    return { inputingPromise: null as null | Promise<unknown>, localModelValue: null as null | Date }
  },
  computed: {
    customizations() {
      return { locale: this.$vuetify.locale.current, dark: this.$vuetify.theme.current.dark }
    },
    required() {
      return !!this.$props.context.node.props.parsedRules.find((i: { name: string }) => i.name === 'required')
    },
    value: {
      get() {
        return this.context.value
      },
      set(v: Date | [Date, Date]) {
        this.handleInput(v)
      },
    },
    maxTime() {
      const maxDate = this.context.maxDate
      if (!maxDate || !isSameDay(maxDate, this.localModelValue || this.value)) return

      const hours = getHours(maxDate) + 1
      return { hours }
    },
    minTime() {
      const minDate = this.context.minDate
      if (!minDate || !isSameDay(minDate, this.localModelValue || this.value)) return

      const hours = getHours(minDate)
      return { hours }
    },
  },
  methods: {
    handleInput(v: Date | [Date, Date]) {
      if (this.context.disabled) return
      this.inputingPromise = this.$props.context.node.input(v)
    },
    async handleFocus() {
      if (this.context.disabled) return
      this.$props.context.handlers.touch()
    },
    async handleBlur() {
      if (this.context.disabled) return
      await this.inputingPromise
      setTimeout(this.$props.context.handlers.blur)
    },
    async onCleared() {
      await this.inputingPromise
      setTimeout(this.$props.context.handlers.blur)
    },
  },
  render() {
    const { placeholder, disabled, minDate, maxDate } = this.context

    return (
      <InputWrapper>
        <VueDatePicker
          ref='el'
          modelValue={this.value}
          placeholder={placeholder}
          // @ts-ignore not typed emit
          onUpdate:modelValue={v => (this.value = v)}
          onInternalModelChange={(v: Date) => (this.localModelValue = v)}
          disabled={!!disabled}
          onOpen={this.handleFocus}
          onClosed={this.handleBlur}
          onCleared={this.onCleared}
          clearable={!this.required}
          minDate={minDate}
          maxDate={maxDate}
          minTime={this.minTime}
          maxTime={this.maxTime}
          closeOnAutoApply
          {...this.customizations}
        >
          {{
            'action-buttons': () => (
              <Button size='small' onClick={(this.$refs.el as unknown as { selectDate?: () => void })?.selectDate}>
                {this.$t('formkit.inputs.date.select')}
              </Button>
            ),
          }}
        </VueDatePicker>
      </InputWrapper>
    )
  },
})
