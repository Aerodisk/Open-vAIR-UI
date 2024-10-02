import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { assign, isFunction, values } from 'lodash'
import { FormKit } from '@formkit/vue'

import type { FieldType, SelectFieldType, MultiSelectFieldType, TableFieldType, CommonFieldType } from '../types'

export type FieldPropType = ExcludedFuncByKey<
  | Exclude<FieldType, SelectFieldType | MultiSelectFieldType | TableFieldType>
  | ExcludedFuncByKey<SelectFieldType, 'options'>
  | ExcludedFuncByKey<MultiSelectFieldType, 'options'>
  | ExcludedFuncByKey<TableFieldType, 'items'>,
  'disabled'
>

type ExcludedFuncByKey<Field extends object, Key extends keyof Field> = Omit<
  Extract<FieldType, CommonFieldType & Field>,
  Key
> & { [key in Key]: Exclude<Field[Key], Function> }

export default defineComponent({
  name: 'DataFormField',
  props: {
    field: {
      type: Object as PropType<FieldPropType>,
      required: true,
    },
  },
  computed: {
    show() {
      const showIf = this.$props.field.showIf
      if (showIf == null) return true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let form: any = this.$parent
      while (form?.data?.type !== 'form') form = form?.$parent

      if (isFunction(showIf)) {
        const isMultistepForm = form.data.attrs['data-type'] === 'multistep'
        return isMultistepForm ? showIf(assign({}, ...values(form.data.value))) : showIf(assign({}, form.data.value))
      }
      return showIf
    },
  },
  render() {
    const { field } = this.$props

    if (!this.show) return null
    return <FormKit {...field} preserve />
  },
})
