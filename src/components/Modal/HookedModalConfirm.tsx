import { defineComponent, reactive, ref } from 'vue'
import { keys, merge, unset } from 'lodash'
import { ConfirmModal } from './ConfirmModal'
import type { ConfirmModalProps } from './types'

type StateType = {
  onConfirm?: () => void
  onReset?: () => void
} & Omit<ConfirmModalProps, 'modelValue' | 'activator'>

const open = ref(false)
const state = reactive<StateType>({})

const setOpen = (value: boolean) => {
  if (value) return (open.value = true)

  open.value = false
  setTimeout(() => keys(state).forEach(i => unset(state, i)), 200)
}

export const useConfirmModal = (defaultProps?: StateType) => {
  const openFunc = (props?: StateType) => {
    merge(state, defaultProps, props)
    setOpen(true)
  }
  const closeFunc = () => {
    setOpen(false)
  }

  return { open: openFunc, close: closeFunc }
}

export const useWithConfirm = (props?: StateType) => useConfirmModal(props).open

export default defineComponent({
  name: 'HookedModalConfirm',
  render() {
    return <ConfirmModal {...state} activator={null} modelValue={open.value} onUpdate:modelValue={setOpen} />
  },
})
