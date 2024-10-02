import { capitalize, defineComponent, type PropType } from 'vue'
import { round } from 'lodash'
import { VTooltip } from 'vuetify/components'

import { ProgressLinearWidget } from '@/components/Widget'
import { booleanTranslate, bytesToSize } from '@helpers'

const tPrefix = 'virtualization.vm'
const tPrefixDisk = 'storages.disks.actions'

export type Props = {
  name?: string
  description?: string
  information?: string
  format?: string
  emulation?: string
  qos?: {
    iops_read?: string | number
    iops_write?: string | number
    mb_read?: string | number
    mb_write?: string | number
  }
  read_only?: boolean
  storageType?: string
  storageName?: string
  size?: string | number
  usedPercentage?: number | null
}

export const InputItemTooltip = defineComponent({
  name: 'InputItemTooltip',
  props: { data: { type: Object as PropType<Props>, required: true } },
  render() {
    const v = this.data
    return (
      <VTooltip activator='parent'>
        <div class='disk_input_tooltip'>
          <div>
            <div>{this.$t('name')}:</div>
            <div>{v.name}</div>
          </div>
          <div>
            <div>{this.$t('description')}:</div>
            <div>{v.description || '-'}</div>
          </div>
          <div>
            <div>{this.$t(`${tPrefix}.card.tabs.main.fields.information`)}:</div>
            <div>{v.information || '-'}</div>
          </div>
          <div>
            <div>{this.$t('format')}:</div>
            <div>{v.format}</div>
          </div>
          <div>
            <div>{this.$t('storages.disks.actions.create.fields.read_only.label')}:</div>
            <div>{booleanTranslate(!!v.read_only)}</div>
          </div>
          <div>
            <div>{this.$t(`${tPrefix}.form.tabs.disks.fields.emulation.label`)}:</div>
            <div>{v.emulation}</div>
          </div>
          <div>
            <div>QOS {this.$t(`${tPrefix}.form.tabs.disks.sections.readWriteSec`)}:</div>
            <div>
              {this.$t(`${tPrefix}.form.tabs.disks.fields.iopsRead.label`)}: {v.qos?.mb_read}{' '}
              {this.$t(`${tPrefix}.form.tabs.disks.fields.iopsWrite.label`)}: {v.qos?.mb_read}
            </div>
          </div>
          <div>
            <div>QOS {this.$t(`${tPrefix}.form.tabs.disks.sections.iops`)}:</div>
            <div>
              {this.$t(`${tPrefix}.form.tabs.disks.fields.iopsRead.label`)}: {v.qos?.iops_read}{' '}
              {this.$t(`${tPrefix}.form.tabs.disks.fields.iopsWrite.label`)}: {v.qos?.iops_write}
            </div>
          </div>
          <div>
            <div>{this.$t(`${tPrefixDisk}.create.fields.storage.label`)}:</div>
            <div>
              {v.storageType} | {v.storageName}
            </div>
          </div>
          <div>
            <div>{capitalize(this.$t('sizes.size'))}:</div>
            <div>{bytesToSize(Number(v.size))}</div>
          </div>
          {!!v.usedPercentage && (
            <div>
              <div>{capitalize(this.$t('sizes.used'))}:</div>
              <div class='w-100 d-flex align-center' style='gap: 8px'>
                <div>{round(Number(v.usedPercentage))}%</div>
                <ProgressLinearWidget
                  value={Number(v.usedPercentage)}
                  noGradient
                  style={{ transform: 'translateY(1px)' }}
                />
              </div>
            </div>
          )}
        </div>
      </VTooltip>
    )
  },
})
