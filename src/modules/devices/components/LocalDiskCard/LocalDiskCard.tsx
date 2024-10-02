import { defineComponent, PropType } from 'vue'

import type { LocalDisk } from '@api/generated'
import { DevicesActionTypes } from '@/store'

import { Card } from '@/components/Card'
import { IsExistsHoc, type IsExistsHocProps } from '@/components/IsExistsHoc'

import { LocalDiskCardMainTab, LocalDiskCardPartitionsTab } from './tabs'

const tPrefix = 'devices.physicalDisks.card'
const actions: IsExistsHocProps['actions'] = [DevicesActionTypes.GET_DISK_LIST]

export const LocalDiskCard = defineComponent({
  name: 'LocalDiskCard',
  props: { disk: Object as PropType<LocalDisk & { children: LocalDisk[] }> },
  render() {
    const disk = this.disk
    const cardProps = {
      backlink: { text: this.$t(`${tPrefix}.backlink`, { name: this.disk?.path || this.$t('noData') }) },
      maxWidth: 800,
    }

    if (!disk) {
      return (
        <Card {...cardProps}>
          <IsExistsHoc actions={actions}>{!disk && this.$t(`${tPrefix}.noData`)}</IsExistsHoc>
        </Card>
      )
    }

    return (
      <IsExistsHoc actions={actions}>
        <Card
          {...cardProps}
          tabs={[
            { text: this.$t(`${tPrefix}.tabs.main`), value: 'main' },
            { text: this.$t(`${tPrefix}.tabs.partitions`), value: 'partitions' },
          ]}
        >
          {{
            main: () => <LocalDiskCardMainTab disk={disk} />,
            partitions: () => <LocalDiskCardPartitionsTab disk={disk} />,
          }}
        </Card>
      </IsExistsHoc>
    )
  },
})
