import { defineComponent, type PropType } from 'vue'

export const Badge = defineComponent({
  name: 'AppBadge',
  props: {
    position: String as PropType<'top left' | 'top right' | 'bottom left' | 'bottom right'>,
    count: Number,
    className: String,
    color: String as PropType<'red' | 'warn' | 'primary' | 'green'>,
  },
  computed: {
    compClass() {
      const [vertical = 'top', horizontal = 'right'] = (this.position || 'top right').split(' ').filter(Boolean)
      const color = this.color || 'red'

      const classes = ['badge_wrapper', this.className, `badge_${vertical}`, `badge_${horizontal}`, `badge_${color}`]
      return classes.join(' ')
    },
    compCount() {
      return (this.count || 0) < 100 ? this.count : '99+'
    },
  },
  render() {
    return (
      <div class={this.compClass}>
        {!!this.compCount && <div class='badge'>{this.compCount}</div>}
        {this.$slots.default?.()}
      </div>
    )
  },
})
