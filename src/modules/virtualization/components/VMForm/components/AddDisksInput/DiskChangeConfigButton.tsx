import { defineComponent, type PropType } from 'vue'
import { omit } from 'lodash'
import { compose } from 'lodash/fp'

import { ModalForm } from '@/components/Modal'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { preventDefault, stopPropagation } from '@helpers'

import { extraSettingsFields } from './fields'
import type { DiskExtraSettings, DiskInputValue } from './types'

const titleTranslationKey = 'virtualization.vm.form.tabs.disks.sections.diskConfiguration'

export const DiskChangeConfigButton = defineComponent({
  name: 'DiskChangeConfigButton',
  props: { disk: { type: Object as PropType<DiskInputValue>, required: true } },
  emits: ['submit'],
  methods: {
    submit(v: DiskExtraSettings) {
      this.$emit('submit', omit(v, ['template']))
    },
  },
  render() {
    const initials = { emulation: this.disk.emulation, ...this.disk.qos }
    return (
      <Button
        icon={<Icon icon='pencil' size='small' />}
        size='small'
        variant='plain'
        onClick={compose(stopPropagation, preventDefault)}
      >
        <ModalForm
          title={this.$t(titleTranslationKey) + ' ' + this.disk.name}
          fields={extraSettingsFields()}
          initials={initials}
          submitText={this.$t('save')}
          onSubmit={this.submit}
        />
      </Button>
    )
  },
})
