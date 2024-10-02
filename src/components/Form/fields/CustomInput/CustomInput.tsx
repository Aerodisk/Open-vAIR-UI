import { defineComponent, type PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'
import type { CustomFieldType } from '@/components/Form/types'
import { InputWrapper } from '../InputWrapper'

const CustomInput = defineComponent({
  name: 'CustomInput',
  props: {
    context: {
      type: Object as PropType<FormKitFrameworkContext & { render: CustomFieldType['render'] }>,
      required: true,
    },
  },
  render() {
    return <InputWrapper>{this.$props.context.render({ context: this.$props.context })}</InputWrapper>
  },
})

export default CustomInput
