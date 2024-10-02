import { defineComponent } from 'vue'

import { MonitoringActionTypes } from '@/store'
import { compT as t } from '@/locales'
import { formatDate } from '@helpers'

import { IsExistsHoc } from '@/components/IsExistsHoc'
import { DataTable, DataTableHeaders } from '@/components/DataTable'
import type { ButtonProps } from '@/components/Button'
import { Icon } from '@/components/Icon'

const tPrefix = 'journal.table'

const headers: DataTableHeaders = [
  { key: 'id', title: 'ID', visible: false },
  { key: 'module', title: t(`${tPrefix}.module`) },
  { key: 'event', title: t(`${tPrefix}.event`) },
  { key: 'information', title: t(`${tPrefix}.information`) },
  { key: 'object_id', title: t(`${tPrefix}.objectId`) },
  { key: 'timestamp', title: t(`${tPrefix}.timestamp`), valueRender: v => formatDate(v, { from: 'unix' }) },
  { key: 'user_id', title: t(`${tPrefix}.userId`) },
]

export const JournalTable = defineComponent({
  name: 'JournalTable',
  computed: {
    items() {
      return this.$store.state.monitoring.events
    },
    error() {
      return this.$store.state.actionsState[MonitoringActionTypes.GET_EVENT_LIST].error
    },
  },
  methods: {
    refresh() {
      return this.$store.dispatch(MonitoringActionTypes.GET_EVENT_LIST, undefined)
    },
  },
  render() {
    const tableActions: ButtonProps[] = [
      {
        title: this.$t('journal.actions.download.title'),
        icon: <Icon icon='download' size='small' />,
        onClick: () => this.$store.dispatch(MonitoringActionTypes.DOWNLOAD_LOG, undefined),
      },
    ]

    return (
      <IsExistsHoc actions={[MonitoringActionTypes.GET_EVENT_LIST]}>
        <DataTable
          headers={headers}
          items={this.items}
          tableActions={tableActions}
          onRefresh={this.refresh}
          error={this.error}
          withQuery
        />
      </IsExistsHoc>
    )
  },
})
