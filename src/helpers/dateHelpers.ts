import { fromUnixTime, format, parseISO } from 'date-fns'

/** Форматирует дату
 *
 * **NOTE:** Используется только для отображения в HTML
 *
 * **NOTE_2:** при передаче unixTimestamp в options нужно указать парамерт from: 'unix'
 * @param date дата в формате Date | ISO string | timestamp | unixTimestamp
 * @param options опции для форматирования
 * @return строка с отформатированной датой
 * @example
 * formatDate(new Date()) // => "05.06.23 13:32:18"
 * formatDate(1685961138174) // => "05.06.23 13:32:18"
 * formatDate(1685961138, {from: "unix"}) // => "05.06.23 13:32:18"
 * formatDate("2023-06-05T10:32:18.174Z") // => "05.06.23 13:32:18" */
export function formatDate(date?: Date | string | number, options?: { from: 'unix' }) {
  if (date == null) return ''

  if (options?.from === 'unix') date = fromUnixTime(Number(date))
  else if (typeof date === 'string') date = parseISO(String(date))

  try {
    return format(date as Date | number, 'dd.LL.yy k:mm:ss')
  } catch {
    return ''
  }
}
