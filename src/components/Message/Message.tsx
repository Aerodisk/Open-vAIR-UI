import { defineComponent, type PropType } from 'vue'

import { Button, type ButtonProps } from '@/components/Button'
import { Icon } from '@/components/Icon'

export const Message = defineComponent({
  name: 'AppMessage',
  props: {
    title: String,
    text: String,
    actions: Array as PropType<ButtonProps[]>,
    grow: Boolean,
    variant: String as PropType<'info' | 'warning' | 'error' | 'success'>,
  },
  data() {
    return { visible: true }
  },
  watch: {
    variant() {
      this.visible = true
    },
  },
  render() {
    const { title, text, actions, variant = 'info', grow } = this

    if (!this.visible) return null
    return (
      <div class={`app_message app_message_${variant} ${grow ? 'w-100' : ''}`}>
        <Icon icon='information' color='info' />
        <div class={grow ? 'flex-grow-1' : ''}>
          {title && <div class='app_message_title'>{title}</div>}
          {text && <div class='app_message_text'>{text}</div>}
          {!!actions?.length && (
            <div>
              {actions?.map(i => (
                <Button size='small' {...i} />
              ))}
            </div>
          )}
        </div>
        <div
          onClick={() => (this.visible = false)}
          class='d-flex align-center'
          style={{ height: '20px', cursor: 'pointer' }}
        >
          <Icon icon='close' />
        </div>
      </div>
    )
  },
})
