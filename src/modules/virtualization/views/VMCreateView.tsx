import { defineComponent } from 'vue'

import { DevicesActionTypes, StorageActionTypes, VirtualizationActionTypes } from '@/store'
import { Card } from '@/components/Card'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { IsExistsHoc } from '@/components/IsExistsHoc'

import { VMForm } from '../components'

const actions = [
  StorageActionTypes.GET_STORAGE_LIST,
  StorageActionTypes.GET_VOLUME_LIST,
  StorageActionTypes.GET_IMAGE_LIST,
  DevicesActionTypes.GET_BRIDGE_LIST,
  VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST,
]

export const VMCreateView = defineComponent({
  name: 'VMCreateView',
  render() {
    const backlink = { text: this.$t('virtualization.vm.card.formBacklink.create') }

    return (
      <Breadcrumbs>
        <Card backlink={backlink} maxWidth={800}>
          <IsExistsHoc actions={actions} height={400}>
            <VMForm />
          </IsExistsHoc>
        </Card>
      </Breadcrumbs>
    )
  },
})
