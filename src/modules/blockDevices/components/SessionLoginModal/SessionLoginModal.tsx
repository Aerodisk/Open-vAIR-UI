import { defineComponent } from 'vue'
import { isEmpty, omitBy } from 'lodash'

import { type ActionPayload, BlockDevicesActionTypes } from '@/store'
import { ModalForm } from '@/components/Modal'
import type { FieldsPropType } from '@/components/Form'
import { t } from '@/locales'

const tPrefix = 'blockDevices.actions.login'

const fields = (): FieldsPropType => [
  {
    type: 'text',
    name: 'ip',
    label: t(`${tPrefix}.fields.ip.label`),
    placeholder: t(`${tPrefix}.fields.ip.placeholder`),
    validation: 'required|ip',
  },
  {
    type: 'number',
    name: 'port',
    label: t(`${tPrefix}.fields.port.label`),
    placeholder: t(`${tPrefix}.fields.port.placeholder`),
  },
]

type FormDataType = {
  ip: string
  port?: string
}

export const SessionLoginModal = defineComponent({
  name: 'SessionLoginModal',
  methods: {
    submit(v: FormDataType) {
      return this.$store.dispatch(BlockDevicesActionTypes.LOGIN_SESSION, {
        ...omitBy(v, isEmpty),
        inf_type: 'iscsi',
      } as ActionPayload<BlockDevicesActionTypes.LOGIN_SESSION>)
    },
  },
  render() {
    return (
      <ModalForm title={this.$t(`${tPrefix}.modalTitle`)} fields={fields()} onSubmit={this.submit} submitText='Логин' />
    )
  },
})
