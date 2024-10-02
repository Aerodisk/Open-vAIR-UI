import { defineComponent, type JSXComponent, PropType } from 'vue'
import { VCheckboxBtn } from 'vuetify/components'

import { Icon } from '@/components/Icon'
import type { DataTableSelectHeaderSlotProps } from '../types'

export const SelectCheckboxHeader = defineComponent({
  name: 'SelectCheckboxHeader',
  props: { props: { type: Object as PropType<DataTableSelectHeaderSlotProps>, required: true }, multiple: Boolean },
  render() {
    const { allSelected, someSelected, selectAll } = this.props
    if (!this.multiple) return null
    return (
      <VCheckboxBtn
        modelValue={allSelected}
        indeterminate={someSelected && !allSelected}
        onUpdate:modelValue={selectAll}
        trueIcon={(<Icon icon='checkboxMarked' size='small' />) as unknown as JSXComponent}
        falseIcon={(<Icon icon='checkboxBlankOutline' size='small' />) as unknown as JSXComponent}
        indeterminateIcon={(<Icon icon='minusBox' size='small' />) as unknown as JSXComponent}
      />
    )
  },
})
