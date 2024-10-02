import { capitalize, defineComponent, type PropType } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { VProgressCircular } from 'vuetify/components'

import { Icon } from '@/components/Icon'

type Status = string | null | undefined

const Icons: Record<string, JSX.Element | string> = {
  available: <Icon icon='checkCircleOutline' color='success' />,
  error: <Icon icon='alertCircleOutline' color='error' />,
  deleting: (
    <VProgressCircular size={22} width={2} color='error' indeterminate>
      <Icon icon='delete' size='xsmall' color='error' />
    </VProgressCircular>
  ),
  editing: (
    <VProgressCircular size={22} width={2} color='warn' indeterminate>
      <Icon icon='cog' size='xsmall' color='warn' />
    </VProgressCircular>
  ),
  extending: (
    <VProgressCircular size={22} width={2} color='warn' indeterminate>
      <Icon icon='cog' size='xsmall' color='warn' />
    </VProgressCircular>
  ),
  creating: (
    <VProgressCircular size={22} width={2} color='info' indeterminate>
      <Icon icon='wrench' size='xsmall' color='info' />
    </VProgressCircular>
  ),
  shut_offing: (
    <VProgressCircular size={22} width={2} color='warn' indeterminate>
      <Icon icon='stop' size='xsmall' color='warn' />
    </VProgressCircular>
  ),
  starting: (
    <VProgressCircular size={22} width={2} color='warn' indeterminate>
      <Icon icon='play' size='xsmall' color='warn' />
    </VProgressCircular>
  ),
  new: (
    <VProgressCircular size={22} width={2} color='info' indeterminate>
      <Icon icon='wrench' size='xsmall' color='info' />
    </VProgressCircular>
  ),
}

export const TableCellStatus = defineComponent({
  name: 'TableCellStatus',
  props: { status: [String, Boolean] as PropType<Status> },
  render() {
    return (
      <div class='d-flex align-center' style={{ gap: '4px' }}>
        {this.status && Icons[this.status]}
        <span>{capitalize(this.status || '')}</span>
      </div>
    )
  },
})
