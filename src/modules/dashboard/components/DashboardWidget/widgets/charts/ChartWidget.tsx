import { defineComponent, type PropType } from 'vue'
import ApexCharts from 'vue3-apexcharts'

import { dateChartOptions } from '@helpers'

import { MARGIN, ROW_HEIGHT } from '../../../DashboardGrid/constants'
import { WidgetContainer } from '../../WidgetContainer'

export const ChartWidget = defineComponent({
  name: 'ChartWidget',
  props: {
    title: { type: String, required: true },
    subtitle: String,
    series: { type: Array as PropType<{ data: number[][]; name: string }[]> },
    customValue: Function as PropType<(v: string | number) => string>,
    legendFormatter: Function as PropType<(legendName: string) => string>,
  },
  data: () => ({ init: false }),
  mounted() {
    setTimeout(() => (this.init = true))
  },
  computed: {
    options() {
      return dateChartOptions({
        colors: this.$vuetify.theme.current.colors,
        dark: this.$vuetify.theme.current.dark,
        chart: { zoom: { enabled: false } },
        tooltip: { customValue: this.customValue },
        legend: { formatter: this.legendFormatter },
      })
    },
    dimensions() {
      const { w, h } = (this.$parent?.$parent?.$props || {}) as { w: number; h: number }
      return { width: w * (MARGIN + ROW_HEIGHT) - 25, height: h * (MARGIN + ROW_HEIGHT) - 60 }
    },
    resizing() {
      return (this.$parent?.$parent as unknown as { isResizing: boolean })?.isResizing
    },
  },
  render() {
    return (
      <WidgetContainer title={this.title} subtitle={this.subtitle} className='pa-0'>
        {this.init && !this.resizing && (
          <ApexCharts type='line' ref='chart' options={this.options} series={this.series} {...this.dimensions} />
        )}
      </WidgetContainer>
    )
  },
})
