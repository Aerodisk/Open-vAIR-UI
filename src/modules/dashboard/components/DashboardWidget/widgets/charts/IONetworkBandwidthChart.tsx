import { defineComponent } from 'vue'
import { keys, round } from 'lodash'

import type { BandWithData } from '@api/generated'
import { ChartWidget } from './ChartWidget'

const tPrefix = 'dashboard.widgets.ioNetworkBandwidthMonitoringWidget'

const prepareChartSeries = (data: BandWithData[]) => {
  const result = {
    read: data.map(i => [i.date, round(i.read, 2)]),
    write: data.map(i => [i.date, round(i.write, 2)]),
  }
  return keys(result).map(name => ({ name, data: result[name as keyof typeof result] }))
}

export const IONetworkBandwidthChart = defineComponent({
  name: 'IONetworkBandwidthChart',
  data() {
    return { data: [] as BandWithData[] }
  },
  computed: {
    dataCurrent() {
      return this.$store.state.dashboard.data.bandwith_data
    },
  },
  watch: {
    dataCurrent(newValue) {
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
