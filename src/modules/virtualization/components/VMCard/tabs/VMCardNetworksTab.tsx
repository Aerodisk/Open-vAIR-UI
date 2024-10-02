import { defineComponent, PropType } from 'vue'
import type { VirtualMachineInfo } from '@api/generated'

const tPrefix = 'virtualization.vm.card.tabs.networks'

export const VMCardNetworksTab = defineComponent({
  name: 'VMCardNetworksTab',
  props: { vm: { type: Object as PropType<VirtualMachineInfo>, required: true } },
  render() {
    const vnets = this.vm.virtual_interfaces
    // const name =   if (this.v.portgroup) return `${this.v.portgroup} (${this.v.interface})`
    // return this.v.interface
    return (
      <div class='d-flex flex-column' style={{ gap: '8px' }}>
        {!vnets?.length && this.$t(`${tPrefix}.noData`)}
        {vnets.map(i => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid rgb(var(--v-theme-form-input-border))',
              padding: '4px 8px',
              borderRadius: '3px',
              color: 'rgb(var(--v-theme-form-input-label))',
              height: '34px',
            }}
          >
            <div>{i.portgroup ? `${i.portgroup} (${i.interface})` : `${i.interface}`}</div>
            <div>
              {i.mode} | {i.model}
            </div>
            <div>{i.mac}</div>
          </div>
        ))}
      </div>
    )
  },
})
