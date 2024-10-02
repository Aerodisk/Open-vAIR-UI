import { defineComponent, type PropType } from 'vue'

import { DraggableContainer } from './DraggableContainer'
import { DashboardWidgets } from './widgets'
import type { DashboardItemProp } from './types'

export const DashboardWidget = defineComponent({
  name: 'DashboardWidget',
  props: {
    item: {
      required: true,
      type: Object as PropType<DashboardItemProp>,
    },
  },
  render() {
    const item = this.$props.item
    const Component = DashboardWidgets[item.i]
    if (!Component) return null
    return (
      <DraggableContainer item={item}>
        <Component />
      </DraggableContainer>
    )
  },
})
