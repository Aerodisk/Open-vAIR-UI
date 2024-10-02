import { t } from '@/locales'
import { generateMac } from '@helpers'
import { DevicesActionTypes, store, VirtualizationActionTypes } from '@/store'
import type { Bridge } from '@/store/modules/devices/state'

import type { TabsPropType } from '@/components/Form'
import type { FieldsBlockWithFields, FieldType } from '@/components/Form/types'
import type { PortGroup } from '@api/generated'

const tPrefix = 'virtualization.vm.form.tabs.networks'

export const configurationFields = (): (FieldType | FieldsBlockWithFields)[] => [
  {
    direction: 'row',
    fields: [
      {
        showIf: v => !(v.variant === 'vnet'),
        type: 'select',
        name: 'mode',
        label: t(`${tPrefix}.fields.mode.label`),
        placeholder: t(`${tPrefix}.fields.mode.placeholder`),
        validation: 'required',
        options: ['nat', 'user', 'isolated', 'vepa', 'default', 'bridge'].map(i => ({ value: i, label: i })),
      },
      {
        type: 'select',
        name: 'model',
        label: t(`${tPrefix}.fields.model.label`),
        placeholder: t(`${tPrefix}.fields.model.placeholder`),
        validation: 'required',
        options: [{ label: 'virtio', value: 'virtio' }],
      },
      {
        type: 'text',
        name: 'mac',
        label: 'MAC',
        placeholder: t(`${tPrefix}.fields.mac.placeholder`),
        textTransform: 'upperCase',
        validation: 'required|mac',
      },
    ],
  },
]

const bridgeFields = (bridges: Bridge[]): (FieldType | FieldsBlockWithFields)[] => [
  {
    type: 'table',
    name: 'interface',
    headers: [
      { key: 'ifname', title: t('name') },
      { key: 'address', title: 'MAC' },
      { key: 'broadcast', title: 'broadcast' },
      { key: 'flags', title: 'flags', valueRender: v => v.join(', ') },
      { key: 'operstate', title: t('state') },
    ],
    items: bridges,
    itemValue: 'ifname',
    multiple: false,
    validation: 'required',
    validationMessages: { required: t(`${tPrefix}.fields.network.validationMessage`) },
    onRefresh: () => store.dispatch(DevicesActionTypes.GET_BRIDGE_LIST, undefined),
  },
]

const vnetFields = (portgroups: (PortGroup & { interface: string })[]): (FieldType | FieldsBlockWithFields)[] => [
  {
    type: 'table',
    name: 'portgroup',
    headers: [
      { key: 'port_group_name', title: t(`${tPrefix}.fields.vnet.name`) },
      { key: 'is_trunk', title: t(`${tPrefix}.fields.vnet.isTrunk`) },
      { key: 'tags', title: t(`${tPrefix}.fields.vnet.tags`), valueRender: v => v?.join(', ') },
      { key: 'interface', title: t(`${tPrefix}.fields.vnet.interface`) },
    ],
    items: portgroups,
    itemValue: 'port_group_name',
    multiple: false,
    validation: 'required',
    validationMessages: { required: t(`${tPrefix}.fields.network.validationMessage`) },
    onRefresh: () => store.dispatch(VirtualizationActionTypes.GET_VIRTUAL_NETWORK_LIST, undefined),
  },
]

export const tabs = (bridges: Bridge[], portgroups: (PortGroup & { interface: string })[]): TabsPropType => [
  {
    title: t(`${tPrefix}.tabs.variant`),
    fields: [
      {
        type: 'radio',
        name: 'variant',
        label: t(`${tPrefix}.fields.variant.label`),
        options: [
          { label: t(`${tPrefix}.fields.variant.bridge`), value: 'bridge' },
          { label: t(`${tPrefix}.fields.variant.vnet`), value: 'vnet' },
        ],
      },
    ],
  },
  { title: t(`${tPrefix}.tabs.bridge`), showIf: v => v.variant === 'bridge', fields: bridgeFields(bridges) },
  { title: t(`${tPrefix}.tabs.vnet`), showIf: v => v.variant === 'vnet', fields: vnetFields(portgroups) },
  // {
  //   title: t(`${tPrefix}.tabs.extraSettings`),
  //   fields: [{ direction: 'row', title: t(`${tPrefix}.sections.configuration`), fields: configurationFields() }],
  // },
]

export const initials = () => ({
  mode: 'bridge',
  model: 'virtio',
  mac: generateMac(),
  variant: 'bridge',
})
