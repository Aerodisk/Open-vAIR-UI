<script setup lang="ts">
import { bytesToSize } from '@helpers'
import { Button } from '@/components/Button'

// import { DiskChangeConfigButton } from './DiskChangeConfigButton'
import { InputItemTooltip } from './InputItemTooltip'
</script>

<template>
  <div class="disk_input_item">
    <div>{{ v.name }}</div>
    <div>{{ storage?.storage_type }} | {{ storage?.name }}</div>
    <div>
      {{ v.format }} | {{ v.emulation }} |
      {{ bytesToSize(Number(v.size || item?.size || 0)) }}
    </div>
    <div class="disk_input_item_last" v-if="!disabled">
      <!-- <DiskChangeConfigButton :disk="diskValue" @submit="edit" /> -->
      <Button :icon="{ icon: 'delete', size: 'small' }" size="small" variant="plain" @click.prevent.stop="remove" />
    </div>
    <InputItemTooltip :data="tooltipData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { pick } from 'lodash'
import { useWithConfirm } from '@/components/Modal'
import type { DiskExtraSettings, DiskInputValue } from './types'

export default defineComponent({
  name: 'AddDisksInputItem',
  props: {
    diskValue: {
      type: Object as PropType<DiskInputValue>,
      required: true,
    },
    disabled: Boolean,
  },
  emits: ['remove', 'edit'],
  methods: {
    remove() {
      useWithConfirm({
        title: this.$t('virtualization.vm.form.tabs.disks.deleteAction.title'),
        text: this.$t('virtualization.vm.form.tabs.disks.deleteAction.text', { name: this.diskValue.name }),
        confirmText: this.$t('delete'),
        onConfirm: () => this.$emit('remove', this.diskValue.__id),
        danger: true,
      })()
    },
    edit(settings: Omit<DiskExtraSettings, 'template'>) {
      this.$emit('edit', this.diskValue.__id, settings)
    },
  },
  computed: {
    item() {
      if (!this.$props.diskValue.volume_id) return null
      return this.$store.state.storage.volumes.find(i => i.id === this.$props.diskValue?.volume_id)
    },
    storage() {
      return this.$store.state.storage.storages.find(
        i => i.id === this.diskValue.storage_id || i.id === this.item?.storage_id
      )
    },
    v() {
      return this.$props.diskValue
    },
    tooltipData() {
      return {
        ...pick(this.v, ['name', 'format', 'emulation', 'qos']),
        ...pick(this.item, ['description', 'information', 'read_only']),
        read_only: this.v.read_only ?? this.item?.read_only,
        storageType: this.storage?.storage_type,
        storageName: this.storage?.name,
        size: this.v.size || this.item?.size,
        usedPercentage: this.item?.size && this.item?.used ? this.item.used / (this.item.size / 100) : null,
      }
    },
  },
})
</script>

<style>
.disk_input_tooltip {
  display: flex;
  flex-direction: column;
}
.disk_input_tooltip > div {
  display: flex;
  align-items: center;
  gap: 16px;
}
.disk_input_tooltip > div > div:first-child {
  min-width: 106px;
}
</style>

<style scoped>
.disk_input_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border: 1px solid rgb(var(--v-theme-form-input-border));
  padding: 4px 8px;
  border-radius: 3px;
  color: rgb(var(--v-theme-form-input-label));
}
.disk_input_item + .disk_input_item {
  margin-top: 8px;
}
.disk_input_item > div {
  width: 100%;
  height: fit-content;
}
.disk_input_item .disk_input_item_last {
  display: flex;
  align-items: center;
  width: fit-content;
}
</style>
