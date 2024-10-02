import { defineComponent } from 'vue'

import type { PortGroup } from '@api/generated'
import { compT as t } from '@/locales'
import { VirtualizationActionTypes } from '@/store/modules'

import { IsExistsHoc } from '@/components/IsExistsHoc'
import { DataTable, DataTableHeaders } from '@/components/DataTable'
import type { ButtonProps } from '@/components/Button'

import { getVnetPath } from '../../utils'
import { VirtualNetworkCreateModal } from '../VirtualNetworkCreateModal'
import { useActions } from './actions'
import { StateCell } from './StateCell'

const tPrefix = 'virtualization.virtualNetworks.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'network_name', title: t('name'), link: (_, i) => getVnetPath(i.id) },
  { key: 'forward_mode', title: t(`${tPrefix}.forwardMode`) },
  { key: 'bridge', title: t(`${tPrefix}.bridge`) },
  { key: 'virtual_port_type', title: t(`${tPrefix}.virtualPortType`) },
  { key: 'state', title: t('state'), valueRender: v => <StateCell state={v} /> },
  { key: 'autostart', title: t(`${tPrefix}.autostart`) },
  { key: 'persistent', title: t(`${tPrefix}.persistent`) },
  {
    key: 'port_groups',
    title: t(`${tPrefix}.portgroups`),
    valueRender: v => v.map((i: PortGroup) => i.port_group_name).join(', '),
  },
]

export const VirtualNetworksTable = defineComponent({
  name: 'VirtualNetworksTable',
  computed: {
    items() {
      return this.$store.state.virtualization.virtualNetworks
    },
    error() {
      return this.$store.state.actionsState[VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      { title: this.$t('create'), icon: { icon: 'plus', size: 'small' }, modal: <VirtualNetworkCreateModal /> },
    ]

    return (
      <IsExistsHoc actions={[VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST]}>
        <DataTable
          items={this.items}
          headers={headers}
          onRefresh={this.refresh}
          error={this.error}
          tableActions={tableActions}
          itemActions={useActions}
          withQuery
        />
      </IsExistsHoc>
    )
  },
})
