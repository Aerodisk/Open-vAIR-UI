declare module 'vue3-apexcharts' {
  import { Component, ComponentOptions, DefineComponent, Plugin } from 'vue'
  import type { VueApexChartsComponent } from 'vue3-apexcharts'

  // Fix from use in JSX
  declare const VueApexCharts: DefineComponent & Component & ComponentOptions<VueApexChartsComponent> & Plugin
  export default VueApexCharts
}
