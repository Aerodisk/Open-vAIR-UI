import { defineComponent, PropType } from 'vue'

import type { Storage } from '@api/generated'
import { StorageActionTypes } from '@/store'

import { Card } from '@/components/Card'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import { ItemActions } from '@/components/DataTable/components'

import { useActions } from '../StoragesTable/actions'
import { StorageCardMainTab, StorageCardVolumesTab } from './tabs'

const tPrefix = 'storages.card'

const actions = [StorageActionTypes.GET_STORAGE_LIST, StorageActionTypes.GET_VOLUME_LIST]

export const StorageCard = defineComponent({
  name: 'StorageCard',
  props: { storage: Object as PropType<Storage> },
  render() {
    const storage = this.storage
    const name = storage?.name ? `${storage.storage_type} | ${storage.name}` : ''
    const cardProps = {
      backlink: { text: `${this.$t(`${tPrefix}.backlink`)} - ${name || this.$t('noData')}` },
      maxWidth: 800,
    }

    if (!storage) {
      return (
        <Card {...cardProps}>
          <IsExistsHoc actions={actions}>{!this.storage && this.$t(`${tPrefix}.noData`)}</IsExistsHoc>
        </Card>
      )
    }

    return (
      <IsExistsHoc actions={actions}>
        <Card
          {...cardProps}
          tabs={[
            { value: 'main', text: this.$t(`${tPrefix}.tabs.main.title`) },
            { value: 'volumes', text: this.$t(`${tPrefix}.tabs.volumes.title`) },
          ]}
        >
          {{
            default: () => (
              <ItemActions
                item={storage}
                actions={useActions}
                style={{ position: 'absolute', top: '24px', right: '24px' }}
              />
            ),
            main: () => <StorageCardMainTab item={storage} />,
            volumes: () => <StorageCardVolumesTab item={storage} />,
          }}
        </Card>
      </IsExistsHoc>
    )
  },
})
