import { defineComponent, type PropType } from 'vue'

import type { VirtualNetworkResponse } from '@api/generated'
import { CardInfoBlock } from '@/components/Card'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

export const VirtualNetworkCardMainTab = defineComponent({
  name: 'VirtualNetworkCardMainTab',
  props: { vnet: { type: Object as PropType<VirtualNetworkResponse>, required: true } },
  render() {
    const i = this.vnet
    return (
      <div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title='Имя' content={i.network_name} class='w-100' />
          <CardInfoBlock title='Bridge' content={i.bridge} class='w-100' />
          <CardInfoBlock title='forward_mode' content={i.forward_mode} class='w-100' />
        </div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title='Autostart' content={i.autostart} class='w-100' />
          <CardInfoBlock title='persistent' content={i.persistent} class='w-100' />
          <CardInfoBlock title='state' content={i.state} class='w-100' />
        </div>
        <CardInfoBlock title='virtual_port_type' content={i.virtual_port_type} />
        <CardInfoBlock title='virsh XML' class='mt-2'>
          <Button
            title='Посмотреть'
            size='small'
            variant='plain'
            style={{ padding: 0, fontSize: '12px', height: '17px' }}
          >
            <Modal title='Virsh XML'>
              <div style={{ whiteSpace: 'pre' }}>{i.virsh_xml}</div>
            </Modal>
          </Button>
        </CardInfoBlock>
      </div>
    )
  },
})
