import { defineComponent } from 'vue'

import { AppActionTypes } from '@/store'
import { HeaderMonitoringMenu } from './HeaderMonitoringMenu'
import { HeadersWarningMenu } from './HeadersWarningMenu'

const POOLING_INTERVAL = 6000
let interval = 0

export const HeaderNotifications = defineComponent({
  name: 'HeaderNotifications',
  created() {
    this.$store.dispatch(AppActionTypes.GET_NOTIFICATIONS, undefined)
    interval = setInterval(() => this.$store.dispatch(AppActionTypes.GET_NOTIFICATIONS, undefined), POOLING_INTERVAL)
  },
  unmounted() {
    clearInterval(interval)
  },
  render() {
    return (
      <div>
        <HeaderMonitoringMenu />
        <HeadersWarningMenu />
      </div>
    )
  },
})
