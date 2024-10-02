import { defineComponent, type PropType } from 'vue'

import {
  type DataTableHeaderItemsActionsAction,
  type DataTableHeaderItemsActionsProps,
  type DataTableProps,
  TableHeaderActions,
} from '@/components/DataTable'

export const ItemsActions = defineComponent({
  name: 'ItemsActions',
  props: {
    items: { type: Object as PropType<DataTableHeaderItemsActionsProps['items']>, required: true },
    actions: { type: Function as PropType<DataTableProps['itemActions']> },
  },
  render() {
    const actionsItems = this.actions?.(this.items) as DataTableHeaderItemsActionsAction<unknown>[]
    if (!actionsItems?.length || this.items.length < 2) return null
    return <TableHeaderActions items={this.items} actions={actionsItems} />
  },
})
