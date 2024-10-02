import { defineComponent } from 'vue'
import { find } from 'lodash'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { VirtualNetworkCard } from '../components'

export const VirtualNetworkView = defineComponent({
  name: 'VirtualNetworkView',
  computed: {
    vnetId() {
      return `${this.$route.params.id}`
    },
    vnet() {
      return find(this.$store.state.virtualization.virtualNetworks, { id: this.vnetId })
    },
  },
  render() {
    return (
      <Breadcrumbs custom={{ id: this.vnet?.network_name || this.$t('noData') }}>
        <VirtualNetworkCard vnet={this.vnet} />
      </Breadcrumbs>
    )
  },
})
