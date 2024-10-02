import { defineComponent, type PropType } from 'vue'
import { RouterLink, type RouteParams } from 'vue-router'
import { values } from 'lodash'

import { routeReplaceQuery } from '@helpers'
import type { SidebarItemType } from './sidebarConfig'

const checkPath = (path: string | Record<'root' | string, string>, params: RouteParams) => {
  if (typeof path === 'string') {
    return routeReplaceQuery(path, params)
  } else {
    return values(path).map(i => routeReplaceQuery(i, params))
  }
}

export const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<SidebarItemType>,
      required: true,
    },
  },
  computed: {
    activeClass(): string {
      if (typeof this.item.path === 'string') return this.$route.path === this.item.path ? '_active' : ''

      const routes = values(this.item.path)
        .map(i => checkPath(i, this.$route.params))
        .flat()
      const childrenRoutes =
        this.item.children
          ?.map(({ path }) =>
            typeof path === 'string'
              ? path
              : values(path)
                  .map(i => checkPath(i, this.$route.params))
                  .flat()
          )
          .flat() || []

      return routes.includes(decodeURIComponent(this.$route.path)) && !childrenRoutes.includes(this.$route.path)
        ? '_active'
        : ''
    },
  },
  render() {
    const { path, icon, title } = this.item
    const content = (
      <>
        {icon}
        <div>{this.$t(`sidebar.${title}`)}</div>
      </>
    )

    if (path)
      return (
        <RouterLink to={typeof path === 'string' ? path : path.root} class={`_clickable ${this.activeClass}`}>
          {content}
        </RouterLink>
      )
    return <div class={this.activeClass}>{content}</div>
  },
})
