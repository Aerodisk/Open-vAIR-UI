import type { FormKitValidationRule } from '@formkit/validation'
import type { FormKitNode } from '@formkit/core'

const macRegExp = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

export const mac: FormKitValidationRule = (node: FormKitNode) => {
  const value = node.value
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return macRegExp.test((value as string | number | boolean).toString())
  }
  return false
}
