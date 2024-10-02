import { defineComponent, PropType } from 'vue'

import type { VirtualMachineInfo } from '@api/generated'
import { VirtualizationActionTypes } from '@/store/modules'
import { routes } from '@/router'
import { MultiStepForm } from '@/components/Form'

import { initials, tabs } from './fields'
import type { FormDataType } from './types'
import { prepareCreatePayload, prepareEditPayload } from './utils'

export const VMForm = defineComponent({
  name: 'VMForm',
  props: { vm: Object as PropType<VirtualMachineInfo> },
  setup(props) {
    return { initials: initials(props.vm) }
  },
  methods: {
    goToVMList() {
      return this.$router.push(routes.virtualization.virtualMachines.root)
    },
    async submit(v: FormDataType) {
      this.vm
        ? await this.$store.dispatch(VirtualizationActionTypes.EDIT_VM, prepareEditPayload(v, this.initials, this.vm))
        : await this.$store.dispatch(VirtualizationActionTypes.CREATE_VM, prepareCreatePayload(v))

      this.goToVMList()
    },
  },
  render() {
    return (
      <MultiStepForm
        tabs={tabs()}
        initials={this.initials}
        onSubmit={this.submit}
        onReset={this.goToVMList}
        submitText={this.vm ? this.$t('save') : this.$t('create')}
      />
    )
  },
})
