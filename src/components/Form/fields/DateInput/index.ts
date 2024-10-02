import { DateInput } from './DateInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const date: FormKitTypeDefinition = {
  type: 'input',
  component: DateInput,
  props: ['placeholder', 'minDate', 'maxDate'],
}
