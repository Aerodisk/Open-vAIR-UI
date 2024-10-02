import { defineComponent } from 'vue'
import { VirtualizationActionTypes } from '@/store/modules'
import { routes } from '@/router'
import { bytesToSize } from '@helpers'
import { getVmPath } from '@/modules/virtualization/utils'
import { compT as t } from '@/locales'

import { IsExistsHoc } from '@/components/IsExistsHoc'
import { DataTable, type DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import type { ButtonProps } from '@/components/Button'

import { useActions } from './actions'
import { VMPowerStatusSell } from './VMPowerStatusSell'

const tPrefix = 'virtualization.vm.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'name', title: t('name'), link: (_, i) => getVmPath(i.id) },
  { key: 'description', title: t('description') },
  { key: 'ram.size', title: t('ram'), valueRender: bytesToSize },
  { key: 'cpu.sockets', title: t(`${tPrefix}.cpu`), valueRender: (v, i) => (i.cpu.type === 'dynamic' ? '-' : v) },
  { key: 'cpu.cores', title: t(`${tPrefix}.cores`), valueRender: (v, i) => (i.cpu.type === 'dynamic' ? '-' : v) },
  { key: 'cpu.threads', title: t(`${tPrefix}.threads`), valueRender: (v, i) => (i.cpu.type === 'dynamic' ? '-' : v) },
  {
    key: 'cpu.vcpu',
    title: t(`${tPrefix}.vcpu`),
    valueRender: (v, i) => (i.cpu.type === 'dynamic' ? v : i.cpu.sockets * i.cpu.cores * i.cpu.threads),
  },
  { key: 'cpu.type', title: t(`${tPrefix}.topology`) }, // Кол.ЦПУ * Ядер * Потоков на ядро
  { key: 'power_state', title: t(`${tPrefix}.powerState.header`), valueRender: v => <VMPowerStatusSell v={v} /> },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
  { key: 'information', title: t(`${tPrefix}.information`) },
]

export const VMTable = defineComponent({
  name: 'VMTable',
  computed: {
    items() {
      return this.$store.state.virtualization.vm
    },
    error() {
      return this.$store.state.actionsState[VirtualizationActionTypes.GET_VM_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(VirtualizationActionTypes.GET_VM_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      {
        title: this.$t('create'),
        icon: { icon: 'plus', size: 'small' },
        onClick: () => this.$router.push(routes.virtualization.virtualMachines.create),
      },
    ]

    return (
      <IsExistsHoc actions={[VirtualizationActionTypes.GET_VM_LIST]}>
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
