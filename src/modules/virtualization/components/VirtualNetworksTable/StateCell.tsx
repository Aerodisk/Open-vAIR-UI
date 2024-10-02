import { capitalize, defineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { Icon } from '@/components/Icon'

const Icons: Record<string, JSX.Element | string> = {
  active: <Icon icon='checkCircleOutline' color='success' />,
  inactive: <Icon icon='closeCircleOutline' color='error' />,
}

export const StateCell = defineComponent({
  name: 'StateCell',
  props: { state: String },
  render() {
    return (
      <div class='d-flex align-center' style={{ gap: '4px' }}>
        {this.state && Icons[this.state]}
        <span>{capitalize(this.state || '')}</span>
      </div>
    )
  },
})
