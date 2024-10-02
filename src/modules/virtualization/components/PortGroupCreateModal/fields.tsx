import type { FieldsPropType } from '@/components/Form'
import { t } from '@/locales'

import { TagsInput } from './TagsInput'

const tPrefix = 'virtualization.virtualNetworks.actions.createPortgroup.fields'

export const fields = (): FieldsPropType => [
  {
    type: 'text',
    name: 'port_group_name',
    label: t(`${tPrefix}.name.label`),
    placeholder: t(`${tPrefix}.name.placeholder`),
    validation: 'required|name',
  },
  {
    type: 'custom',
    name: 'tags',
    label: t(`${tPrefix}.tags.label`),
    render: v => <TagsInput {...v} />,
    validation: 'required',
  },
  {
    type: 'checkbox',
    name: 'is_trunk',
    label: t(`${tPrefix}.isTrunk.label`),
    style: { marginTop: '8px' },
  },
]
