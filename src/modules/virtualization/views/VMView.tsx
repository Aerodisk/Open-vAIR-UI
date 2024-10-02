import { defineComponent } from 'vue'
import { find } from 'lodash'

import { Breadcrumbs } from '@/components/Breadcrumbs'

import { VMCard } from '../components/VMCard'

export const VMView = defineComponent({
  name: 'VMView',
  computed: {
    vmId() {
      return `${this.$route.params.id}`
    },
    vm() {
      return find(this.$store.state.virtualization.vm, { id: this.vmId })
    },
  },
  render() {
    return (
      <Breadcrumbs custom={{ id: this.vm?.name || this.$t('noData') }}>
        <VMCard vm={this.vm} />
      </Breadcrumbs>
    )
  },
})
