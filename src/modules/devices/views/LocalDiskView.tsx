import { defineComponent } from 'vue'
import { find } from 'lodash'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LocalDiskCard } from '../components/LocalDiskCard'

export const LocalDiskView = defineComponent({
  name: 'LocalDiskView',
  computed: {
    path() {
      return `${this.$route.params.path}`
    },
    disk() {
      const disks = this.$store.state.devices.disks
      const disk = find(disks, { path: this.path })
      if (!disk) return
      return { ...disk, children: disks.filter(d => d.parent === disk.path && d.type === 'part') }
    },
  },
  render() {
    return (
      <Breadcrumbs custom={{ path: this.disk?.path || this.$t('noData') }}>
        <LocalDiskCard disk={this.disk} />
      </Breadcrumbs>
    )
  },
})
