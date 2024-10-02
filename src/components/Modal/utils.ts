import { reactive } from 'vue'

const open: Record<string, boolean> = reactive({})

export const useModalOpenState = (id: string) => {
  const toggle = () => (open[id] = !open[id])
  const onUpdate = (v: boolean) => (open[id] = v)

  return [toggle, { modelValue: open[id] ?? false, 'onUpdate:modelValue': onUpdate }] as const
}
