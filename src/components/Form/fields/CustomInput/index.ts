import CustomInput from './CustomInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const custom: FormKitTypeDefinition = {
  type: 'input',
  component: CustomInput,
  props: ['options', 'render'],
}
