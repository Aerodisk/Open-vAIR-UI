import { defineComponent, PropType } from 'vue'
import { find } from 'lodash'

import type { VirtualMachineInfo } from '@api/generated'
import { bytesToSize } from '@helpers'

const tPrefix = 'virtualization.vm.card.tabs.images'

export const VMCardImagesTab = defineComponent({
  name: 'VMCardImagesTab',
  props: { vm: { type: Object as PropType<VirtualMachineInfo>, required: true } },
  computed: {
    images() {
      return this.$store.state.storage.images
    },
    storages() {
      return this.$store.state.storage.storages
    },
  },
  render() {
    const images = this.vm.disks.filter(i => i.type === 2)
    return (
      <div class='d-flex flex-column' style={{ gap: '8px' }}>
        {!images.length && this.$t(`${tPrefix}.noData`)}
        {images.map(v => {
          const image = find(this.images, { id: v.disk_id })
          const storage = find(this.storages, { id: image?.storage_id })
          if (!image || !storage) return null
          // TODO: ссылка на страницу хранилища
          // TODO: ссылка на страницу образа
          // TODO: Tooltip с подробной инфой по диску
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                border: '1px solid rgb(var(--v-theme-form-input-border))',
                padding: '4px 8px',
                borderRadius: '3px',
                color: 'rgb(var(--v-theme-form-input-label))',
                height: '34px',
              }}
            >
              <div>{v.name}</div>
              <div>
                {storage.storage_type} | {storage.name}
              </div>
              <div>{bytesToSize(Number(image.size || 0))}</div>
            </div>
          )
        })}
      </div>
    )
  },
})
