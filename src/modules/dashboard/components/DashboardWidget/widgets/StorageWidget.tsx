import { defineComponent } from 'vue'
import { CountWidget, ProgressLinearWidget } from '@/components/Widget'
import { WidgetContainer } from '../WidgetContainer'
import { bytesToSize, bytesToUnit, sizeUnitTranslate } from '@helpers'

const tPrefix = 'dashboard.widgets.storageWidget'
export const StorageWidget = defineComponent({
  name: 'StorageWidget',
  computed: {
    d() {
      return this.$store.state.dashboard.data.storage
    },
    state() {
      const { percentage = 0 } = this.d
      const WARN_ZONE = 60
      const RED_ZONE = 85
      if (percentage <= WARN_ZONE) return null
      else if (WARN_ZONE < percentage && percentage <= RED_ZONE) return 'warn'
      else return 'error'
    },
  },
  render() {
    const { used, size, free, percentage } = this.d
    const exactUnit = bytesToUnit(size)
    const unit = sizeUnitTranslate(exactUnit)
    return (
      <WidgetContainer
        title={this.$t(`${tPrefix}.title`)}
        state={this.state}
        className='d-flex flex-column justify-space-around'
      >
        <div class='d-flex justify-space-between pt-4 pb-2'>
          <CountWidget
            count={bytesToSize(size, { exactUnit, withoutUnit: true })}
            text={this.$t(`${tPrefix}.total`, { unit })}
          />
          <CountWidget
            count={bytesToSize(used, { exactUnit, withoutUnit: true })}
            text={this.$t(`${tPrefix}.used`, { unit })}
          />
          <CountWidget
            count={bytesToSize(free, { exactUnit, withoutUnit: true })}
            text={this.$t(`${tPrefix}.free`, { unit })}
          />
        </div>
        <ProgressLinearWidget value={percentage} />
      </WidgetContainer>
    )
  },
})
