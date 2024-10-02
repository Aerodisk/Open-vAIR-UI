import { defineComponent, type PropType } from 'vue'
import { pick } from 'lodash'

import { StorageActionTypes } from '@/store'
import { MultiStepForm } from '@/components/Form'

import { fields, initials } from './fields'
import type { FormDataType } from './types'
import { storageTypes } from './types'

export const StorageCreateForm = defineComponent({
  name: 'StorageCreateForm',
  props: { onReset: Function as PropType<() => void> },
  computed: {
    disks() {
      return this.$store.state.devices.disks
    },
  },
  methods: {
    async submit(v: FormDataType) {
      // TODO: поле mount_version для типа nfs
      const specs = v.storage_type === storageTypes.nfs ? pick(v, ['ip', 'path']) : pick(v, ['fs_type', 'path'])
      await this.$store.dispatch(StorageActionTypes.CREATE_STORAGE, {
        ...pick(v, ['name', 'description', 'storage_type']),
        // @ts-ignore incorrect api type
        specs,
      })
      this.onReset?.()
    },
  },
  render() {
    return <MultiStepForm tabs={fields(this.disks)} initials={initials} onSubmit={this.submit} onReset={this.onReset} />
  },
})
