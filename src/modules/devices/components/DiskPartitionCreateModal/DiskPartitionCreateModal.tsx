import { defineComponent, type PropType } from 'vue'

import type { LocalDisk } from '@api/generated'
import { t } from '@/locales'
import { bytesToSize, sizeToBytes } from '@helpers'
import { DevicesActionTypes } from '@/store'

import { ModalForm } from '@/components/Modal'
import type { FieldsPropType } from '@/components/Form'

const tPrefix = 'devices.physicalDisks.actions.createPartition'

const fields = (maxSize: number): FieldsPropType => [
  {
    type: 'size',
    name: 'size_value',
    label: t(`${tPrefix}.fields.size.label`),
    validation: 'required|min:1|maxSize',
    validationRules: {
      maxSize: node => Number(node.value) <= maxSize,
    },
    validationMessages: {
      maxSize: () => t(`${tPrefix}.fields.size.validation`, { size: bytesToSize(maxSize) }),
    },
  },
]

type FormDataType = {
  size_value: number
}

export const DiskPartitionCreateModal = defineComponent({
  name: 'DiskPartitionCreateModal',
  props: { disk: { type: Object as PropType<LocalDisk & { children: LocalDisk[] }>, required: true } },
  methods: {
    submit(v: FormDataType) {
      return this.$store.dispatch(DevicesActionTypes.CREATE_DISK_PARTITION, {
        storage_type: 'local_partition',
        local_disk_path: this.disk.path,
        size_unit: 'B',
        size_value: v.size_value,
      })
    },
  },
  render() {
    return (
      <ModalForm
        title={this.$t(`${tPrefix}.modalTitle`)}
        hint={{ text: this.$t(`${tPrefix}.hint`, { name: this.disk.path }) }}
        fields={fields(this.disk.size)}
        initials={{ size_value: sizeToBytes(1, 'G') }}
        onSubmit={this.submit}
        disableEqualInitialsReset
      />
    )
  },
})
