import { defineComponent } from 'vue'
import { keys, round } from 'lodash'

import type { IopsData } from '@api/generated'
import { ChartWidget } from './ChartWidget'

const tPrefix = 'dashboard.widgets.iopsMonitoringWidget'

const prepareChartSeries = (data: IopsData[]) => {
  const result = {
    input: data.map(i => [i.date, round(i.input, 2)]),
    output: data.map(i => [i.date, round(i.output, 2)]),
  }

  return keys(result).map(name => ({ name, data: result[name as keyof typeof result] }))
}

export const IOPSChart = defineComponent({
  name: 'IOPSChart',
  data() {
    return { data: [] as IopsData[] }
  },
  computed: {
    dataCurrent() {
      return this.$store.state.dashboard.data.iops
    },
  },
  watch: {
    dataCurrent(newValue: IopsData) {
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
