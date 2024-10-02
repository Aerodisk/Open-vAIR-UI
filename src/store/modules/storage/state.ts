import type { Image, Storage, Volume } from '@api/generated'

export type State = {
  storages: Storage[]
  volumes: Volume[]
  images: Image[]
}

export const state: State = {
  storages: [],
  volumes: [],
  images: [],
}
