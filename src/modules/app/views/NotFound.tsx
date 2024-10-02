import { defineComponent } from 'vue'

export const NotFound = defineComponent({
  name: 'NotFound',
  render() {
    return (
      <div>
        <h1>{this.$t('notFound.title')}</h1>
        <h3>{this.$t('notFound.text')}</h3>
      </div>
    )
  },
})
