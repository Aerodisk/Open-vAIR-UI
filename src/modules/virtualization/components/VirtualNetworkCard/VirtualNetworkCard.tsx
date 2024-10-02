import { defineComponent, type PropType } from 'vue'

import type { VirtualNetworkResponse } from '@api/generated'
import { VirtualizationActionTypes } from '@/store/modules'

import { ItemActions } from '@/components/DataTable/components'
import { Card } from '@/components/Card'
import { IsExistsHoc } from '@/components/IsExistsHoc'

import { VirtualNetworkCardMainTab, VirtualNetworkCardPortgroupTab } from './tabs'

import { useActions } from '../VirtualNetworksTable/actions'

const actions = [VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST]

export const VirtualNetworkCard = defineComponent({
  name: 'VirtualNetworkCard',
  props: { vnet: Object as PropType<VirtualNetworkResponse> },
  render() {
    const vnet = this.vnet
    const cardProps = {
      backlink: { text: `Виртуальная сеть - ${this.vnet?.network_name || this.$t('noData')}` },
      maxWidth: 800,
    }

    if (!vnet) {
      return (
        <Card {...cardProps}>
          <IsExistsHoc actions={actions}>
            {!this.vnet && 'Не удалось получить данные о виртуальной сети. Произошла ошибка'}
          </IsExistsHoc>
        </Card>
      )
    }

    return (
      <IsExistsHoc actions={actions}>
        <Card
          {...cardProps}
          tabs={[
            { text: 'Основные настройки', value: 'main' },
            { text: 'Портгруппы', value: 'portgroup' },
          ]}
        >
          {{
            default: () => (
              <ItemActions
                item={vnet}
                actions={useActions}
                style={{ position: 'absolute', top: '24px', right: '24px' }}
              />
            ),
            main: () => <VirtualNetworkCardMainTab vnet={vnet} />,
            portgroup: () => <VirtualNetworkCardPortgroupTab vnet={vnet} />,
          }}
        </Card>
      </IsExistsHoc>
    )
  },
})
