import { defineComponent } from 'vue'
import { find } from 'lodash'

import { DevicesActionTypes, StorageActionTypes } from '@/store'
import { VirtualizationActionTypes } from '@/store/modules'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import { Card } from '@/components/Card'

import { VMForm } from '../components'

const actions = [
  StorageActionTypes.GET_STORAGE_LIST,
  StorageActionTypes.GET_VOLUME_LIST,
  StorageActionTypes.GET_IMAGE_LIST,
  DevicesActionTypes.GET_BRIDGE_LIST,
  VirtualizationActionTypes.GET_VM_LIST,
]

export const VMEditView = defineComponent({
  name: 'VMEditView',
  computed: {
    vmId() {
      return `${this.$route.params.id}`
    },
    vm() {
      return find(this.$store.state.virtualization.vm, { id: this.vmId })
    },
  },
  render() {
    const name = this.vm?.name || this.$t('noData')
    const backlink = { text: `${this.$t('virtualization.vm.card.formBacklink.edit')} - ${name}` }

    return (
      <Breadcrumbs custom={{ id: name }}>
        <Card backlink={backlink} maxWidth={800}>
          <IsExistsHoc actions={actions}>
            {this.vm ? <VMForm vm={this.vm} /> : this.$t('virtualization.vm.form.receivingVmError')}
          </IsExistsHoc>
        </Card>
      </Breadcrumbs>
    )
  },
})
