import { capitalize, defineComponent, PropType } from 'vue'
import { FormKitFrameworkContext, getNode } from '@formkit/core'
import { chain } from 'lodash'
import { FormKit } from '@formkit/vue'

import { i18n, type ru } from '@/locales'
import { bytesToSize, bytesToUnit, sizeToBytes } from '@helpers'

import { SizeFieldType } from '../../types'
import { InputWrapper } from '../InputWrapper'

const { t } = i18n.global

type Notation = keyof (typeof ru)['sizes']['full']
type Unit = keyof (typeof ru)['sizes']['full']['si']

const sizeLabel = (notation: Notation, unit: Unit) =>
  `${t(`sizes.full.${notation}.${unit}`)} (${t(`sizes.short.${notation}.${unit}`)})`

export const SizeInput = defineComponent({
  name: 'SizeInput',
  setup(props) {
    return { sizeInputId: props.context.id + 'input_size' }
  },
  data() {
    return { values: { unit: 'B', size: 0 }, init: false }
  },
  props: {
    context: {
      type: Object as PropType<FormKitFrameworkContext & SizeFieldType>,
      required: true,
    },
  },
  async mounted() {
    const { value, allowed, precision, options } = this

    const exactUnit = bytesToUnit(Number(value || 0), allowed)
    const size = bytesToSize(Number(value || 0), { exactUnit, precision, withoutUnit: true })

    this.values.unit = exactUnit || options[0]?.value || 'B'
    this.values.size = Number(size)
    setTimeout(() => (this.init = true))
  },
  watch: {
    values: {
      handler(v) {
        if (!this.init) return
        this.handleInput(v.size, v.unit)
      },
      deep: true,
    },
    'context.messages': {
      handler(v) {
        const node = getNode(this.sizeInputId)
        const errors = chain(v)
          .values()
          .map('value')
          .map(i => i.replaceAll(capitalize(this.context.node.name), this.$t('form.sizeInput.size.label')))
          .value()
        node?.clearErrors()
        node?.setErrors(errors)
      },
      deep: true,
    },
  },
  computed: {
    value() {
      return this.context.value
    },
    precision() {
      return this.context.precision || 5
    },
    allowed() {
      return this.context.allowed
    },
    disabled() {
      return this.context.disabled
    },
    options(): { label: string; value: string }[] {
      const n = this.$store.state.app.settings.sizeNotation
      return (
        [
          { label: sizeLabel(n, 'B'), value: 'B' },
          { label: sizeLabel(n, 'K'), value: 'K' },
          { label: sizeLabel(n, 'M'), value: 'M' },
          { label: sizeLabel(n, 'G'), value: 'G' },
          { label: sizeLabel(n, 'T'), value: 'T' },
        ] as const
      ).filter(i => (this.allowed ? this.allowed.includes(i.value) : true))
    },
  },
  methods: {
    async handleInput(size: string, unit: Unit) {
      if (this.disabled) return

      this.context.node.input(size === '' ? size : sizeToBytes(Number(size), unit))
    },
  },
  render() {
    return (
      <InputWrapper>
        <FormKit
          type='group'
          name='__formkit_size_input'
          // @ts-ignore
          modelValue={this.values}
          // @ts-ignore
          onUpdate:modelValue={v => (this.values = v)}
          ignore
        >
          <div class='d-flex flex-row' style={{ gap: '20px' }}>
            <FormKit
              name='unit'
              type='select'
              label={this.$t('form.sizeInput.unit.label')}
              // @ts-ignore placeholder allowed in select input
              placeholder={this.$t('form.sizeInput.unit.placeholder')}
              options={this.options}
              validation='required'
              style={{ width: '100%' }}
            />
            <FormKit
              id={this.sizeInputId}
              name='size'
              type='number'
              label={this.$t('form.sizeInput.size.label')}
              // @ts-ignore placeholder allowed in select input
              placeholder={this.$t('form.sizeInput.size.placeholder')}
              style={{ width: '100%' }}
              onBlur={this.$props.context.handlers.blur}
              onFocus={this.$props.context.handlers.touch}
            />
          </div>
        </FormKit>
      </InputWrapper>
    )
  },
})
