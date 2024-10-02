import { FileInput } from './FileInput'
import type { FormKitTypeDefinition } from '@formkit/core'

export const file: FormKitTypeDefinition = {
  type: 'input',
  component: FileInput,
  props: ['directory', 'multiple', 'accept', 'uploadUrl', 'texts', 'icon', 'preventAbortRequestBeforeUnmount'],
}
