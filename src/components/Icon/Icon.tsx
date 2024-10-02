import { defineComponent, type PropType } from 'vue'
import { upperFirst } from 'lodash'
import * as MdiIcons from '@mdi/js'

import SvgIcon from './SvgIcon.vue'

type IconTypeCapitalize = keyof typeof MdiIcons extends `mdi${infer Rest}` ? `${Rest}` : never
type IconType = Uncapitalize<IconTypeCapitalize>

export type IconProps = {
  icon: IconType
  size?: keyof typeof SIZES
  color?: string
}

const SIZES = {
  xsmall: 14,
  small: 18,
  default: 22,
  large: 26,
  xlarge: 32,
}

// Библиотека иконок https://pictogrammers.com/library/mdi/
export const Icon = defineComponent({
  name: 'AppIcon',
  props: {
    icon: { type: String as PropType<IconProps['icon']>, required: true },
    size: { type: [String, Number] as PropType<NonNullable<IconProps['size']> | number>, default: 'default' },
    color: { type: String as PropType<IconProps['color']> },
  },
  computed: {
    themeColor() {
      if (!this.color) return
      const colors = this.$vuetify.theme.current.colors
      if (this.color in colors) return `rgb(var(--v-theme-${this.color}))`
      return this.color
    },
  },
  render() {
    const icon = upperFirst(this.icon) as IconTypeCapitalize
    return (
      <SvgIcon
        type='mdi'
        path={MdiIcons[`mdi${icon}`]}
        color={this.themeColor}
        name={this.icon}
        size={typeof this.size === 'number' ? this.size : SIZES[this.size]}
        style={{ color: this.themeColor }}
      />
    )
  },
})
