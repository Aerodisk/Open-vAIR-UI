import { defineComponent, reactive } from 'vue'
import { VSnackbar } from 'vuetify/components'

import { store } from '@/store'

export type SnackbarProps = { text?: string; variant?: 'error' | 'success' | 'warn'; description?: string }

const openSnackbar = (props: SnackbarProps) => {
  if (!store.getters.isAuth) return
  snackbarState.visible = true
  snackbarState.text = `${props.text}`
  snackbarState.variant = `${props.variant}`
  snackbarState.description = props.description || ''
}

const closeSnackbar = () => {
  snackbarState.visible = false
  snackbarState.text = ''
  snackbarState.variant = ''
  snackbarState.description = ''
}

export const useSnackbar = () => ({ openSnackbar, closeSnackbar })

const snackbarState = reactive({
  visible: false,
  text: '',
  variant: '',
  description: '',
})

export const Snackbar = defineComponent({
  name: 'AppSnackbar',
  render() {
    return (
      <VSnackbar
        modelValue={snackbarState.visible}
        onUpdate:modelValue={v => (snackbarState.visible = v)}
        timeout={5200}
        location='bottom right'
        color={snackbarState.variant}
        multi-line
      >
        <div>{snackbarState.text}</div>
        {snackbarState.description && (
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: '0.8', whiteSpace: 'pre-line' }}>
            {snackbarState.description}
          </div>
        )}
      </VSnackbar>
    )
  },
})
