import { defineComponent, type PropType } from 'vue'
import { isFunction } from 'lodash'
import { VMenu, VBtn, VList, VListItem, VListItemTitle } from 'vuetify/components'

import type { DataTableCellActionsProps } from '@/components/DataTable'
import { Icon } from '@/components/Icon'

export const TableCellActions = defineComponent({
  name: 'TableCellActions',
  props: {
    actions: {
      type: Object as PropType<DataTableCellActionsProps['actions']>,
      required: true,
    },
    item: {
      type: Object as PropType<DataTableCellActionsProps['item']>,
      required: true,
    },
  },
  render() {
    return (
      <VBtn class='table_cell_action_btn' size='small' variant='plain' rounded>
        <Icon icon='dotsVertical' size='small' />
        <VMenu activator='parent'>
          <VList density='compact'>
            {this.actions.map(i => (
              <VListItem key={i.title} onClick={() => i.onClick?.(this.item)}>
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
