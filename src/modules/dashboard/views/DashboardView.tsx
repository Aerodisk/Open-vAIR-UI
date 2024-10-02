import { defineComponent } from 'vue'

import { DashboardHoc, DashboardGrid } from '../components'

export const DashboardView = defineComponent({
  name: 'DashboardView',
  render() {
    return (
      <DashboardHoc>
        <DashboardGrid />
      </DashboardHoc>
    )
  },
})
