import { SizeInput } from './SizeInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const size: FormKitTypeDefinition = {
  type: 'input',
  component: SizeInput,
  props: ['precision', 'allowed'],
}
