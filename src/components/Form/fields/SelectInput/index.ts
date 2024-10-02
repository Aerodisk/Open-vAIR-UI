import SelectInput from './SelectInput.vue'
import type { FormKitTypeDefinition } from '@formkit/core'

export const select: FormKitTypeDefinition = {
  type: 'input',
  component: SelectInput,
  props: ['options'],
}
