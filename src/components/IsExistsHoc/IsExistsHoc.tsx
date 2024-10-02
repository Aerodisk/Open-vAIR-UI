import { defineComponent, type PropType } from 'vue'
import { secondsToMilliseconds } from 'date-fns'
import { VProgressCircular } from 'vuetify/components'

import type { RootActions } from '@/store'
import { store } from '@/store'

export type IsExistsHocProps = {
  actions: (keyof RootActions)[]
  height?: number
}

export const IsExistsHoc = defineComponent({
  name: 'IsExistsHoc',
  props: { actions: { type: Array as PropType<IsExistsHocProps['actions']>, required: true }, height: Number },
  setup(props) {
    const executeActions = props.actions.filter(key => {
      const action = store.state.actionsState[key]
      if (action.isDispatching) return false
      if (action.isUninitialized) return true
      if (action.isError) return true
      return !!(action.timestamp && Date.now() - action.timestamp > secondsToMilliseconds(3))
    })
    executeActions.map(action => store.dispatch(action, undefined))
  },
  computed: {
    loading() {
      return this.actions.some(key => this.$store.state.actionsState[key].isInitializing)
    },
  },
  render() {
    if (this.loading)
      return (
        <div
          class='w-100 d-flex align-center justify-center'
          style={{ ...(this.$attrs.style || {}), height: this.height ? `${this.height}px` : '100%' }}
        >
          <VProgressCircular indeterminate />
        </div>
      )

    return this.$slots?.default?.()
  },
})
