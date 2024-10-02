import { defineComponent, PropType } from 'vue'
import type { LocalDisk } from '@api/generated'
import { sum } from 'lodash'
import VueApexCharts from 'vue3-apexcharts'
import { bytesToSize, chartColorsOptions } from '@helpers'

const prepareChartData = (disk: LocalDisk & { children: LocalDisk[] }) => {
  const sizeWithoutPartitions = disk.size - sum(disk.children.map(i => i.size))
  const series = [sizeWithoutPartitions, ...disk.children.map(i => i.size)]
  const labels = [disk.path, ...disk.children.map(i => i.path)]
  return { series, labels }
}

export const PartitionsPieChart = defineComponent({
  name: 'PartitionsPieChart',
  props: { disk: { type: Object as PropType<LocalDisk & { children: LocalDisk[] }>, required: true } },
  render() {
    const { series, labels } = prepareChartData(this.disk)
    return (
      <VueApexCharts
        style={{ paddingTop: '12px' }}
        type='pie'
        width={450}
        series={series}
        options={{
          labels,
          ...chartColorsOptions(this.$vuetify.theme.current.colors, this.$vuetify.theme.current.dark, {
            dropShadow: false,
          }),
          dataLabels: {
            // @ts-ignore
            formatter: (_, opts) => [
              opts.w.globals.labels[opts.seriesIndex],
              bytesToSize(opts.w.config.series[opts.seriesIndex]),
            ],
          },
          tooltip: { y: { formatter: (v: number) => bytesToSize(v) } },
        }}
      />
    )
  },
})
