import { capitalize, defineComponent, PropType } from 'vue'

import type { Storage } from '@api/generated'
import { CardInfoBlock } from '@/components/Card'
import { bytesToSize } from '@helpers'
import { ProgressLinearWidget } from '@/components/Widget'
import { TableCellStatus } from '@/components/DataTable'

const tPrefix = 'storages.card.tabs.main.fields'

export const StorageCardMainTab = defineComponent({
  name: 'StorageCardMainTab',
  props: { item: { type: Object as PropType<Storage>, required: true } },
  render() {
    const i = this.item
    return (
      <div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t('name')} content={i.name} class='w-100' />
          <CardInfoBlock title={this.$t('description')} content={i.description} class='w-100' />
          <CardInfoBlock title={this.$t('type')} content={i.storage_type} class='w-100' />
        </div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={this.$t('status')} class='w-100'>
            <TableCellStatus status={i.status} />
          </CardInfoBlock>
          <CardInfoBlock title={this.$t(`${tPrefix}.information`)} content={i.information} class='w-100' />
          <CardInfoBlock title={this.$t(`${tPrefix}.userId`)} content={i.user_id} class='w-100' />
        </div>
        <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
          <CardInfoBlock title={capitalize(this.$t('sizes.size'))} content={bytesToSize(i.size)} class='w-100' />
          <CardInfoBlock
            title={capitalize(this.$t('sizes.used'))}
            content={bytesToSize(i.size - i.available)}
            class='w-100'
          />
          <CardInfoBlock title={capitalize(this.$t('sizes.availPercentage'))} class='w-100'>
            <ProgressLinearWidget value={(i.size - i.available) / (i.size / 100)} />
          </CardInfoBlock>
        </div>
        {i.storage_type === 'localfs' && (
          <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
            <CardInfoBlock title={this.$t(`${tPrefix}.fsType`)} content={i.storage_extra_specs.fs_type} class='w-100' />
            <CardInfoBlock title={this.$t('path')} content={i.storage_extra_specs.path} class='w-100' />
            <CardInfoBlock
              title={this.$t(`${tPrefix}.mountPoint`)}
              content={i.storage_extra_specs.mount_point}
              class='w-100'
            />
          </div>
        )}
        {i.storage_type === 'nfs' && (
          <div class='d-flex justify-space-between mb-2' style={{ gap: '16px' }}>
            <CardInfoBlock title={this.$t('ip')} content={i.storage_extra_specs.ip} class='w-100' />
            <CardInfoBlock
              title={this.$t(`${tPrefix}.mountVersion`)}
              content={i.storage_extra_specs.mount_version}
              class='w-100'
            />
            <CardInfoBlock title={this.$t('path')} content={i.storage_extra_specs.path} class='w-100' />
          </div>
        )}
      </div>
    )
  },
})
