import { defineComponent } from 'vue'

import { StorageActionTypes } from '@/store'
import { ModalForm } from '@/components/Modal'

import { fields, type FormDataType, initials } from './fields'

export const VolumeCreateModal = defineComponent({
  name: 'VolumeCreateModal',
  computed: {
    storages() {
      return this.$store.state.storage.storages
    },
  },
  methods: {
    submit(v: FormDataType) {
      return this.$store.dispatch(StorageActionTypes.CREATE_VOLUME, v)
    },
  },
  render() {
    return (
      <ModalForm
        title={this.$t('storages.disks.actions.create.modalTitle')}
        fields={fields(this.storages)}
        initials={initials}
        onSubmit={this.submit}
        isExist={{ actions: [StorageActionTypes.GET_STORAGE_LIST], height: 324 }}
      />
    )
  },
})
