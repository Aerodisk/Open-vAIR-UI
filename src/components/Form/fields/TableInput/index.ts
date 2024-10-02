import TableInput from './TableInput.vue'
import type { FormKitTypeDefinition } from '@formkit/core'

export const table: FormKitTypeDefinition = {
  type: 'input',
  component: TableInput,
  props: ['headers', 'itemValue', 'short', 'multiple', 'onRefresh'],
}
