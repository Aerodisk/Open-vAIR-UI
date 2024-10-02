import { defineComponent } from 'vue'

import { sidebarConfig } from './sidebarConfig'
import { SidebarItem } from './SidebarItem'

export const Sidebar = defineComponent({
  name: 'AppSidebar',
  render() {
    return (
      <nav class='sidebar scrollbar theme-transition'>
        {sidebarConfig
          .filter(i => (i.available != null ? i.available?.() : true))
          .map(i => (
            <>
              <SidebarItem item={i} class='sidebar-item' />
              {i.children?.map(i => (
                <SidebarItem item={i} class='sidebar-sub-item' />
              ))}
            </>
          ))}
      </nav>
    )
  },
})
