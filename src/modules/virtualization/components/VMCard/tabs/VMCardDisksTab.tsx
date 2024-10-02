import { defineComponent, PropType } from 'vue'
import { find, pick } from 'lodash'

import type { VirtualMachineInfo } from '@api/generated'
import { bytesToSize } from '@helpers'
import { InputItemTooltip } from '@/modules/virtualization/components/VMForm/components/AddDisksInput/InputItemTooltip'

const tPrefix = 'virtualization.vm.card.tabs.disks'

export const VMCardDisksTab = defineComponent({
  name: 'VMCardDisksTab',
  props: { vm: { type: Object as PropType<VirtualMachineInfo>, required: true } },
  computed: {
    volumes() {
      return this.$store.state.storage.volumes
    },
    storages() {
      return this.$store.state.storage.storages
    },
  },
  render() {
    const disks = this.vm.disks.filter(i => i.type === 1)
    return (
      <div class='d-flex flex-column' style={{ gap: '8px' }}>
        {!disks.length && this.$t(`${tPrefix}.noData`)}
        {disks.map(v => {
          const volume = find(this.volumes, { id: v.disk_id })
          const storage = find(this.storages, { id: volume?.storage_id })
          if (!volume || !storage) return null
          // TODO: ссылка на страницу хранилища
          // TODO: ссылка на страницу диска
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
                {storage?.storage_type} | {storage?.name}
              </div>
              <div>
                {v.format} | {v.emulation} | {bytesToSize(Number(v.size || volume?.size || 0))}
              </div>

              <InputItemTooltip
                data={{
                  ...pick(v, ['name', 'format', 'emulation', 'qos']),
                  ...pick(volume, ['description', 'information']),
                  storageType: storage.storage_type,
                  storageName: storage.name,
                  size: v.size || volume.size,
                  usedPercentage: volume.size && volume.used ? volume.used / (volume.size / 100) : null,
                }}
              />
            </div>
          )
        })}
      </div>
    )
  },
})
