import { defineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

import { Icon } from '@/components/Icon'

const icons: Record<string, JSX.Element | string> = {
  DOWN: <Icon icon='closeCircleOutline' color='error' />,
  UP: <Icon icon='checkCircleOutline' color='green' />,
  UNKNOWN: <Icon icon='helpCircleOutline' color='warn' />,
}

export const InterfaceStateCell = defineComponent({
  name: 'InterfaceStateCell',
  props: { state: { type: String, required: true } },
  render() {
    if (this.state == null) return null
    return (
      <div class='d-flex align-center' style={{ gap: '4px' }}>
        {icons[this.state]}
        {this.state}
      </div>
    )
  },
})
