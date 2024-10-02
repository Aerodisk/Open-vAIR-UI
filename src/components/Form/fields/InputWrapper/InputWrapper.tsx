import { defineComponent } from 'vue'
import { isFunction, values } from 'lodash'
import { VTooltip } from 'vuetify/components'
import type { FormKitFrameworkContext } from '@formkit/core'

import { Icon } from '@/components/Icon'

type ParentProps = {
  context: FormKitFrameworkContext
}
export const InputWrapper = defineComponent({
  name: 'InputWrapper',
  render() {
    const ctx = (this.$parent?.$props as ParentProps).context as unknown as FormKitFrameworkContext
    const { type, help, messages, id, label, state, node, attrs, disabled, value } = ctx
    const { submitted, valid, validationVisible } = state
    const style = attrs.style
    const className = attrs.class
    const tooltip = attrs.tooltip

    return (
      <div
        class={`formkit-outer${className ? ` ${className}` : ''}`}
        data-type={type}
        data-invalid={(!valid && validationVisible) || !!values(messages).length}
        data-disabled={disabled}
        data-submitted={submitted}
        data-name={node.name}
        style={style}
      >
        <div class='formkit-wrapper'>
          <label class='formkit-label' for={id}>
            {label}
            {!!tooltip && (
              <div class='formkit-label-tooltip'>
                <Icon icon='helpCircleOutline' size='xsmall' color='#969696' />
                <VTooltip activator='parent' location='top'>
                  {isFunction(tooltip) ? tooltip(value).text : tooltip.text}
                </VTooltip>
              </div>
            )}
          </label>
          <div class='formkit-inner'>{this.$slots.default?.()}</div>
        </div>
        {help && (
          <div class='formkit-help' id={`help-${id}`}>
            {help}
          </div>
        )}
        {!!values(messages).length && (
          <ul class='formkit-messages'>
            {values(messages)
              .filter(i => i.visible)
              .map(i => (
                <li class='formkit-message' id={`${id}-${i.key}`} data-message-type={i.type}>
                  {i.value}
                </li>
              ))}
          </ul>
        )}
      </div>
    )
  },
})
