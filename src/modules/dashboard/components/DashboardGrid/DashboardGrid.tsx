import { defineComponent } from 'vue'
import { GridLayout, type Layout } from 'vue3-grid-layout'

import { DashboardMutationTypes } from '@/store'

import { DashboardWidget } from '../DashboardWidget'
import type { DashboardWidgets } from '../DashboardWidget/widgets'
import { MARGIN, ROW_HEIGHT } from './constants'
import { findNewPosition, generateBreakpoints } from './utils'

export type GridLayout = Layout<keyof typeof DashboardWidgets>

export const DashboardGrid = defineComponent({
  name: 'DashboardGrid',
  data: () => ({ ready: false, prevLastBreakpoint: null as number | null }),
  mounted() {
    window.addEventListener('resize', this.resizeLayout)
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeLayout)
  },
  methods: {
    saveLayout(layout: GridLayout) {
      if (!this.ready) return
      this.$store.commit(DashboardMutationTypes.SET_GRID, layout)
    },
    resizeLayout() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lastBreakpoint = (this.$refs?.grid as any)?.lastBreakpoint

      if (!lastBreakpoint || lastBreakpoint === this.prevLastBreakpoint) return
      this.prevLastBreakpoint = lastBreakpoint

      const transferredWidgets = this.layout.filter(i => i.x + i.w > lastBreakpoint)

      if (!transferredWidgets.length) return

      transferredWidgets.forEach(async widget => {
        const newPosition = findNewPosition(this.layout, widget, lastBreakpoint)
        const newLayout = [...this.layout.filter(i => i.i !== widget.i), { ...widget, ...newPosition }]
        this.saveLayout(newLayout)
        await this.$nextTick()
      })
    },
  },
  computed: {
    layout: {
      get() {
        return this.$store.state.dashboard.layout
      },
      set(layout: GridLayout) {
        this.$store.commit(DashboardMutationTypes.SET_GRID, layout)
      },
    },
    settings() {
      return this.$store.state.dashboard.gridSettings
    },
  },
  render() {
    return (
      <GridLayout
        ref='grid'
        layout={this.layout}
        onLayoutUpdated={this.saveLayout}
        onLayoutReady={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.prevLastBreakpoint = (this.$refs?.grid as any)?.lastBreakpoint
          this.ready = true
        }}
        rowHeight={ROW_HEIGHT}
        margin={[MARGIN, MARGIN]}
        {...generateBreakpoints()}
        {...this.settings}
        useCssTransforms
        responsive
        useStyleCursor={false}
      >
        {this.layout.map(i => (
          <DashboardWidget key={i.i} item={i} />
        ))}
      </GridLayout>
    )
  },
})
