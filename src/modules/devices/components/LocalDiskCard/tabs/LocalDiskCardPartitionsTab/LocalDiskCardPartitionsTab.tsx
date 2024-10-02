import { defineComponent, PropType } from 'vue'
import { cloneDeep, sortBy } from 'lodash'

import type { LocalDisk } from '@api/generated'
import { bytesToSize } from '@helpers'
import { CardSectionTitle } from '@/components/Card'

import { PartitionsPieChart } from './PartitionsPieChart'
import { PartitionsTable } from './PartitionsTable'

const tPrefix = 'devices.physicalDisks.card'

export const LocalDiskCardPartitionsTab = defineComponent({
  name: 'LocalDiskCardPartitionsTab',
  props: { disk: { type: Object as PropType<LocalDisk & { children: LocalDisk[] }>, required: true } },
  render() {
    const disk = cloneDeep(this.disk)
    disk.children = disk.children || sortBy(disk.children, 'path')

    return (
      <div>
        <CardSectionTitle content={this.$t(`${tPrefix}.totalSize`) + bytesToSize(this.disk.size)} />
        <PartitionsPieChart disk={disk} />
        <PartitionsTable disk={disk} />
      </div>
    )
  },
})
