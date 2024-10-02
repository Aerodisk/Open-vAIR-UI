import { isFunction } from 'lodash'
import { defineComponent, type PropType } from 'vue'
import { VMenu, VBtn, VList, VListItem, VListItemTitle } from 'vuetify/components'

import type { DataTableHeaderItemsActionsProps } from '@/components/DataTable'
import { Icon } from '@/components/Icon'

export const TableHeaderActions = defineComponent({
  name: 'TableHeaderActions',
  props: {
    actions: {
      type: Array as PropType<DataTableHeaderItemsActionsProps['actions']>,
      required: true,
    },
    items: {
      type: Array as PropType<DataTableHeaderItemsActionsProps['items']>,
      required: true,
    },
  },
  render() {
    return (
      <VBtn
        class='table_cell_action_btn table_head_action_btn'
        size='small'
        variant='plain'
        rounded
        style={!this.items.length || !this.actions.length ? { opacity: 0, visibility: 'hidden' } : undefined}
      >
        <Icon icon='dotsVertical' size='small' />
        <VMenu activator='parent'>
          <VList density='compact'>
            {this.actions.map(i => (
              <VListItem key={i.title} disabled={i.disabled} onClick={() => i.onClick?.(this.items)}>
                <VListItemTitle class='d-flex flex-row align-center'>
                  {isFunction(i.icon) ? <i.icon /> : i.icon}
                  <span class={i.icon ? 'ml-2' : ''}>{i.title}</span>
                </VListItemTitle>
              </VListItem>
            ))}
          </VList>
        </VMenu>
        <>{this.actions.map(i => i.modal)}</>
      </VBtn>
    )
  },
})
