import { defineComponent, type PropType } from 'vue'

import { type DataTableCellActionsAction, type DataTableProps, TableCellActions } from '@/components/DataTable'

export const ItemActions = defineComponent({
  name: 'ItemActions',
  props: {
    item: { type: Object as PropType<unknown>, required: true },
    actions: { type: Function as PropType<DataTableProps['itemActions']> },
  },
  render() {
    const actionsItems = this.actions?.(this.item) as DataTableCellActionsAction<unknown>[]
    if (!actionsItems?.length) return null
    return <TableCellActions item={this.item} actions={actionsItems} />
  },
})
