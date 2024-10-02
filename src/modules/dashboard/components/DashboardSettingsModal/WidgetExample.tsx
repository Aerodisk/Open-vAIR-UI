import { defineComponent, type PropType } from 'vue'
import { widgetExamples } from './examples'

export const WidgetExample = defineComponent({
  name: 'WidgetExample',
  props: {
    widgetName: String as PropType<keyof typeof widgetExamples>,
  },
  render() {
    if (!this.widgetName) return null

    const Component = widgetExamples[this.widgetName]
    if (!Component) return null
    return <Component />
  },
})
