/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Store } from '@/store/types'
import type { VNode } from 'vue'

type ChildrenEl = undefined | null | string | number | JSX.Element | VNode | VNode[] | boolean
type ChildrenFunc = (props?: any) => ChildrenEl
type ChildrenSlots = Record<string, ChildrenEl | ChildrenFunc>
type ChildrenType = ChildrenEl | ChildrenFunc | ChildrenSlots
type ChildrenProp = ChildrenType | ChildrenType[]

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
  // provide typings for passing children in JSX
  interface ComponentCustomProps {
    $children?: ChildrenProp
  }
}
