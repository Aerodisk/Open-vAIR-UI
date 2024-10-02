import { defineComponent, type PropType } from 'vue'
import { isFunction, omit } from 'lodash'
import { VBtn } from 'vuetify/components'

import { Icon as KitIcon, type IconProps } from '@/components/Icon'
import type { Component, RenderComponent } from '@/types'

const variants = {
  primary: 'elevated',
  secondary: 'outlined',
  flat: 'text',
  plain: 'plain',
} as const

const colors = {
  primary: 'primary',
  secondary: 'secondary',
  flat: 'secondary',
  plain: 'default',
} as const

export type ButtonProps = {
  title?: string
  icon?: RenderComponent | Component | IconProps
  iconPosition?: 'left' | 'right'
  variant?: 'primary' | 'secondary' | 'flat' | 'plain'
  size?: 'default' | 'small'
  disabled?: boolean
  loading?: boolean
  type?: 'reset' | 'submit'
  modal?: Component | RenderComponent
  color?: string
  onClick?: (e: MouseEvent) => void
  className?: string
}

export default defineComponent({
  name: 'KitButton',
  props: {
    title: String as PropType<ButtonProps['title']>,
    icon: Object as PropType<ButtonProps['icon']>,
    iconPosition: {
      type: String as PropType<ButtonProps['iconPosition']>,
      default: 'left',
    },
    variant: {
      type: String as PropType<NonNullable<ButtonProps['variant']>>,
      default: 'primary',
    },
    size: {
      type: String as PropType<NonNullable<ButtonProps['size']>>,
      default: 'default',
    },
    disabled: Boolean as PropType<ButtonProps['disabled']>,
    loading: Boolean as PropType<ButtonProps['loading']>,
    type: String as PropType<ButtonProps['type']>,
    modal: Object as PropType<ButtonProps['modal']>,
    color: String as PropType<ButtonProps['color']>,
    className: String,
  },
  emits: ['click'],
  methods: {
    click(e: MouseEvent) {
      this.$emit('click', e)
    },
  },
  computed: {
    classNameComp() {
      const { iconPosition, title, icon, className } = this.$props

      const classes = [
        `btn_icon_${iconPosition}`,
        !title && icon ? 'icon_btn' : '',
        className,
        this.$attrs.class,
      ].filter(Boolean)
      return classes.join(' ')
    },
  },
  render() {
    const { title, variant, icon: I, iconPosition, modal, color, ...props } = this.$props

    const icon = isFunction(I) ? <I /> : I ? 'icon' in I ? <KitIcon {...(I as IconProps)} /> : I : null
    return (
      <VBtn
        variant={variants[variant]}
        color={color || colors[variant]}
        class={this.classNameComp}
        onClick={this.click}
        {...omit(props, ['className'])}
      >
        {iconPosition === 'left' && icon}
        {title}
        {iconPosition === 'right' && icon}
        {this.$slots.default?.()}
        {isFunction(modal) ? modal({}) : modal}
      </VBtn>
    )
  },
})
