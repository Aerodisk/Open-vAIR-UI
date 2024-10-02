import { pick } from 'lodash'
import { defineComponent, type PropType } from 'vue'
import { compose } from 'lodash/fp'

import { preventDefault, stopPropagation } from '@helpers'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { ModalForm } from '@/components/Modal'

import type { NetworkInputValue, NetworkConfiguration } from './types'
import { configurationFields } from './fields'

const titleTranslationKey = 'virtualization.vm.form.tabs.networks.sections.configuration'
export const NetworkConfigChangeButton = defineComponent({
  name: 'NetworkConfigChangeModal',
  props: { network: { type: Object as PropType<NetworkInputValue>, required: true } },
  emits: ['submit'],
  methods: {
    submit(v: NetworkConfiguration) {
      this.$emit('submit', v)
    },
  },
  render() {
    const initials = pick(this.network, ['mode', 'model', 'mac'])
    const name = this.network.portgroup
      ? `${this.network.portgroup} (${this.network.interface})`
      : this.network.interface
    return (
      <Button
        icon={<Icon icon='pencil' size='small' />}
        size='small'
        variant='plain'
        onClick={compose(stopPropagation, preventDefault)}
      >
        <ModalForm
          title={`${this.$t(titleTranslationKey)} ${name}`}
          fields={configurationFields()}
          initials={initials}
          submitText={this.$t('save')}
          onSubmit={this.submit}
        />
      </Button>
    )
  },
})
