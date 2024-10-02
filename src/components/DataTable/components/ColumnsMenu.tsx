import { capitalize, defineComponent, type JSXComponent, type PropType } from 'vue'
import { compose } from 'lodash/fp'
import { VCheckboxBtn, VList, VListItem, VListItemTitle, VMenu } from 'vuetify/components'

import { preventDefault, stopPropagation } from '@helpers'
import { Button } from '@/components/Button'
import type { DataTableProps } from '@/components/DataTable'
import { Icon } from '@/components/Icon'

export const ColumnsMenu = defineComponent({
  name: 'ColumnsMenu',
  props: {
    headers: { type: Array as PropType<DataTableProps['headers']>, required: true },
    displayedHeaders: { type: Array as PropType<DataTableProps['headers']>, required: true },
  },
  emits: ['toggle'],
  render() {
    return (
      <Button
        title={this.$t(`dataTable.columns`)}
        size='small'
        variant='plain'
        class='table_rowsPerPage_button btn_icon_right'
        style={{ opacity: 1 }}
        onClick={compose(stopPropagation, preventDefault)}
      >
        <Icon icon='chevronDown' size='xsmall' style='transform: translateY(1px)' />
        <VMenu activator='parent' closeOnContentClick={false}>
          <VList>
            {this.headers.map(i => {
              const title = capitalize(typeof i.title === 'string' ? i.title : i.title?.value)
              const checked = !!this.displayedHeaders.find(h => h.key === i.key)
              return (
                <VListItem key={i.key} onClick={() => this.$emit('toggle', i.key)} style={{ cursor: 'pointer' }}>
                  <div class='d-flex align-center' style={{ gap: '4px' }}>
                    <VCheckboxBtn
                      modelValue={checked}
                      trueIcon={(<Icon icon='checkboxMarked' size='small' />) as unknown as JSXComponent}
                      falseIcon={(<Icon icon='checkboxBlankOutline' size='small' />) as unknown as JSXComponent}
                      style={{ flexGrow: 0, pointerEvents: 'none' }}
                    />
                    <VListItemTitle>{title}</VListItemTitle>
                  </div>
                </VListItem>
              )
            })}
          </VList>
        </VMenu>
      </Button>
    )
  },
})
