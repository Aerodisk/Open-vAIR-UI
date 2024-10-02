import type { Event } from '@api/generated'

export type State = {
  events: Event[]
}

export const state: State = {
  events: [],
}
