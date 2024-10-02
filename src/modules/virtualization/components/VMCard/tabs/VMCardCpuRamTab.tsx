import { defineComponent, PropType } from 'vue'
import { VSpacer } from 'vuetify/components'

import type { VirtualMachineInfo } from '@api/generated'
import { bytesToSize } from '@helpers'
import { CardInfoBlock, CardSectionTitle } from '@/components/Card'

const tPrefix = 'virtualization.vm.card.tabs.cpuRam'

export const VMCardCpuRamTab = defineComponent({
  name: 'VMCardCpuRamTab',
  props: { vm: { type: Object as PropType<VirtualMachineInfo>, required: true } },
  render() {
    return (
      <div>
        <CardSectionTitle content={this.$t(`${tPrefix}.sections.cpu`)} />
        <div class='d-flex justify-space-between my-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.cpuModel`)} content={this.vm.cpu.model} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.topology`)} content={this.vm.cpu.type} class='w-100' />
          {this.vm.cpu.type === 'dynamic' ? (
            <CardInfoBlock title={this.$t(`${tPrefix}.fields.vCores`)} content={this.vm.cpu.vcpu} class='w-100' />
          ) : (
            <VSpacer class='w-100' />
          )}
        </div>
        {this.vm.cpu.type === 'static' && (
          <div class='d-flex justify-space-between my-2' style={{ gap: '16px' }}>
            <CardInfoBlock title={this.$t(`${tPrefix}.fields.sockets`)} content={this.vm.cpu.sockets} class='w-100' />
            <CardInfoBlock title={this.$t(`${tPrefix}.fields.cores`)} content={this.vm.cpu.cores} class='w-100' />
            <CardInfoBlock title={this.$t(`${tPrefix}.fields.threads`)} content={this.vm.cpu.threads} class='w-100' />
          </div>
        )}

        <CardSectionTitle content={this.$t(`${tPrefix}.sections.ram`)} class='my-2' />
        <CardInfoBlock
          title={this.$t(`${tPrefix}.fields.size`)}
          content={bytesToSize(this.vm.ram.size)}
          class='w-100'
        />
      </div>
    )
  },
})
