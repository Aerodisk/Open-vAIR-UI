import { defineComponent } from 'vue'

import { BlockDevicesActionTypes } from '@/store'

import { compT as t } from '@/locales'
import { DataTable, DataTableHeaders, TableCellStatus } from '@/components/DataTable'
import { IsExistsHoc } from '@/components/IsExistsHoc'
import type { ButtonProps } from '@/components/Button'
import { useWithConfirm } from '@/components/Modal'

import { IqnBlock } from '../IqnBlock'
import { SessionLoginModal } from '../SessionLoginModal'
import { useActions } from './actions'

const tPrefix = 'blockDevices'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'inf_type', title: t('type') },
  { key: 'ip', title: 'IP' },
  { key: 'port', title: t(`${tPrefix}.table.port`) },
  { key: 'status', title: t('status'), valueRender: v => <TableCellStatus status={v} /> },
]

export const SessionsTable = defineComponent({
  name: 'SessionsTable',
  computed: {
    items() {
      return this.$store.state.blockDevices.sessions
    },
    error() {
      return this.$store.state.actionsState[BlockDevicesActionTypes.GET_SESSION_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(BlockDevicesActionTypes.GET_SESSION_LIST, undefined)
    },
    scan() {
      return useWithConfirm()({
        title: this.$t(`${tPrefix}.actions.scan.modalTitle`),
        text: this.$t(`${tPrefix}.actions.scan.text`),
        confirmText: this.$t(`${tPrefix}.actions.scan.confirmText`),
        onConfirm: () => this.$store.dispatch(BlockDevicesActionTypes.FC_LIP_SCAN, undefined),
      })
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      {
        title: this.$t(`${tPrefix}.actions.scan.title`),
        icon: { icon: 'cloudSearch', size: 'small' },
        onClick: this.scan,
      },
      {
        title: this.$t(`${tPrefix}.actions.login.title`),
        icon: { icon: 'plus', size: 'small' },
        modal: <SessionLoginModal />,
      },
    ]

    return (
      <IsExistsHoc actions={[BlockDevicesActionTypes.GET_SESSION_LIST, BlockDevicesActionTypes.GET_IQN]}>
        <IqnBlock />
        <DataTable
          headers={headers}
          items={this.items}
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
