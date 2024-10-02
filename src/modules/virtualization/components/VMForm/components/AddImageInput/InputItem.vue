<script setup lang="ts">
import { Button } from '@/components/Button'
import { bytesToSize } from '@helpers'
</script>

<template>
  <div class="disk_input_item">
    <div>
      {{ v.name }}
    </div>
    <div>{{ storage?.storage_type }} | {{ storage?.name }}</div>
    <div>
      {{ bytesToSize(Number(item?.size || 0)) }}
    </div>
    <div v-if="!disabled" class="disk_input_item_last">
      <Button :icon="{ icon: 'delete', size: 'small' }" size="small" variant="plain" @click.prevent.stop="remove" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useWithConfirm } from '@/components/Modal'

import type { ImageInputValue } from './types'

export default defineComponent({
  name: 'AddImageInputItem',
  props: { imageValue: { type: Object as PropType<ImageInputValue>, required: true }, disabled: Boolean },
  emits: ['remove'],
  methods: {
    remove() {
      useWithConfirm({
        title: this.$t('virtualization.vm.form.tabs.images.deleteAction.title'),
        text: this.$t('virtualization.vm.form.tabs.images.deleteAction.text', { name: this.imageValue.name }),
        confirmText: this.$t('delete'),
        onConfirm: () => this.$emit('remove', this.imageValue.__id),
        danger: true,
      })()
    },
  },
  computed: {
    v() {
      return this.imageValue
    },
    item() {
      if (!this.$props.imageValue.image_id) return null
      return this.$store.state.storage.images.find(i => i.id === this.imageValue?.image_id)
    },
    storage() {
      if (!this.item) return null
      return this.$store.state.storage.storages.find(i => i.id === this.item?.storage_id)
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
