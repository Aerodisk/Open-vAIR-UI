import { defineComponent } from 'vue'

import { copyToClipboard } from '@helpers'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

export const IqnBlock = defineComponent({
  name: 'IqnBlock',
  data: () => ({ showCheck: false }),
  computed: {
    iqn() {
      return this.$store.state.blockDevices.iqn || ''
    },
  },
  methods: {
    copy() {
      this.showCheck = true
      copyToClipboard(this.iqn)
      setTimeout(() => (this.showCheck = false), 750)
    },
  },
  render() {
    return (
      <div
        class='d-flex align-center pa-2'
        style={{
          border: '1px solid rgb(var(--v-theme-table-border))',
          width: 'fit-content',
          background: 'rgb(var(--v-theme-table-bg-head))',
          borderRadius: '4px',
        }}
      >
        <b class='mr-2' style={{ color: 'rgb(var(--v-theme-table-body-text))' }}>
          IQN:
        </b>
        <span>{this.iqn}</span>
        <Button
          size='small'
          variant='plain'
          onClick={this.copy}
          icon={<Icon icon='contentCopy' size='xsmall' />}
          style={{ maxHeight: '20px', marginLeft: '6px', padding: '4px' }}
        >
          <Icon
            icon='check'
            size='small'
            style={{
              width: '22px',
              height: '20px',
              position: 'absolute',
              left: '-4px',
              top: '-4px',
              zIndex: 1,
              backgroundColor: 'rgb(var(--v-theme-table-bg-head))',
              transition: 'opacity .28s',
              opacity: this.showCheck ? 1 : 0,
            }}
          />
        </Button>
      </div>
    )
  },
})
