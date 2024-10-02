import type { AxiosError } from 'axios'
import { defineComponent, PropType } from 'vue'

import { Icon } from '@/components/Icon'
import { extractErrorMessage } from '@helpers'

export const Error = defineComponent({
  name: 'DataTableError',
  props: { error: { type: Object as PropType<AxiosError | Error>, required: true } },
  render() {
    return (
      <div
        class='wrapper'
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '30px 0',
        }}
      >
        <div
          class='text'
          style={{ fontSize: '12px', lineHeight: '20px', color: 'rgb(var(--v-theme-table-head-text))' }}
        >
          {extractErrorMessage(this.error)}
        </div>
        <Icon icon='alertCircleOutline' size='large' />
      </div>
    )
  },
})
