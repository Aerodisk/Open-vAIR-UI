import { defineComponent } from 'vue'
import { round } from 'lodash'

import { ProgressEllipseWidget, CountWidget } from '@/components/Widget'
import { WidgetContainer } from '../WidgetContainer'

const tPrefix = 'dashboard.widgets.cpuWidget'

export const CPUWidget = defineComponent({
  name: 'CPUWidget',
  computed: {
    d() {
      return this.$store.state.dashboard.data.cpu
    },
    percentage() {
      return 100 - Number(this.d.percentage || 100)
    },
    state() {
      const WARN_ZONE = 67
      const RED_ZONE = 86
      if (this.percentage <= WARN_ZONE) return null
      else if (WARN_ZONE < this.percentage && this.percentage <= RED_ZONE) return 'warn'
      else return 'error'
    },
  },
  render() {
    const { count } = this.d

    return (
      <WidgetContainer
        title={this.$t(`${tPrefix}.title`)}
        state={this.state}
        className='d-flex justify-space-around align-center'
      >
        <CountWidget count={count} text={this.$t(`${tPrefix}.cores`)} />
        <ProgressEllipseWidget
          value={this.percentage}
          title={round(this.percentage, 1)}
          variant='two-thirds'
          subtitle='%'
        />
        <CountWidget count='N/A' text={this.$t(`${tPrefix}.threads`)} />
      </WidgetContainer>
    )
  },
})
