import { defineComponent } from 'vue'

import { DevicesActionTypes } from '@/store'
import { ModalForm } from '@/components/Modal'

import { fields, initials, type FormDataType } from './fields'

const tPrefix = 'devices.networkAdapters.actions.create'

export const BridgeCreateModal = defineComponent({
  name: 'BridgeCreateModal',
  methods: {
    submit(v: FormDataType) {
      return this.$store.dispatch(DevicesActionTypes.CREATE_BRIDGE, v)
    },
  },
  computed: {
    interfaces() {
      return this.$store.state.devices.interfaces
    },
  },
  render() {
    return (
      <ModalForm
        title={this.$t(`${tPrefix}.title`)}
        fields={fields(this.interfaces)}
        initials={initials}
        onSubmit={this.submit}
        hint={{ text: this.$t(`${tPrefix}.hint`), variant: 'warn' }}
      />
    )
  },
})
