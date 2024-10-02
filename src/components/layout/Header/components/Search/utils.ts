import { chain, omit } from 'lodash'

import type { SearchItem } from './searchConfig'

function searchByKeywords(keywords: string[], text: string) {
  const re = new RegExp('(' + keywords.join('|') + ')', 'g')
  return text.match(re) || []
}

export function searchFc(arrRaw: SearchItem[], search: string) {
  const arr = arrRaw.map(i => ({
    ...i,
    lowerCasedLabel: typeof i.label === 'string' ? i.label.toLowerCase() : i.label.value.toLowerCase(),
  }))
  search = search.toLowerCase()

  const matchByLabel = arr.filter(
    i => i.lowerCasedLabel.includes(search) || search.split(' ').includes(i.lowerCasedLabel)
  )
  const matchByKeywords = arr
    .filter(i => !matchByLabel.includes(i))
    .filter(i => searchByKeywords(i.keywords, search).length)
    .sort((a, b) =>
      searchByKeywords(a.keywords, search).length > searchByKeywords(b.keywords, search).length ? -1 : 1
    )
  const matchByPartKeyword = arr
    .filter(i => ![...matchByLabel, ...matchByKeywords].includes(i))
    .filter(i => i.keywords.find(keyword => keyword.includes(search)))

  return chain([...matchByLabel, ...matchByKeywords, ...matchByPartKeyword])
    .map(i => omit(i, ['lowerCasedLabel']))
    .uniqBy('label')
    .value()
}
