import { defineComponent, type PropType } from 'vue'
import { find, mapValues, omit } from 'lodash'
import type { FormKitFrameworkContext } from '@formkit/core'

import type { PortGroup } from '@api/generated'
import { preventDefault } from '@helpers'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { MultiStepForm } from '@/components/Form'

import type { FormDataType, NetworkConfiguration, NetworkInputValue } from './types'
import { initials, tabs } from './fields'
import InputItem from './InputItem.vue'

const tPrefix = 'virtualization.vm.form.tabs.networks'

export const AddNetworkInput = defineComponent({
  name: 'AddNetworkInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  computed: {
    bridges() {
      return this.$store.state.devices.bridges.filter(i => !this.value.find(v => v.interface === i.ifname))
    },
    portgroups(): (PortGroup & { interface: string })[] {
      return this.$store.state.virtualization.virtualNetworks
        .map(vnet => vnet.port_groups.map(i => ({ ...i, interface: `${vnet.network_name}` })))
        .flat()
        .filter(i => !this.value.find(v => v.interface === i.interface && v.portgroup && i.port_group_name))
    },
    value(): NetworkInputValue[] {
      return this.context.value || []
    },
    error() {
      const { errors, valid, validationVisible } = this.$props.context.state
      return errors || (!valid && validationVisible)
    },
    disabled() {
      return this.context.disabled
    },
  },
  methods: {
    submit(v: FormDataType, closeModal: () => void) {
      v = { ...initials(), ...v }

      if ('portgroup' in v) {
        // @ts-ignore
        const iface = this.portgroups.find(i => i.port_group_name === v.portgroup)?.interface
        const itemValue = {
          ...omit(v, ['port_group_name']),
          mode: 'virtual_network',
          interface: iface,
          __id: Date.now(),
          order: 1,
        }
        this.$props.context.node.input([...this.value, itemValue])
      } else {
        const itemValue = { ...v, __id: Date.now(), order: 1 }
        this.$props.context.node.input([...this.value, itemValue])
      }

      closeModal()
    },
    remove(__id: number) {
      this.$props.context.node.input(this.value.filter(i => i.__id !== __id))
    },
    editNetwork(__id: number, data: NetworkConfiguration) {
      const vNet = find(this.value, i => i.__id === __id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (vNet) mapValues(data, (value, key) => ((vNet as any)[key] = value))
    },
  },
  render() {
    return (
      <div>
        <Button
          title={this.$t(`${tPrefix}.btnAdd`)}
          size='small'
          color={this.error ? 'error' : undefined}
          variant='secondary'
          disabled={!!this.disabled}
          onClick={preventDefault}
        >
          <Modal title={this.$t(`${tPrefix}.modalTitle`)} position='top'>
            {{
              default: ({ closeModal }: { closeModal: () => void }) => (
                <MultiStepForm
                  tabs={tabs(this.bridges, this.portgroups)}
                  initials={initials()}
                  onSubmit={v => this.submit(v, closeModal)}
                  submitText={this.$t('add')}
                  onReset={closeModal}
                  hideTabs
                  ignore
                />
              ),
            }}
          </Modal>
        </Button>
        <div class='mt-6'>
          {this.value.map(i => (
            <InputItem networkValue={i} onRemove={this.remove} onEdit={this.editNetwork} disabled={!!this.disabled} />
          ))}
        </div>
      </div>
    )
  },
})
