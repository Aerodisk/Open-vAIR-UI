import { defineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { Icon } from '@/components/Icon'

const tPrefix = 'virtualization.vm.table.powerState'

const icons: Record<string, JSX.Element | string> = {
  shut_off: <Icon icon='closeCircleOutline' color='error' />,
  running: <Icon icon='checkCircleOutline' color='success' />,
}

export const VMPowerStatusSell = defineComponent({
  name: 'VMPowerStatusSell',
  props: { v: { type: String, required: true } },
  render() {
    const v = this.v.toLowerCase()
    return (
      <div class='d-flex align-center' style={{ gap: '4px' }}>
        {icons[v]}
        {this.$t(`${tPrefix}.${v}`)}
      </div>
    )
  },
})
