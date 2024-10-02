import { TextInput } from './TextInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const text: FormKitTypeDefinition = {
  type: 'input',
  component: TextInput,
  props: ['textTransform', 'variant', 'hint'],
}
