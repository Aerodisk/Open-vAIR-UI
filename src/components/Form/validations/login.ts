import type { FormKitValidationRule } from '@formkit/validation'
import type { FormKitNode } from '@formkit/core'

const regexp = /^[a-zA-Z0-9-_]+$/

/** Пропускает только латинские буквы в любом регистре, цифры, нижнее подчёркивание (_) и дефис (-)
 *
 * @example
 * "TEST" // => true
 * "Test" // => true
 * "test" // => true
 * "Test123" // => true
 * "Test_123" // => true
 * "Test-123" // => true
 *
 * "TEST 123" // => false
 * "TEST__!@#" // => false
 * "РУССКИЙ" // => false
 * */
export const login: FormKitValidationRule = (node: FormKitNode) => {
  const value = node.value
  if (['string', 'number', 'boolean'].includes(typeof value))
    return regexp.test((value as string | number | boolean).toString())

  return false
}
