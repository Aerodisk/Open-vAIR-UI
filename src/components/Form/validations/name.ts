import type { FormKitValidationRule } from '@formkit/validation'
import type { FormKitNode } from '@formkit/core'

const REGEXP_UPPER = /^[A-Z0-9_ ]+$/
const REGEXP = /^[a-zA-Z0-9_ ]+$/

/** Пропускает только латинские буквы, цифры, пробел и нижнее подчёркивание _
 *
 * @example
 * "test" // => true
 * "TEST123" // => true
 * "Test_123" // => true
 *
 * "TEST 123" // => false
 * "Test__!@#" // => false
 * "Русский" // => false
 * */
export const name: FormKitValidationRule = (node: FormKitNode) => {
  const value = node.value
  if (['string', 'number', 'boolean'].includes(typeof value))
    return REGEXP.test((value as string | number | boolean).toString())

  return false
}

/** Пропускает только большие латинские буквы, цифры, пробел и нижнее подчёркивание _
 *
 * @example
 * "TEST" // => true
 * "TEST123" // => true
 * "TEST_123" // => true
 *
 * "TEST 123" // => false
 * "TEST__!@#" // => false
 * "РУССКИЙ" // => false
 * "lowerCase" // => false
 * */
export const nameUpper: FormKitValidationRule = (node: FormKitNode) => {
  const value = node.value
  if (['string', 'number', 'boolean'].includes(typeof value))
    return REGEXP_UPPER.test((value as string | number | boolean).toString())

  return false
}
