import { isArray } from 'lodash'
import type { FormKitValidationRule } from '@formkit/validation'
import type { FormKitNode } from '@formkit/core'

export const multipleOf: FormKitValidationRule = (node: FormKitNode, arg = 0) => {
  const value = node.value

  if (isArray(value)) return value.length % arg === 0

  return true
}
