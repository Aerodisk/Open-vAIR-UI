import { defineComponent } from 'vue'
import { VBadge, VMenu } from 'vuetify/components'

import { compT as t } from '@/locales'
import { WarnIcon } from '@icons/header'
import { Badge } from '@/components/Badge'
import type { DataTableHeaders } from '@/components/DataTable'
import { DataTable } from '@/components/DataTable'

const tPrefix = 'header.monitoring.warnings'

const headers: DataTableHeaders = [
  { key: 'title', title: t('name'), valueRender: v => t(`${tPrefix}.items.${v}`) },
  { key: 'msg', title: t('message'), valueRender: v => t(`${tPrefix}.items.${v}`) },
]

export const HeadersWarningMenu = defineComponent({
  name: 'HeadersWarningMenu',
  computed: {
    items() {
      return this.$store.state.app.notifications.warnings
    },
    count() {
      return this.items.length
    },
  },
  render() {
    return (
      <Badge class='header_menu' style={{ width: '32px' }} count={this.count} color='warn'>
        <WarnIcon />
        <VMenu activator='parent' openOnHover closeOnContentClick={false}>
          <div class='header_card scrollbar'>
            <div class='header_card_title'>
              {!!this.count && <VBadge content={this.count} class='mr-1' color='warn' inline />}
              {this.$t(`${tPrefix}.menu.title`)}
            </div>
            {!!this.count && <DataTable headers={headers} items={this.items} short />}
            {!this.count && <>{this.$t(`${tPrefix}.menu.noMessages`)}</>}
          </div>
        </VMenu>
      </Badge>
    )
  },
})
