import { defineComponent } from 'vue'
import { VBadge, VMenu } from 'vuetify/components'

import { MonitorIcon } from '@icons/header'
import { compT as t } from '@/locales'
import { Badge } from '@/components/Badge'
import { DataTable, type DataTableHeaders } from '@/components/DataTable'
import { Message } from '@/components/Message'

const tPrefix = 'header.monitoring.criticals'

const headers: DataTableHeaders = [
  { key: 'title', title: t('name'), valueRender: v => t(`${tPrefix}.items.${v}`) },
  { key: 'msg', title: t('message'), valueRender: v => t(`${tPrefix}.items.${v}`) },
]

export const HeaderMonitoringMenu = defineComponent({
  name: 'HeaderMonitoringMenu',
  computed: {
    items() {
      return this.$store.state.app.notifications.criticals
    },
    count() {
      return this.items.length
    },
  },
  render() {
    return (
      <Badge class='header_menu' style={{ width: '32px' }} count={this.count}>
        <MonitorIcon />
        <VMenu activator='parent' openOnHover closeOnContentClick={false}>
          <div class='header_card scrollbar'>
            <div class='header_card_title'>
              {!!this.count && <VBadge content={this.count} class='mr-1' color='red' inline />}
              {this.$t(`${tPrefix}.menu.title`)}
            </div>
            {!!this.count && (
              <>
                <Message text={this.$t(`${tPrefix}.menu.message`)} variant='error' class='mb-2' grow />
                <DataTable headers={headers} items={this.items} short />
              </>
            )}
            {!this.count && <>{this.$t(`${tPrefix}.menu.noMessages`)}</>}
          </div>
        </VMenu>
      </Badge>
    )
  },
})
