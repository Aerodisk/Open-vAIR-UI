import type { DefineComponent } from 'vue'
import { JSX } from 'vue/jsx-runtime'

export type Component = JSX.Element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderComponent = DefineComponent<any, any, any, any, any>
export type RenderFunction<T extends object> = (props: T) => JSX.Element

/** Возвращает тип элемента из массива */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never

/** Возвращает ключи объекта, где значение соответсвуте типу Value */
export type KeysMatching<Object extends object, Value> = {
  [K in keyof Object]-?: Object[K] extends Value ? K : never
}[keyof Object]
