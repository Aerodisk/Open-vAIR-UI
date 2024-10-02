import RadioGroupInput from './RadioGroupInput.vue'
import type { FormKitTypeDefinition } from '@formkit/core'

export const radio: FormKitTypeDefinition = {
  type: 'input',
  component: RadioGroupInput,
  props: ['options'],
}
