import { defineComponent, PropType } from 'vue'

import type { VirtualMachineInfo } from '@api/generated'
import { DevicesActionTypes, StorageActionTypes, VirtualizationActionTypes } from '@/store/modules'
import { Card } from '@/components/Card'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import { ItemActions } from '@/components/DataTable/components'

import { useActions } from '../VMTable/actions'
import { VMCardCpuRamTab, VMCardDisksTab, VMCardImagesTab, VMCardNetworksTab, VMCardMainTab } from './tabs'

const tPrefix = 'virtualization.vm.card'

const actions = [
  StorageActionTypes.GET_STORAGE_LIST,
  StorageActionTypes.GET_VOLUME_LIST,
  StorageActionTypes.GET_IMAGE_LIST,
  DevicesActionTypes.GET_BRIDGE_LIST,
  VirtualizationActionTypes.GET_VM_LIST,
]

export const VMCard = defineComponent({
  name: 'VMCard',
  props: { vm: Object as PropType<VirtualMachineInfo> },
  render() {
    const vm = this.vm
    const cardProps = {
      backlink: { text: `${this.$t(`${tPrefix}.backlink`)} - ${this.vm?.name || this.$t('noData')}` },
      maxWidth: 800,
    }

    if (!vm) {
      return (
        <Card {...cardProps}>
          <IsExistsHoc actions={actions}>{!this.vm && this.$t(`${tPrefix}.noData`)}</IsExistsHoc>
        </Card>
      )
    }

    return (
      <IsExistsHoc actions={actions}>
        <Card
          {...cardProps}
          tabs={[
            { value: 'main', text: this.$t(`${tPrefix}.tabs.main.title`) },
            { value: 'cpuRam', text: this.$t(`${tPrefix}.tabs.cpuRam.title`) },
            { value: 'disks', text: this.$t(`${tPrefix}.tabs.disks.title`) },
            { value: 'images', text: this.$t(`${tPrefix}.tabs.images.title`) },
            { value: 'network', text: this.$t(`${tPrefix}.tabs.network.title`) },
          ]}
        >
          {{
            default: () => (
              <ItemActions
                item={vm}
                actions={useActions}
                style={{ position: 'absolute', top: '24px', right: '24px' }}
              />
            ),
            main: () => <VMCardMainTab vm={vm} />,
            cpuRam: () => <VMCardCpuRamTab vm={vm} />,
            disks: () => <VMCardDisksTab vm={vm} />,
            images: () => <VMCardImagesTab vm={vm} />,
            network: () => <VMCardNetworksTab vm={vm} />,
          }}
        </Card>
      </IsExistsHoc>
    )
  },
})
