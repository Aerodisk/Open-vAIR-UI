import { defineComponent } from 'vue'
import { Icon } from '@/components/Icon'

import { AppActionTypes } from '@/store'
import { extractErrorMessage } from '@helpers'

import { AppLogo } from '@icons/logo'
import Form, { FieldsPropType } from '@/components/Form'
import { FormSlotProps } from '@/components/Form/types'
import { setFormError } from '@/components/Form/helpers'
import { Button } from '@/components/Button'
import { t } from '@/locales'

const fields = (): FieldsPropType => [
  {
    type: 'text',
    name: 'username',
    placeholder: t('authForm.fields.username'),
    validation: 'required',
  },
  {
    type: 'text',
    variant: 'password',
    name: 'password',
    placeholder: t('authForm.fields.password'),
    validation: 'required',
  },
]

type FormDataType = {
  username: string
  password: string
}

const formId = 'login_form'

const wrongCredentialsMessages = [
  'RpcCallException: No row was found when one was required',
  'RpcCallException: UserCredentialsException: Wrong credentials',
]

export const LoginForm = defineComponent({
  name: 'LoginForm',
  methods: {
    async submit(v: FormDataType) {
      const res = await this.$store.dispatch(AppActionTypes.LOGIN, v)

      if (res !== true) {
        const error = this.$store.state.actionsState[AppActionTypes.LOGIN].error
        const errorMessage = error
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            wrongCredentialsMessages.includes((error as unknown as any)?.response?.data?.message)
            ? this.$t('apiErrors.auth')
            : extractErrorMessage(error)
          : this.$t('apiErrors.code.500')

        setFormError(formId, errorMessage)
      }
    },
  },
  render() {
    return (
      <div class='loginForm_card'>
        <AppLogo class='loginForm_logo' style={{ width: '220px' }} />
        <Form formId={formId} fields={fields()} onSubmit={this.submit}>
          {{
            actions: ({ state }: FormSlotProps) => (
              <Button
                type='submit'
                class='w-100 mt-4'
                title={this.$t('authForm.login')}
                iconPosition='right'
                icon={<Icon icon='login' color='white' style={{ transform: 'translateY(1.5px)' }} />}
                loading={state.loading}
              />
            ),
          }}
        </Form>
      </div>
    )
  },
})
