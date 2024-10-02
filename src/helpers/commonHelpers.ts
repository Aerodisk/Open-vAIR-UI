import { get, isEqual, keys } from 'lodash'
import { i18n } from '@/locales'

const { t } = i18n.global

/** Проводит поиск строки в массиве и генерирует уникальную строку, которой нет в массиве
 * @param name исходная строка
 * @param arr массив для поиска
 * @return Уникальная строка с постфиксом "(${number})", либо исходная строка
 * @example
 * uniqName("Alex", ["Alex", "Bob", "Walter"]) // => "Alex (1)"
 * uniqName("Alex", ["Alex", "Alex (1)", "Walter"]) // => "Alex (2)"
 * uniqName("Alex", ["Mike", "Bob", "Walter"]) // => "Alex" */
export const uniqName = (name: string, arr: string[]) => {
  if (arr.find(i => i === name)) {
    let i = 1
    while (arr.find(i => i === `${name} (${i})`)) i++
    name += ` (${i})`
  }
  return name
}

/** Генерирует случайный MAC-адрес
 * @return строка формата 6C:4A:74:XX:XX:XX
 * @example
 * generateMac() // => "6C:4A:74:F8:F7:13" */
export const generateMac = () =>
  '6C:4A:74:XX:XX:XX'.replace(/X/g, () => '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16)))

/** Приводит булевое значение к строке "Да" | "Нет", учитывает установленную локализацию
 *
 * **NOTE:** Используется только для отображения в HTML
 * @param val boolean
 * @return строка "Да" | "Нет"
 * @example
 * // locale = "ru"
 * booleanTranslate(true) // => "Да"
 * booleanTranslate(false) // => "Нет"
 * // locale = "en"
 * booleanTranslate(true) // => "Yes"
 * booleanTranslate(false) // => "No" */
export const booleanTranslate = (val: boolean) => (val ? t('yes') : t('no'))

/** Обновляет элемент в массиве, либо добавляет, если элемент не найден
 *
 * **NOTE:** Не мутирует исходный массив
 * @param arr массив объектов
 * @param item элемент для добавления
 * @param key ключ по которому происходит поиск объекта в массиве
 * @return новый массив
 * @example
 * setArrItem([{id: 1, name: "Alex"}], {id: 2, name: "Bob"})
 * // => [{id: 1, name: "Mike"}, {id: 2, name: "Bob"}]
 *
 * setArrItem([{id: 1, name: "Alex"}, {id: 2, name: "Bob"}], {id: 1, name: "Mike"})
 * // => [{id: 1, name: "Mike"}, {id: 2, name: "Bob"}]
 *
 * setArrItem([{id: 1, name: "Alex"}, {id: 2, name: "Bob"}], {id: 1, name: "Mike"})
 * // => [{id: 1, name: "Mike"}, {id: 2, name: "Bob"}]
 * */
export const setArrItem = <T extends object>(arr: T[], item: T, key: string | number | symbol = 'id') => {
  const safeArr = [...arr]
  const existIndex = arr.findIndex(i => get(item, key) === get(i, key))
  if (existIndex === -1) safeArr.push(item)
  safeArr[existIndex] = item
  return safeArr
}

/** Высчитывает ближайщее к переданному числу число из массива
 * @param arr массив чисел
 * @param val число для поиска
 * @return ближайщее по значению число из массива к числу val
 * @example
 * nearestNumber([0, 10, 20], 3) // => 0
 * nearestNumber([0, 10, 20], 50) // => 20
 * nearestNumber([0, 10, 20], 15) // => 10 */
export const nearestNumber = (arr: number[], val: number) => {
  return arr.reduce((nearest, num) => (Math.abs(num - val) >= Math.abs(nearest - val) && nearest < num ? nearest : num))
}

/** Находит все числа от нуля до n, которые деляться без остатка на число divider
 * @param n максимальное число
 * @param divider делитель
 * @return массив целых чисел
 * @example
 * test(9, 3) // => [3, 6, 9]
 * test(50, 10) // => [10, 20, 30, 40, 50]
 * test(25, 5) // => [5, 10, 15, 20, 25] */
export const divisibleNumbers = (n: number, divider: number) => {
  const numbers: number[] = []
  for (let i = 1; i <= n; i++) {
    if (i % divider === 0) numbers.push(i)
  }
  return numbers
}

/** Приводит строку к булевому значению соответственно
 * @param v string = "True" | "true" | "false"
 * @return Returns boolean
 * @example
 * booleanString("true") // => true
 * booleanString("True") // => true
 * booleanString("false") // => false
 * booleanString("abrakadabra") // => false */
export const booleanString = (v: string) => v.toLowerCase() === 'true'

/** Сравнивает объекты по значениям ключей, возвращает объект с разницей
 *  @param a первый объект
 *  @param b второй объект, значение по ключам будут взяты из него
 *  @return новый объект, включающий в себя все ключи, значения которых в объекта не равны
 *  @example
 * const a = {cat: 'meow', dog: 'wow-bow'}
 * const b = {cat: 'meow', dog: 'bark'}
 * differenceObj(a, b) // => {dog: 'bark'} */
export const differenceObj = <T extends Record<string, unknown>>(a: T, b: T) => {
  const changesObj: Partial<T> = {}

  const allKeys: (keyof T)[] = keys({ ...a, ...b })
  allKeys.forEach(key => (!isEqual(b[key], a[key]) ? (changesObj[key] = b[key]) : null))

  return changesObj
}

/** Копирует текст в буфер обмена
 *  @param text текст для копирования
 *  @example
 *  copyToClipboard('test') // текст 'test' будет скопирован в буфер обмена */
export const copyToClipboard = (text: string) => {
  try {
    return navigator.clipboard.writeText(text)
  } catch (err) {
    const $el = document.createElement('input')
    $el.style.position = 'absolute'
    $el.style.left = '-9999px'
    $el.setAttribute('readonly', '')
    $el.value = text
    document.body.appendChild($el)
    $el.select()
    document.execCommand('copy')
    document.body.removeChild($el)
  }
}

/** Вызывает метод preventDefault у объекта Event
 *
 *  **NOTE**: для удобства использования в lodash compose
 *  @param e Event
 *  @returns . Event */
export const preventDefault = (e: Event) => {
  e.preventDefault()
  return e
}

/** Вызывает метод stopPropagation у объекта Event
 *
 * **NOTE**: для удобства использования в lodash compose
 *  @param e Event
 *  @returns . Event */
export const stopPropagation = (e: Event) => {
  e.stopPropagation()
  return e
}

/** Проверяет, что arg не является nullable
 *
 * **NOTE**: для удобства использования в методе массива filter
 *  @param arg
 *  @returns boolean */
export function isNotNullable<T>(arg: T): arg is NonNullable<T> {
  return arg != null
}
