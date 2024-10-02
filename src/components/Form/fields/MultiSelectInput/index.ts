import MultiSelectInput from './MultiSelectInput.vue'
import type { FormKitTypeDefinition } from '@formkit/core'

export const multiselect: FormKitTypeDefinition = {
  type: 'input',
  component: MultiSelectInput,
  props: ['options'],
}
