import { defineComponent, type JSXComponent, PropType, withModifiers } from 'vue'
import { VCheckboxBtn } from 'vuetify/components'

import { Icon } from '@/components/Icon'

import type { DataTableItemSlotProps } from '../types'

export const SelectCheckboxItem = defineComponent({
  name: 'SelectCheckboxItem',
  props: { props: { type: Object as PropType<DataTableItemSlotProps>, required: true } },
  render() {
    const { internalItem, isSelected, toggleSelect } = this.props
    return (
      <VCheckboxBtn
        disabled={!internalItem.selectable}
        modelValue={isSelected([internalItem])}
        // @ts-ignore onClick allowed here
        onClick={withModifiers(() => toggleSelect(internalItem), ['stop'])}
        trueIcon={(<Icon icon='checkboxMarked' size='small' />) as unknown as JSXComponent}
        falseIcon={(<Icon icon='checkboxBlankOutline' size='small' />) as unknown as JSXComponent}
      />
    )
  },
})
