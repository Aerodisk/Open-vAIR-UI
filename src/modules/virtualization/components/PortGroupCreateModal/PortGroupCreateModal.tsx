import { defineComponent } from 'vue'

import { VirtualizationActionTypes } from '@/store/modules'
import { PortGroupCreateModalForm } from './PortGroupCreateModalForm'
import { FormDataType } from './types'

export const PortGroupCreateModal = defineComponent({
  name: 'PortGroupCreateModal',
  props: { id: { type: String, required: true } },
  methods: {
    submit(v: FormDataType) {
      const payload = { ...v, is_trunk: v.is_trunk ? 'yes' : 'no', id: this.id }
      return this.$store.dispatch(VirtualizationActionTypes.ADD_PORTGROUP, payload)
    },
  },
  render() {
    return <PortGroupCreateModalForm onSubmit={this.submit} />
  },
})
