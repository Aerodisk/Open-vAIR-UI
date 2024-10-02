import { values } from 'lodash'
import type { FormKitValidationRule } from '@formkit/validation'
import type { FormKitNode } from '@formkit/core'
import { getFormValues } from '@/components/Form/helpers'

export const uniq: FormKitValidationRule = (node: FormKitNode) => {
  const vals = getFormValues(node)
  delete vals[node.name]

  return !values(vals).includes(node.value)
}
