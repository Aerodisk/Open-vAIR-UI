import { defineComponent, reactive, type PropType } from 'vue'
import { merge, assign, pick, values, last, cloneDeep, isEqual, differenceBy, map } from 'lodash'
import { VTabs, VTab } from 'vuetify/components'
import { FormKit } from '@formkit/vue'
import type { FormKitFrameworkContext, FormKitNode, FormKitGroupValue } from '@formkit/core'

import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import { Fields } from '../fields'
import { callFieldsWatchers, generateFormId, getDefaultInitials, getInitialsForTab, prepareFields } from '../helpers'
import type { MultiStepFormSlotProps, TabItem, TabsPropType } from '../types'
import { FormHint } from '../components'
import { useSteps } from './useSteps'

export type TabItemWithInd = TabItem & { index: number }

const generateGroupId = (formId: string, index: string | number) => `${formId}_group_${index}`

export default defineComponent({
  name: 'MultistepForm',
  setup(props) {
    const fValues = reactive<Record<string, unknown>>({})
    const tabsWithIndex = props.tabs.map((i, index) => ({ ...i, index }))
    tabsWithIndex.forEach(
      tab => (fValues[tab.index] = merge(getDefaultInitials(tab.fields), getInitialsForTab(tab.fields, props.initials)))
    )
    tabsWithIndex
      .filter(i => !(i.showIf ? i.showIf(assign({}, ...values(fValues))) : true))
      .forEach(({ index }) => delete fValues[index])
    const oldValues = assign({}, ...values(cloneDeep(fValues)))

    return { id: props.formId || generateFormId(), ...useSteps(), values: fValues, oldValues }
  },
  props: {
    tabs: {
      required: true,
      type: Array as PropType<TabsPropType>,
    },
    initials: Object as PropType<Record<string, unknown>>,
    hideTabs: Boolean,
    onSubmit: Function,
    submitText: String,
    ignore: Boolean,
    formId: String,
  },
  emits: ['submit', 'reset'],
  data() {
    return { submitClicked: false }
  },
  computed: {
    isLastTab(): boolean {
      return this.activeStep === last(this.filteredTabs)?.index
    },
    isFirstTab(): boolean {
      return this.activeStep === this.filteredTabs[0].index
    },
    tabsWithId(): TabItemWithInd[] {
      return this.tabs.map((i, index) => ({ ...i, index }))
    },
    filteredTabs(): TabItemWithInd[] {
      return this.tabsWithId.filter(i => (i.showIf ? i.showIf(this.flatValues) : true))
    },
    flatValues(): typeof this.values {
      return assign({}, ...values(this.values))
    },
  },
  watch: {
    filteredTabs(newValue, oldValue) {
      const diff = differenceBy(newValue, oldValue, 'index') as unknown as TabItemWithInd[]
      this.setInitials(diff, this.initials)
    },
  },
  methods: {
    async submit(data: FormKitGroupValue, node: FormKitNode) {
      if (!node.context?.state.dirty && !this.initials) return
      if (this.initials && isEqual(this.initials, data)) return

      const flatValues = assign({}, ...values(cloneDeep(data)))
      this.onSubmit ? await this.onSubmit?.(flatValues) : this.$emit('submit', flatValues)
    },
    submitRaw(_: unknown, node: FormKitNode) {
      if (!node.context?.state.dirty) return this.$emit('reset')

      this.checkVisitedAll()
      this.submitClicked = true
    },
    nextTab(e: MouseEvent) {
      e.preventDefault()
      this.setStep(1)
    },
    prevTab(e: MouseEvent) {
      e.preventDefault()
      this.setStep(-1)
    },
    reset(e: MouseEvent) {
      e.preventDefault()
      this.$emit('reset')
    },
    setInitials(tabs: TabItemWithInd[], initials?: typeof this.initials) {
      tabs.forEach(
        tab => (this.values[tab.index] = merge(getDefaultInitials(tab.fields), getInitialsForTab(tab.fields, initials)))
      )
    },
    async onUpdateValues(v: unknown) {
      if (!this.$refs.form) return
      const vals = assign({}, ...values(v))

      await this.$nextTick()
      callFieldsWatchers(map(this.filteredTabs, 'fields').flat(), vals, this.oldValues, this.id)
      this.oldValues = cloneDeep(vals)
    },
  },
  render() {
    const tabs = this.filteredTabs
    const stepTabs = tabs
      .map(i => ({ tab: i, step: this.steps[generateGroupId(this.id, i.index)] }))
      .filter(i => Boolean(i.step))

    return (
      <FormKit
        type='form'
        ref='form'
        plugins={[this.stepPlugin]}
        onSubmit={this.submit}
        onSubmitRaw={this.submitRaw}
        modelValue={this.values}
        onUpdate:modelValue={this.onUpdateValues}
        data-type='multistep'
        incomplete-message={false}
        id={this.id}
        ignore={this.ignore}
      >
        {{
          default: () => (
            <>
              {!this.hideTabs && (
                <VTabs modelValue={this.activeStep} onUpdate:modelValue={v => (this.activeStep = v as number)}>
                  {stepTabs.map(({ step, tab }) => (
                    <VTab
                      key={tab.index}
                      value={tab.index}
                      data-step-valid={step.valid}
                      data-step-active={this.activeStep === tab.index}
                      class='multistepForm_tab'
                    >
                      {step.visited && !step.valid && (
                        <span class='multiform_tab_errors'>
                          {/*{step.errorCount + step.blockingCount}*/}
                          <Icon icon='alertCircleOutline' color='error' size='small' />
                        </span>
                      )}
                      {step.visited && step.valid && (
                        <span class='multiform_tab_check'>
                          <Icon icon='check' color='success' size='small' />
                        </span>
                      )}
                      {tab.title}
                    </VTab>
                  ))}
                </VTabs>
              )}
              {tabs.map(({ fields, index, hint }) => (
                <>
                  <FormHint hint={hint} />
                  <div key={index} style={{ display: this.activeStep === index ? 'block' : 'none' }}>
                    <FormKit type='group' id={generateGroupId(this.id, index)} name={`${index}`} index={index}>
                      <div class={`d-flex flex-column`}>
                        <Fields fields={prepareFields(fields, this.flatValues)} />
                      </div>
                    </FormKit>
                  </div>
                </>
              ))}
            </>
          ),
          actions: ({ state }: FormKitFrameworkContext) => {
            const slotProps: MultiStepFormSlotProps['actions'] = {
              state,
              submitDisabled: this.submitClicked && !state.valid,
              submitVisible: this.isLastTab || state.valid,
              values: this.flatValues,
              submit: () => this.$formkit.submit(this.id),
              ...pick(this, ['reset', 'prevTab', 'nextTab', 'isFirstTab', 'isLastTab']),
            }
            if (this.$slots.actions) return this.$slots.actions(slotProps)

            return (
              <div class='formkit-actions'>
                {this.$slots.leftActions ? (
                  this.$slots.leftActions?.(slotProps)
                ) : (
                  <div>
                    <Button title={this.$t('cancel')} variant='secondary' onClick={this.reset} />
                  </div>
                )}
                {this.$slots.rightActions ? (
                  this.$slots.rightActions(slotProps)
                ) : (
                  <div class='d-flex align-center' style={{ gap: '24px' }}>
                    {!this.isFirstTab && (
                      <Button title={this.$t('form.back')} variant='secondary' onClick={this.prevTab} />
                    )}
                    {!this.isLastTab && <Button title={this.$t('form.next')} onClick={this.nextTab} />}
                    {this.$slots.rightActionsExtra?.(slotProps)}
                    {slotProps.submitVisible &&
                      (this.$slots.submitBtn?.(slotProps) || (
                        <Button
                          title={this.submitText || this.$t('create')}
                          type='submit'
                          disabled={slotProps.submitDisabled}
                          loading={state.loading}
                        />
                      ))}
                  </div>
                )}
              </div>
            )
          },
        }}
      </FormKit>
    )
  },
})
