import { defineComponent } from 'vue'
import { keys, round } from 'lodash'

import type { IOLatency } from '@api/generated'
import { ChartWidget } from './ChartWidget'

const tPrefix = 'dashboard.widgets.ioLatencyMonitoringWidget'

const prepareChartSeries = (data: IOLatency[]) => {
  const result = { wait: data.map(i => [i.date, round(i.wait, 2)]) }
  return keys(result).map(name => ({ name, data: result[name as keyof typeof result] }))
}

export const IOLatencyChart = defineComponent({
  name: 'IOLatencyChart',
  data() {
    return { data: [] as IOLatency[] }
  },
  computed: {
    dataCurrent() {
      return this.$store.state.dashboard.data.io_latency
    },
  },
  watch: {
    dataCurrent(newValue: IOLatency) {
      this.data.push(newValue)
      if (this.data.length > 100) this.data.shift()
    },
  },
  render() {
    return (
      <ChartWidget
        title={this.$t(`${tPrefix}.title`)}
        subtitle={this.$t(`${tPrefix}.subtitle`)}
        series={prepareChartSeries(this.data)}
        legendFormatter={l => this.$t(`${tPrefix}.legend.${l}`)}
      />
    )
  },
})
