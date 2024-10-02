import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { FieldsBlockWithFields } from '../types'
import Fields from './Fields'
import { assign, isFunction, values } from 'lodash'

export default defineComponent({
  name: 'FieldsBlock',
  props: {
    fields: {
      type: Object as PropType<FieldsBlockWithFields>,
      required: true,
    },
  },
  computed: {
    show() {
      const showIf = this.$props.fields.showIf
      if (showIf == null) return true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let form: any = this.$parent
      while (form?.data?.type !== 'form') form = form?.$parent

      return isFunction(showIf) ? showIf(assign({}, ...values(form.data.value))) : showIf
    },
  },
  render() {
    const { fields, direction, title, style } = this.$props.fields

    if (!this.show) return null
    return (
      <>
        {title && <div class='fields_block_title'>{title}</div>}
        <div class={`d-flex flex-${direction} ${direction === 'row' ? 'form-row' : ''} fields_block`} style={style}>
          <Fields fields={fields} />
        </div>
      </>
    )
  },
})
