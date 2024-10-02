<script setup lang="ts">
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import { ModalItemsList } from './ModalItemsList'
</script>

<template>
  <v-theme-provider theme="light">
    <v-dialog
      v-model="open"
      v-bind="{ activator: modelValue != null ? undefined : activator || undefined }"
      width="fit-content"
      max-width="800"
    >
      <v-card class="modal_form scrollbar pa-4">
        <div class="d-flex justify-space-between">
          <v-card-title class="confirmModal-title" style="padding-left: 0">
            {{ title || $t('modal.confirmAction') }}
          </v-card-title>
          <v-btn class="modal_card_close_btn" variant="plain" rounded @click="open = false">
            <Icon icon="close" />
          </v-btn>
        </div>
        <div class="confirmModal-text">
          {{ text }}
        </div>
        <ModalItemsList v-if="itemsList?.length" :items="itemsList" />
        <div class="confirmModal-actions">
          <Button
            :title="cancelText || $t('cancel')"
            variant="secondary"
            @click="open = false"
            v-bind="buttonStructure?.cancel"
          />
          <div>
            <Button
              v-if="buttonStructure?.extra"
              @click="extraAction"
              v-bind="buttonStructure?.extra"
              variant="primary"
              class="mr-2"
            />
            <Button
              :title="confirmText || $t('run')"
              :color="danger ? 'error' : 'primary'"
              @click="confirm"
              v-bind="buttonStructure?.confirm"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Ref, PropType } from 'vue'
import type { ConfirmModalProps } from '../types'

export default defineComponent({
  name: 'ConfirmModal',
  props: {
    title: String,
    text: String,
    itemsList: Array as PropType<string[]>,
    confirmText: String,
    cancelText: String,
    danger: Boolean,
    modelValue: {
      type: [Boolean, Object] as PropType<boolean | undefined | null | Ref<boolean>>,
      default: null,
    },
    buttonStructure: Object as PropType<ConfirmModalProps['buttonStructure']>,
    activator: {
      type: String as PropType<ConfirmModalProps['activator']>,
      default: 'parent',
    },
  },
  emits: ['confirm', 'update:modelValue', 'extraAction'],
  data() {
    return { open: this.$props.modelValue ?? false }
  },
  watch: {
    open(v) {
      this.$emit('update:modelValue', v)
    },
    modelValue(v) {
      this.open = v
    },
  },
  methods: {
    confirm() {
      this.open = false
      this.$emit('confirm')
    },
    extraAction() {
      this.open = false
      this.$emit('extraAction')
    },
  },
})
</script>

<style scoped>
.confirmModal-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #393c3f;
  padding: 0;
}
.confirmModal-text {
  font-size: 16px;
  line-height: 20px;
  color: #393c3f;
  white-space: pre-line;
}
.confirmModal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 16px;
}
.modal_card_close_btn,
.modal_card_close_btn.v-btn.v-btn--size-default {
  transform: translate(10px, -10px);
  padding: 8px;
  height: fit-content;
}
</style>
