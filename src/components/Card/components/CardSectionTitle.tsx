import { defineComponent } from 'vue'

export const CardSectionTitle = defineComponent({
  name: 'CardSectionTitle',
  props: { content: String },
  render() {
    return (
      <div
        style={{
          color: 'rgb(var(--v-theme-form-input-label))',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '24px',
        }}
      >
        {this.content}
      </div>
    )
  },
})
