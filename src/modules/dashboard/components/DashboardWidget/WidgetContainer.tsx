import { defineComponent, type PropType } from 'vue'
import { VBadge } from 'vuetify/components'
import { Icon } from '@/components/Icon'

const icons = {
  warn: <Icon icon='alert' color='warn' />,
  error: <Icon icon='alertCircle' color='error' />,
}

export const WidgetContainer = defineComponent({
  name: 'WidgetContainer',
  props: {
    title: {
      required: true,
      type: [String, Number] as PropType<string | number>,
    },
    subtitle: [String, Number] as PropType<string | number>,
    state: String as PropType<'warn' | 'error' | null>,
    errors: Number,
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    stateClass() {
      return this.state === 'error' ? ' _error' : ''
    },
  },
  render() {
    const icon = this.state ? icons[this.state] : null
    return (
      <div class={`dashboard-widget${this.stateClass}`}>
        <div class='dashboard-widget-top'>
          <div class={`dashboard-widget-top_icon${icon || !!this.errors ? ' _expand' : ''}`}>
            <Icon icon='alert' color='warn' class={this.state === 'warn' ? '' : '_hide'} />
            <Icon icon='alertCircle' color='error' class={this.state === 'error' ? '' : '_hide'} />
            <VBadge class={!!this.errors ? '' : '_hide'} color='red' content={this.errors} inline />
          </div>
          <span class='dashboard-widget-title'>{this.title}</span>
          {!!this.subtitle && <span class='dashboard-widget-subtitle'>{this.subtitle}</span>}
        </div>
        <div class={`dashboard-widget-content ${this.className}`}>{this.$slots.default?.()}</div>
      </div>
    )
  },
})
