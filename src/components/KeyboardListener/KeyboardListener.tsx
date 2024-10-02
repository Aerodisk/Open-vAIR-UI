import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue'
import { map, pullAllBy } from 'lodash'

type EventType = 'keypress' | 'keydown' | 'keyup'

type Callback = (e: KeyboardEvent) => unknown
type Options = {
  eventType?: EventType
  code?: string
}
type Listener = {
  id: number
  eventType: EventType
  code?: string
  cb: Callback
}

const listeners: Listener[] = []

export const useKeyboard = (cb: Callback, options?: Options) => {
  const { eventType = 'keypress', code } = options || {}
  const id = Date.now() + Math.random()

  onBeforeMount(() => listeners.push({ eventType, id, code, cb }))
  onBeforeUnmount(() => pullAllBy(listeners, [{ id }], 'id'))
}

export const KeyboardListener = defineComponent({
  name: 'KeyboardListener',
  beforeMount() {
    window.addEventListener('keydown', this.keyboardListener)
    window.addEventListener('keypress', this.keyboardListener)
    window.addEventListener('keyup', this.keyboardListener)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keyboardListener)
    window.removeEventListener('keypress', this.keyboardListener)
    window.removeEventListener('keyup', this.keyboardListener)
  },
  methods: {
    keyboardListener(e: KeyboardEvent) {
      // CALL LISTENERS WITH EXACT KEY CODE
      const keyCodeTypedListeners = listeners.filter(i => i.code)
      keyCodeTypedListeners.forEach(i => (i.eventType === e.type && i.code === e.code ? i.cb(e) : null))

      // CALL LISTENERS BY eventType
      const calledListeners = map(keyCodeTypedListeners, 'id')
      listeners.filter(i => !calledListeners.includes(i.id)).forEach(i => (i.eventType === e.type ? i.cb(e) : null))
    },
  },
  render() {
    return null
  },
})
