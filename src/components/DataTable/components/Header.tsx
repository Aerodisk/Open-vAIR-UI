import { capitalize, defineComponent, type PropType } from 'vue'
import { pick } from 'lodash'

import type { DataTableHeader, DataTableSortBy } from '@/components/DataTable'
import { SortByAscIcon, SortByDescIcon } from '@icons/table'

export const Header = defineComponent({
  name: 'DataTableHeaders',
  props: {
    header: {
      type: Object as PropType<DataTableHeader>,
      required: true,
    },
    sortBy: {
      type: Array as PropType<DataTableSortBy>,
      required: true,
    },
  },
  render() {
    const style = pick(this.header, ['width', 'minWidth', 'maxWidth'])

    const title = typeof this.header.title === 'string' ? this.header.title : this.header.title.value
    const isSort = !!this.sortBy.find(i => i.key === this.header.key)
    const isAscSort = !!this.sortBy.find(i => i.key === this.header.key && i.order === 'asc')
    const isDescSort = !!this.sortBy.find(i => i.key === this.header.key && i.order === 'desc')

    return (
      <div style={style}>
        {capitalize(title)}
        {this.header.sortable && (
          <div class={`column_sort${isSort ? ' active' : ''}`}>
            <SortByAscIcon class={isAscSort ? 'active' : ''} />
            <SortByDescIcon class={isDescSort ? 'active' : ''} />
          </div>
        )}
      </div>
    )
  },
})
