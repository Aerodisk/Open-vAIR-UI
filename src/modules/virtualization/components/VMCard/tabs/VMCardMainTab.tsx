import { defineComponent, PropType } from 'vue'

import type { VirtualMachineInfo } from '@api/generated'
import { CardSectionTitle, CardInfoBlock } from '@/components/Card'

import { VMPowerStatusSell } from '../../VMTable/VMPowerStatusSell'
import { TableCellStatus } from '@/components/DataTable'

const tPrefix = 'virtualization.vm.card.tabs.main'

export const VMCardMainTab = defineComponent({
  name: 'VMCardMainTab',
  props: { vm: { type: Object as PropType<VirtualMachineInfo>, required: true } },
  render() {
    return (
      <div>
        <CardSectionTitle content={this.$t(`${tPrefix}.sections.main`)} />
        <div class='d-flex justify-space-between my-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.name`)} content={this.vm.name} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.powerState`)} class='w-100'>
            <VMPowerStatusSell v={this.vm.power_state} />
          </CardInfoBlock>
          <CardInfoBlock title={this.$t('status')} class='w-100'>
            <TableCellStatus status={this.vm.status} />
          </CardInfoBlock>
        </div>
        <CardInfoBlock title={this.$t(`${tPrefix}.fields.description`)} content={this.vm.description} class='mt-2' />
        <CardInfoBlock title={this.$t(`${tPrefix}.fields.information`)} content={this.vm.information} class='mt-2' />
        <CardSectionTitle content={this.$t(`${tPrefix}.sections.boot`)} class='mt-2' />
        <div class='d-flex justify-space-between my-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.osType`)} content={this.vm.os.os_type} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.fields.osVariant`)} content={this.vm.os.os_variant} class='w-100' />
          <CardInfoBlock
            title={this.$t(`${tPrefix}.fields.bootDevice`)}
            content={this.vm.os.boot_device}
            class='w-100'
          />
        </div>
        <div class='d-flex justify-space-between mt-2' style={{ gap: '16px' }}>
          <CardInfoBlock title='BIOS' content={this.vm.os.bios} class='w-100' />
          <CardInfoBlock
            title={this.$t(`${tPrefix}.fields.graphicsDriver`)}
            content={this.vm.os.graphic_driver}
            class='w-100'
          />
          <CardInfoBlock
            title={this.$t(`${tPrefix}.fields.graphicType`)}
            content={this.vm.graphic_interface.connect_type}
            class='w-100'
          />
        </div>
      </div>
    )
  },
})
