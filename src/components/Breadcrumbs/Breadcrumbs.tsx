import { defineComponent, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { routeReplaceQuery } from '@helpers'
import { last } from 'lodash'

export const Breadcrumbs = defineComponent({
  name: 'AppBreadcrumbs',
  props: { custom: Object as PropType<Record<string, string>> },
  computed: {
    items() {
      return this.$route.matched
        .filter(i => i.meta.breadcrumb)
        .map(i => {
          if (`${i.meta.breadcrumb}`.includes('custom:'))
            return {
              value: `${this.custom?.[`${last(`${i.meta.breadcrumb}`.split(':'))}`]}`,
              url: routeReplaceQuery(i.path, this.$route.params),
            }

          return { localeKey: `${i.meta.breadcrumb}`, url: routeReplaceQuery(i.path, this.$route.params) }
        })
    },
  },
  render() {
    return (
      <div>
        <div class='breadcrumbs'>
          {this.items.map(i => (
            <RouterLink
              to={i.url}
              class={this.$route.path === i.url || decodeURIComponent(this.$route.path) === i.url ? '_active' : ''}
            >
              {i.value ? i.value : this.$t(`breadcrumbs.${i.localeKey}`)}
            </RouterLink>
          ))}
        </div>
        {this.$slots.default?.()}
      </div>
    )
  },
})
