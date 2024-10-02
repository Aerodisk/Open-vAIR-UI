import { defineComponent } from 'vue'

import { DevicesActionTypes } from '@/store'
import { Modal } from '@/components/Modal'
import { IsExistsHoc } from '@/components/IsExistsHoc'

import { StorageCreateForm } from './StorageCreateForm'

export const StorageCreateModal = defineComponent({
  name: 'StorageCreateModal',
  render() {
    return (
      <Modal title={this.$t('storages.actions.create.modalTitle')} position='top'>
        {{
          default: ({ closeModal }: { closeModal: () => void }) => (
            <IsExistsHoc actions={[DevicesActionTypes.GET_DISK_LIST]} height={152}>
              <StorageCreateForm onReset={closeModal} />
            </IsExistsHoc>
          ),
        }}
      </Modal>
    )
  },
})
