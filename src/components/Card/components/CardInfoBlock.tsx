import { defineComponent } from 'vue'

export const CardInfoBlock = defineComponent({
  name: 'CardInfoBlock',
  props: {
    title: String,
    content: [String, Number],
  },
  render() {
    return (
      <div>
        <div
          class='mb-1'
          style={{
            color: 'rgb(var(--v-theme-form-input-label))',
            fontSize: '12px',
            lineHeight: '14px',
          }}
        >
          {this.title}
        </div>
        <div
          style={{
            color: 'rgb(var(--v-theme-form-input-text))',
            fontSize: '12px',
            lineHeight: '14px',
          }}
        >
          {this.content || this.$slots?.default?.() || '-'}
        </div>
      </div>
    )
  },
})
