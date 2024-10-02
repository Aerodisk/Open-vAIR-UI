<script setup lang="ts">
import { Button } from '@/components/Button'
import { NetworkConfigChangeButton } from './NetworkConfigChangeButton'
</script>

<template>
  <div class="disk_input_item">
    <div>{{ name }}</div>
    <div>{{ v.mode }} | {{ v.model }}</div>
    <div>{{ v.mac }}</div>
    <div v-if="!disabled" class="disk_input_item_last">
      <NetworkConfigChangeButton :network="networkValue" @submit="edit" />
      <Button :icon="{ icon: 'delete', size: 'small' }" size="small" variant="plain" @click.prevent.stop="remove" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useWithConfirm } from '@/components/Modal'
import type { NetworkConfiguration, NetworkInputValue } from './types'

export default defineComponent({
  name: 'AddNetworkInputItem',
  props: { networkValue: { type: Object as PropType<NetworkInputValue>, required: true }, disabled: Boolean },
  emits: ['remove', 'edit'],
  computed: {
    v() {
      return this.networkValue
    },
    name() {
      if (this.v.portgroup) return `${this.v.portgroup} (${this.v.interface})`
      return this.v.interface
    },
  },
  methods: {
    remove() {
      useWithConfirm({
        title: this.$t('virtualization.vm.form.tabs.networks.deleteAction.title'),
        text: this.$t('virtualization.vm.form.tabs.networks.deleteAction.text', {
          name: this.networkValue.portgroup
            ? `${this.networkValue.portgroup} (${this.networkValue.interface})`
            : this.networkValue.interface,
        }),
        confirmText: this.$t('delete'),
        onConfirm: () => this.$emit('remove', this.networkValue.__id),
        danger: true,
      })()
    },
    edit(settings: NetworkConfiguration) {
      this.$emit('edit', this.networkValue.__id, settings)
    },
  },
})
</script>

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
