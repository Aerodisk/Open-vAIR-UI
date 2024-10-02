/** Проверяет является ли строка валидным JSON
 * @param str строка для проверки
 * @return Returns boolean
 * @example
 * const json = JSON.stringify({test: "123"})
 * isJson(json) // => true
 *
 * isJson('{"test":"123"}') // => true
 * isJson('1231231233') // => false
 * */
export function isJson(str: string | null | undefined) {
  if (!str) return false

  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
