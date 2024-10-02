import { defineComponent, type PropType } from 'vue'
import { GridItem } from 'vue3-grid-layout'

import { Icon } from '@/components/Icon'
import type { DashboardItemProp } from './types'

export const DraggableContainer = defineComponent({
  name: 'DraggableContainer',
  props: {
    item: {
      required: true,
      type: Object as PropType<DashboardItemProp>,
    },
  },
  computed: {
    isDraggable() {
      return this.$store.state.dashboard.gridSettings.isDraggable
    },
  },
  render() {
    const item = this.$props.item
    return (
      <GridItem {...item} dragAllowFrom='.draggable-handle'>
        {this.$slots.default?.()}
        {this.isDraggable && (
          <div class='draggable-handle'>
            <Icon icon='menu' size='small' color='#747A7D' />
          </div>
        )}
      </GridItem>
    )
  },
})
