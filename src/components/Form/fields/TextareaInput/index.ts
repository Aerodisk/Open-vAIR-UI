import { TextareaInput } from './TextareaInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const textarea: FormKitTypeDefinition = {
  type: 'input',
  component: TextareaInput,
  props: ['minRows', 'maxRows', 'noResize', 'textTransform'],
}
