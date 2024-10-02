import type { ComputedRef } from 'vue'
import type { ButtonProps } from '@/components/Button'

export type ConfirmModalProps = {
  title?: string | ComputedRef<string>
  text?: string | ComputedRef<string>
  itemsList?: string[]
  confirmText?: string
  cancelText?: string
  danger?: boolean
  modelValue?: boolean
  buttonStructure?: Partial<Record<'cancel' | 'confirm' | 'extra', ButtonProps>>
  activator?: 'parent' | null
}
