import { capitalize, defineComponent, PropType } from 'vue'

import type { LocalDisk } from '@api/generated'

import { CardInfoBlock } from '@/components/Card'
import { bytesToSize } from '@helpers'

const tPrefix = 'devices.physicalDisks.table'

export const LocalDiskCardMainTab = defineComponent({
  name: 'LocalDiskCardMainTab',
  props: { disk: { type: Object as PropType<LocalDisk & { children: LocalDisk[] }>, required: true } },
  render() {
    const i = this.disk
    return (
      <div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t('path')} content={i.path} class='w-100' />
          <CardInfoBlock title={capitalize(this.$t('sizes.size'))} content={bytesToSize(i.size)} class='w-100' />
          <CardInfoBlock title={this.$t('type')} content={i.type} class='w-100' />
        </div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t(`${tPrefix}.fsType`)} content={i.fstype} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.mountpoint`)} content={i.mountpoint} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.fsId`)} content={i.fs_uuid} class='w-100' />
        </div>
        <CardInfoBlock title={this.$t(`${tPrefix}.parent`)} content={i.parent} class='w-100' />
      </div>
    )
  },
})
