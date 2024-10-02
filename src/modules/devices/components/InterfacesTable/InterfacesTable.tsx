import { defineComponent } from 'vue'

import { compT as t } from '@/locales'
import { DevicesActionTypes } from '@/store'
import { DataTable, type DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import type { ButtonProps } from '@/components/Button'

import { BridgeCreateModal } from '../BridgeCreateModal'
import { useActions } from './actions'
import { InterfaceStateCell } from './InterfaceStateCell'

const tPrefix = 'devices.networkAdapters.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name') },
  { key: 'ip', title: 'IP' },
  { key: 'inf_type', title: t('type') },
  { key: 'mac', title: t(`${tPrefix}.mac`), valueRender: v => v?.toUpperCase() },
  { key: 'netmask', title: t(`${tPrefix}.mask`) },
  { key: 'power_state', title: t('state'), valueRender: v => <InterfaceStateCell state={v} /> },
  { key: 'mtu', title: 'MTU' },
  { key: 'speed', title: t('speed') },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'interface_extra_specs.duplex', title: 'Duplex' },
  { key: 'interface_extra_specs.slot_port', title: 'Slot port' },
]

export const InterfacesTable = defineComponent({
  name: 'InterfacesTable',
  computed: {
    items() {
      return this.$store.state.devices.interfaces
    },
    error() {
      return this.$store.state.actionsState[DevicesActionTypes.GET_INTERFACE_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(DevicesActionTypes.GET_INTERFACE_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      { title: this.$t('create'), icon: { icon: 'plus', size: 'small' }, modal: <BridgeCreateModal /> },
    ]

    return (
      <IsExistsHoc actions={[DevicesActionTypes.GET_INTERFACE_LIST]}>
        <DataTable
          headers={headers}
          items={this.items}
          onRefresh={this.refresh}
          tableActions={tableActions}
          itemActions={useActions}
          error={this.error}
          withQuery
        />
      </IsExistsHoc>
    )
  },
})
