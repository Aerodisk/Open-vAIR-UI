/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DataTableHeader, DataTableProps } from '@/components/DataTable'
import type { RenderFunction } from '@/types'
import type { FormKitFrameworkContext, FormKitFrameworkContextState } from '@formkit/core'
import { ru } from '@/locales'
import type { ComputedRef, StyleValue, VNode } from 'vue'
import type { FormKitNode } from '@formkit/core'

export type CommonFieldType = {
  name: string
  label?: string
  help?: string
  tooltip?: { variant?: string; text: string | VNode } | ((value: string) => { variant?: string; text: string | VNode })
  showIf?: boolean | ((v: any) => boolean)
  validation?: string | [rule: string, ...args: any[]][]
  validationRules?: Record<string, (node: FormKitNode) => boolean | Promise<boolean>>
  validationMessages?: Record<string, string | ((ctx: { node: FormKitNode; name: string; args: any[] }) => string)>
  disabled?: boolean | ((v: any) => boolean)
  watch?: (v: any, oldV: any, node: FormKitNode) => unknown
  style?: StyleValue
}

export type TextFieldType = {
  type: 'text'
  variant?: 'text' | 'password'
  placeholder?: string
  textTransform?: 'upperCase' | 'lowerCase'
}
export type NumberFieldType = {
  type: 'number'
  placeholder?: string
}
export type TextAreaFieldType = {
  type: 'textarea'
  minRows?: number
  maxRows?: number
  noResize?: boolean
  placeholder?: string
  textTransform?: 'upperCase' | 'lowerCase'
}

export type SelectOption = {
  label: string
  value: any
  group?: string
  disabled?: boolean
  hint?: string | ComputedRef<string>
}

export type SelectFieldType = {
  type: 'select'
  placeholder?: string
  options: SelectOption[] | ((values: any) => SelectOption[])
}

export type MultiSelectFieldType = {
  type: 'multiselect'
  placeholder?: string
  options: SelectOption[] | ((values: any) => SelectOption[])
}

export type RadioGroupOption = {
  label: string
  value: unknown
  help?: string
  disabled?: boolean
  hint?: string
}
export type RadioGroupFieldType = {
  type: 'radio'
  options: RadioGroupOption[]
}
export type TableFieldType = {
  type: 'table'
  headers: DataTableHeader[]
  items: DataTableProps['items'] | ((values: any) => DataTableProps['items'])
  itemValue?: string
  short?: boolean
  multiple?: boolean
  onRefresh?: () => Promise<void | never | unknown>
}

export type CustomFieldType = {
  type: 'custom'
  render: RenderFunction<{ context: FormKitFrameworkContext }>
}

export type FileFieldType = {
  type: 'file'
  uploadUrl?: string
  accept?: string
  multiple?: boolean
  directory?: boolean
  texts?: { buttonText?: string; notSelected?: string; dropzone?: string }
  icon?: any
  preventAbortRequestBeforeUnmount?: boolean
}

export type SizeFieldType = {
  type: 'size'
  precision?: number
  allowed?: (keyof (typeof ru)['sizes']['full']['si'])[]
}

export type CheckboxFieldType = {
  type: 'checkbox'
  placeholder?: string
}

export type DateFieldType = {
  type: 'date'
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

export type FieldType = (
  | MultiSelectFieldType
  | SelectFieldType
  | TextFieldType
  | RadioGroupFieldType
  | TableFieldType
  | CustomFieldType
  | FileFieldType
  | CheckboxFieldType
  | NumberFieldType
  | TextAreaFieldType
  | SizeFieldType
  | DateFieldType
) &
  CommonFieldType

export type FieldsBlock = {
  direction: 'row' | 'column'
  title?: string
  showIf?: boolean | ((v: any) => boolean)
  style?: StyleValue
  fields: (FieldType | FieldsBlockWithFields)[]
}
export type FieldsBlockWithFields = Omit<FieldsBlock, 'fields'> & { fields: (FieldType | FieldsBlockWithFields)[] }

export type FieldsPropType = (FieldType | FieldsBlockWithFields)[] | FieldsBlock

export type FormHintType = { text: string; variant?: 'info' | 'warn'; itemsList?: string[] }

export type TabItem = {
  title: string
  showIf?: (v: any) => boolean
  hint?: FormHintType
  fields: (FieldType | FieldsBlockWithFields)[]
}
export type TabsPropType = TabItem[]

export type FormSlotProps = {
  state: FormKitFrameworkContextState
  submit: () => void
  reset: (e: MouseEvent) => void
  values: Record<string, unknown>
}

export type MultiStepFormSlotProps = {
  actions: {
    state: FormKitFrameworkContextState
    submit: () => void
    reset: (e: MouseEvent) => void
    isLastTab: boolean
    isFirstTab: boolean
    nextTab: (e: MouseEvent) => void
    prevTab: (e: MouseEvent) => void
    submitDisabled: boolean
    submitVisible: boolean
    values: Record<string, unknown>
  }
  leftActions: MultiStepFormSlotProps['actions']
  rightActions: MultiStepFormSlotProps['actions']
  rightActionsExtra: MultiStepFormSlotProps['actions']
  submitBtn: MultiStepFormSlotProps['actions']
}
