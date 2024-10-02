import { defineComponent } from 'vue'

import { type ActionPayload, DevicesActionTypes } from '@/store'
import type { Bridge } from '@/store/modules/devices/state'
import { VirtualizationActionTypes } from '@/store/modules'

import { ModalForm } from '@/components/Modal'
import type { FieldsPropType } from '@/components/Form'

import type { FormDataType as PortgroupInputValue } from '../PortGroupCreateModal/types'
import { PortGroupsInput } from './PortGroupsInput'
import { t } from '@/locales'

const tPrefix = 'virtualization.virtualNetworks.actions.create'

const fields = (bridges: Bridge[]): FieldsPropType => [
  {
    type: 'text',
    name: 'network_name',
    label: t(`${tPrefix}.fields.name.label`),
    placeholder: t(`${tPrefix}.fields.name.placeholder`),
    validation: 'required|name',
  },
  {
    type: 'select',
    name: 'forward_mode',
    label: t(`${tPrefix}.fields.forwardMode.label`),
    placeholder: t(`${tPrefix}.fields.forwardMode.placeholder`),
    options: [{ value: 'bridge', label: 'bridge' }],
    validation: 'required',
  },
  {
    type: 'select',
    name: 'bridge',
    label: t(`${tPrefix}.fields.bridge.label`),
    placeholder: t(`${tPrefix}.fields.bridge.placeholder`),
    options: bridges.map(i => ({ value: i.ifname, label: i.ifname })),
    validation: 'required',
  },
  {
    type: 'select',
    name: 'virtual_port_type',
    label: t(`${tPrefix}.fields.virtualPortType.label`),
    placeholder: t(`${tPrefix}.fields.virtualPortType.placeholder`),
    options: [{ value: 'openvswitch', label: 'openvswitch' }],
    validation: 'required',
  },
  {
    type: 'custom',
    name: 'port_groups',
    render: v => <PortGroupsInput {...v} />,
    validation: 'required',
  },
]

const initials: Partial<FormDataType> = {
  forward_mode: 'bridge',
  virtual_port_type: 'openvswitch',
}

type FormDataType = {
  network_name: string
  forward_mode: 'bridge'
  bridge: string
  virtual_port_type: 'openvswitch'
  port_groups: PortgroupInputValue[]
}

export const VirtualNetworkCreateModal = defineComponent({
  name: 'VirtualNetworkCreateModal',
  computed: {
    bridges() {
      return this.$store.state.devices.bridges.filter(i => i.ifname !== 'virbr0')
    },
  },
  methods: {
    submit(v: FormDataType) {
      const payload: ActionPayload<VirtualizationActionTypes.CREATE_VIRTUAL_NETWORK> = {
        ...v,
        port_groups: v.port_groups.map(i => ({ ...i, is_trunk: i.is_trunk ? 'yes' : 'no' })),
      }
      return this.$store.dispatch(VirtualizationActionTypes.CREATE_VIRTUAL_NETWORK, payload)
    },
  },
  render() {
    return (
      <ModalForm
        title={this.$t(`${tPrefix}.title`)}
        fields={fields(this.bridges)}
        initials={initials}
        onSubmit={this.submit}
        isExist={{ actions: [DevicesActionTypes.GET_BRIDGE_LIST], height: 425 }}
      />
    )
  },
})
