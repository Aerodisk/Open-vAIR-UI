import { defineComponent } from 'vue'
import { round } from 'lodash'
import { bytesToSize, sizeUnitTranslate } from '@helpers'
import { CountWidget, ProgressEllipseWidget } from '@/components/Widget'
import { WidgetContainer } from '../WidgetContainer'

const exactUnit = 'G'
const tPrefix = 'dashboard.widgets.ramWidget'

export const RAMWidget = defineComponent({
  name: 'RAMWidget',
  computed: {
    d() {
      return this.$store.state.dashboard.data.memory
    },
    state() {
      const { percentage = 0 } = this.d
      const WARN_ZONE = 67
      const RED_ZONE = 86
      if (percentage <= WARN_ZONE) return null
      else if (WARN_ZONE < percentage && percentage <= RED_ZONE) return 'warn'
      else return 'error'
    },
  },
  render() {
    const { value, used, available, percentage = 0 } = this.d
    const unit = sizeUnitTranslate(exactUnit)
    return (
      <WidgetContainer
        title={this.$t(`${tPrefix}.title`)}
        subtitle={bytesToSize(value, { exactUnit })}
        state={this.state}
        className='d-flex justify-space-around align-center'
      >
        <CountWidget
          count={bytesToSize(used, { exactUnit, withoutUnit: true })}
          text={this.$t(`${tPrefix}.used`, { unit })}
        />
        <ProgressEllipseWidget variant='two-thirds' value={percentage} title={round(percentage, 1)} subtitle='%' />
        <CountWidget
          count={bytesToSize(available, { exactUnit, withoutUnit: true })}
          text={this.$t(`${tPrefix}.free`, { unit })}
        />
      </WidgetContainer>
    )
  },
})
