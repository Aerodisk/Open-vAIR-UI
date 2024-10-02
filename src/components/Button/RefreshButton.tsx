import { defineComponent, PropType } from 'vue'
import { omit } from 'lodash'

import { Icon } from '@/components/Icon'
import { Button, type ButtonProps } from '../Button'

export const RefreshButton = defineComponent({
  name: 'RefreshButton',
  props: {
    onClick: Function,
    variant: {
      type: String as PropType<NonNullable<ButtonProps['variant']>>,
      default: 'primary',
    },
    size: {
      type: String as PropType<NonNullable<ButtonProps['size']>>,
      default: 'default',
    },
    disabled: Boolean as PropType<ButtonProps['disabled']>,
    color: String as PropType<ButtonProps['color']>,
  },
  data() {
    return { loading: false, showCheck: false }
  },
  methods: {
    async click() {
      if (this.loading || this.showCheck) return

      this.loading = true
      await this.onClick?.()
      this.showCheck = true
      this.loading = false
      setTimeout(() => (this.showCheck = false), 750)
    },
  },
  render() {
    return (
      <Button onClick={this.click} loading={this.loading} {...omit(this.$props, ['onClick'])}>
        <div
          class='d-flex align-center'
          style={{ opacity: this.showCheck ? 0 : 1, transition: this.showCheck ? 'none' : 'opacity .28s' }}
        >
          <Icon icon='cached' size={17} style={{ marginRight: '4px', transform: 'translateY(0.5px)' }} />
          {this.$t('refresh')}
        </div>
        <div
          style={{
            opacity: this.showCheck ? 1 : 0,
            transition: this.showCheck ? 'none' : 'opacity .28s',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            transform: 'translateY(-3px)',
          }}
        >
          <Icon icon='check' color='green' />
        </div>
      </Button>
    )
  },
})
