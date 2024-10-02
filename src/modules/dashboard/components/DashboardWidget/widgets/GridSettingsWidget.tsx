import { defineComponent } from 'vue'

import { Icon } from '@/components/Icon'
import { DashboardSettingsModal } from '../../DashboardSettingsModal'

export const GridSettingsWidget = defineComponent({
  name: 'GridSettingsWidget',
  data() {
    return { open: false }
  },
  methods: {
    openModal() {
      this.open = !this.open
    },
  },
  render() {
    return (
      <>
        <div class='dashboard-widget add-new-widget pa-4' onClick={this.openModal}>
          <Icon icon='cog' size={48} style={{ minWidth: '48px', minHeight: '48px' }} />
          <span>{this.$t('dashboard.widgets.gridSettingsWidget.title')}</span>
        </div>
        <DashboardSettingsModal modelValue={this.open} onUpdate:modelValue={newValue => (this.open = newValue)} />
      </>
    )
  },
})
