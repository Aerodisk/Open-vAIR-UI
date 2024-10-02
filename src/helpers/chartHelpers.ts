import { capitalize } from 'vue'
import { ApexOptions } from 'apexcharts'
import { defaultsDeep } from 'lodash'
import { format } from 'date-fns'

export const chartColorsOptions = (
  colors: Record<string, string>,
  dark: boolean,
  options?: { dropShadow?: boolean }
): ApexOptions => ({
  grid: { borderColor: colors['dashboard-widget-border2'] },
  xaxis: { labels: { style: { colors: colors['dashboard-widget-text'] } } },
  yaxis: { labels: { style: { colors: colors['dashboard-widget-text'] } } },
  tooltip: { style: { fontSize: '12px', fontFamily: 'Exo 2' } },
  legend: { labels: { colors: colors['dashboard-widget-text'] } },
  chart: {
    dropShadow:
      options?.dropShadow == null
        ? {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: dark ? 0.25 : 0.1,
          }
        : {},
  },
  colors: [
    '#2671E2',
    '#DE9F41',
    '#057A55',
    '#F14E46',
    'rgb(78, 205, 196)',
    'rgb(199, 244, 100)',
    'rgb(84, 110, 122)',
    '#58508d',
    '#bb478c',
    '#ff6361',
    '#B400FE',
    '#FFE200',
  ],
  theme: { mode: dark ? 'dark' : 'light' },
})

export const dateChartOptions = (options: {
  colors: Record<string, string>
  dark: boolean
  chart?: {
    toolbar?: {
      show?: boolean
    }
    zoom?: {
      enabled?: boolean
    }
  }
  tooltip?: {
    customLabel?: (label: number) => string | Date | number
    customValue?: (value: string | number) => string
  }
  legend?: { formatter?: (legendName: string) => string }
}): ApexOptions =>
  defaultsDeep(
    {
      chart: {
        toolbar: { show: options?.chart?.toolbar?.show ?? false },
        zoom: { enabled: options?.chart?.zoom?.enabled ?? true },
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      xaxis: {
        type: 'datetime',
        labels: { rotate: -45 },
        tooltip: { enabled: false },
      },
      tooltip: {
        custom: opt => {
          const colors = opt.w.config.colors
          const seriesNames: string[] = opt.w.config.series.map((i: { name: string }) => i.name)

          const values = opt.series.map((i: number[]) => i[opt.dataPointIndex])

          const rawLabel = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex][0]
          const label = format(options?.tooltip?.customLabel?.(rawLabel) || rawLabel, 'dd.MM.yyyy H:mm:ss')

          return `<div class='apexcharts-tooltip-custom'>
               <div class='apexcharts-tooltip-custom-title'>${label}</div>
                  ${seriesNames
                    .map((name, i) =>
                      values[i] != null
                        ? `<div class='apexcharts-tooltip-custom-item'>
                                         <div style='color: ${colors[i]}'>${
                            options?.legend?.formatter?.(name) || capitalize(name)
                          }</div>
                                         <div>${options?.tooltip?.customValue?.(values[i]) || values[i]}</div>
                                       </div>`
                        : ''
                    )
                    .join('')}
            </div>`
        },
      },
      legend: { formatter: options?.legend?.formatter || (seriesName => capitalize(seriesName)) },
      stroke: { curve: 'smooth' },
    } as ApexOptions,
    chartColorsOptions(options.colors, options.dark)
  )
