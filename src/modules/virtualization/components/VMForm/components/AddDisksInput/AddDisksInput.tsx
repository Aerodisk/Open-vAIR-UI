import { defineComponent, type PropType } from 'vue'
import { find, map, omit, pick } from 'lodash'
import type { FormKitFrameworkContext } from '@formkit/core'

import { isNotNullable } from '@helpers'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { MultiStepForm } from '@/components/Form'

import type { DiskExtraSettings, DiskInputValue, FormDataType } from './types'
import { initials, tabs } from './fields'
import InputItem from './InputItem.vue'

export const AddDisksInput = defineComponent({
  name: 'AddDisksInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  data() {
    return { open: false }
  },
  computed: {
    volumes() {
      return this.$store.state.storage.volumes
    },
    storages() {
      return this.$store.state.storage.storages
    },
    tabsConfig() {
      const volumesId = map(this.value, 'volume_id').filter(isNotNullable)
      return tabs(
        this.volumes.filter(i => !volumesId.includes(i.id)),
        this.storages
      )
    },
    value(): DiskInputValue[] {
      return this.$props.context.value || []
    },
    error() {
      const { errors, valid, validationVisible } = this.$props.context.state
      return errors || (!valid && validationVisible)
    },
    disabled() {
      return this.context.disabled
    },
  },
  methods: {
    toggleOpen(e: MouseEvent) {
      e.preventDefault()
      this.open = !this.open
    },
    async submit(v: FormDataType) {
      v = { ...initials, ...v }

      if (v.variant === 'exist') {
        const volume = find(this.volumes, { id: v.volume_id })
        if (!volume) return
        const diskValue = {
          __id: volume.id,
          ...pick(volume, ['name', 'format', 'read_only']),
          ...pick(v, ['emulation', 'volume_id']),
          qos: pick(v, ['iops_read', 'iops_write', 'mb_read', 'mb_write']),
          boot_order: 1,
          order: 1,
        }
        this.$props.context.node.input([...this.value, diskValue])
      } else {
        const diskValue = {
          __id: Date.now(),
          ...pick(v, ['name', 'format', 'emulation', 'storage_id', 'size', 'read_only']),
          qos: pick(v, ['iops_read', 'iops_write', 'mb_read', 'mb_write']),
          boot_order: 1,
          order: 1,
        }
        this.$props.context.node.input([...this.value, diskValue])
      }

      this.open = false
    },
    removeDisk(__id: number) {
      this.$props.context.node.input(this.value.filter(i => i.__id !== __id))
    },
    editDisk(__id: number, data: Omit<DiskExtraSettings, 'template'>) {
      const disk = find(this.value, i => i.__id === __id)
      if (disk) {
        disk.emulation = data.emulation
        disk.qos = omit(data, ['emulation'])
      }
    },
  },
  render() {
    return (
      <div>
        <Button
          title={this.$t('virtualization.vm.form.tabs.disks.modalTitle')}
          size='small'
          color={this.error ? 'error' : undefined}
          variant='secondary'
          disabled={!!this.disabled}
          onClick={this.toggleOpen}
        />
        <div class='mt-6'>
          {this.value.map((v: DiskInputValue) => (
            <InputItem diskValue={v} onRemove={this.removeDisk} onEdit={this.editDisk} disabled={!!this.disabled} />
          ))}
        </div>
        <Modal
          title={this.$t('virtualization.vm.form.tabs.disks.modalTitle')}
          modelValue={this.open}
          onUpdate:modelValue={v => (this.open = v)}
          position='top'
        >
          <MultiStepForm
            tabs={this.tabsConfig}
            initials={initials}
            onSubmit={this.submit}
            onReset={() => (this.open = false)}
            submitText={this.$t('add')}
            ignore
            hideTabs
          />
        </Modal>
      </div>
    )
  },
})
