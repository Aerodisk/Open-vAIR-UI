import type { BridgeCreate } from '@api/generated'
import type { FieldsPropType } from '@/components/Form'
import type { Interface } from '@/store/modules/devices/state'
import { t } from '@/locales'

const tPrefix = 'devices.networkAdapters.actions.create.fields'

export const fields = (interfaces: Interface[]): FieldsPropType => [
  {
    type: 'text',
    name: 'name',
    label: t(`${tPrefix}.name.label`),
    placeholder: t(`${tPrefix}.name.placeholder`),
    validation: 'required|name',
  },
  {
    type: 'select',
    name: 'type',
    label: t(`${tPrefix}.type.label`),
    placeholder: t(`${tPrefix}.type.placeholder`),
    options: [{ label: 'bridge', value: 'bridge' }],
    validation: 'required',
  },
  {
    type: 'multiselect',
    name: 'interfaces',
    label: t(`${tPrefix}.interfaces.label`),
    placeholder: t(`${tPrefix}.interfaces.placeholder`),
    options: interfaces.map(i => ({ label: i.name, value: i })),
  },
  {
    type: 'text',
    name: 'ip',
    label: t(`${tPrefix}.ip.label`),
    placeholder: t(`${tPrefix}.ip.placeholder`),
    validation: 'ip',
  },
]

export const initials = { type: 'bridge', ip: '', interfaces: [] }

export type FormDataType = {
  name: string
  type: string
  interfaces: BridgeCreate['interfaces']
  ip: string
}
