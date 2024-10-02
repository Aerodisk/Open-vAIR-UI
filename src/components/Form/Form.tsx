import { defineComponent, reactive } from 'vue'
import { cloneDeep, isArray, isEqual, isFunction, merge, pick } from 'lodash'
import { FormKit } from '@formkit/vue'
import type { PropType } from 'vue'
import type { FormKitFrameworkContext, FormKitNode } from '@formkit/core'

import { Button } from '@/components/Button'

import type { FieldsPropType, FormHintType, FormSlotProps } from './types'
import { Fields } from './fields'
import { callFieldsWatchers, generateFormId, getDefaultInitials, prepareFields } from './helpers'
import { FormHint } from './components'

export default defineComponent({
  name: 'DataForm',
  setup(props) {
    const values = reactive<Record<string, unknown>>(merge({}, getDefaultInitials(props.fields), props.initials))
    const oldValues = cloneDeep(values)

    return { id: props.formId || generateFormId(), values, oldValues }
  },
  props: {
    fields: {
      required: true,
      type: [Array, Object] as PropType<FieldsPropType>,
    },
    initials: Object as PropType<object>,
    hint: Object as PropType<FormHintType | ((v: Record<string, unknown>) => FormHintType | null)>,
    onSubmit: Function,
    submitText: String,
    submitDanger: Boolean,
    ignore: Boolean,
    formId: String,
    disableEqualInitialsReset: Boolean,
  },
  emits: ['submit', 'reset'],
  methods: {
    async submit(data: unknown, node: FormKitNode) {
      if (!node.context?.state.dirty && !this.initials) return this.$emit('reset')
      if (this.initials && isEqual(this.initials, data) && !this.disableEqualInitialsReset) return this.$emit('reset')

      this.onSubmit ? await this.onSubmit?.(data) : this.$emit('submit', data)
    },
    reset(e: MouseEvent) {
      e.preventDefault()
      this.$emit('reset')
    },
    async onUpdateValues(v: unknown) {
      if (!this.$refs.form) return
      ;(this.$refs.form as { node?: FormKitNode })?.node?.clearErrors()

      await this.$nextTick()
      callFieldsWatchers(this.fields, v, this.oldValues, this.id)
      this.oldValues = cloneDeep(this.values)
    },
  },
  render() {
    const direction = 'direction' in this.fields ? this.fields.direction : 'column'
    const title = 'title' in this.fields ? this.fields.title : null
    const fields = isArray(this.fields) ? this.fields : this.fields.fields

    return (
      <>
        <FormHint hint={isFunction(this.hint) ? this.hint(this.values) : this.hint} />
        <FormKit
          type='form'
          ref='form'
          id={this.id}
          onSubmit={this.submit}
          modelValue={this.values}
          onUpdate:modelValue={this.onUpdateValues}
          ignore={this.ignore}
        >
          {{
            default: () => (
              <>
                {title && <div class='fields_block_title'>{title}</div>}
                <div class={`d-flex flex-${direction} ${direction === 'row' ? 'form-row ' : ''}fields_block`}>
                  <Fields fields={prepareFields(fields, this.values)} />
                </div>
              </>
            ),
            actions: ({ state }: FormKitFrameworkContext) => {
              const slotProps: FormSlotProps = {
                state,
                submit: () => this.$formkit.submit(this.id),
                ...pick(this, ['reset', 'values']),
              }
              if (this.$slots.actions) return this.$slots.actions(slotProps)
              return (
                <div class='formkit-actions'>
                  {this.$slots.leftActions ? (
                    this.$slots.leftActions?.(slotProps)
                  ) : (
                    <div>
                      <Button title={this.$t('cancel')} type='reset' variant='secondary' onClick={this.reset} />
                    </div>
                  )}
                  {this.$slots.rightActions ? (
                    this.$slots.rightActions(slotProps)
                  ) : (
                    <div class='d-flex align-center' style={{ gap: '24px' }}>
                      {this.$slots.rightActionsExtra?.(slotProps)}
                      <Button
                        title={this.submitText || this.$t('create')}
                        type='submit'
                        loading={state.loading}
                        color={this.submitDanger ? 'error' : 'primary'}
                      />
                    </div>
                  )}
                </div>
              )
            },
          }}
        </FormKit>
      </>
    )
  },
})
