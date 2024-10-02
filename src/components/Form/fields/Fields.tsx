import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { FieldsBlockWithFields, FieldType } from '../types'
import { isBlock } from '../helpers'
import FieldsBlock from './FieldsBlock'
import Field, { type FieldPropType } from './Field'

export default defineComponent({
  name: 'DataFormFields',
  props: {
    fields: {
      type: Array as PropType<(FieldType | FieldsBlockWithFields)[]>,
      required: true,
    },
  },
  render() {
    const { fields } = this.$props

    return fields.map(field =>
      isBlock(field) ? (
        <FieldsBlock fields={field as FieldsBlockWithFields} />
      ) : (
        <Field field={field as FieldPropType} />
      )
    )
  },
})
