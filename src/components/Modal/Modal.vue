<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <v-theme-provider theme="light">
    <v-dialog v-model="open" v-bind="dialogProps" :width="width as string" :style="style" :persistent="persistent">
      <v-card class="modal_card modal_form scrollbar" :style="cardStyle">
        <div class="d-flex justify-space-between modal-top" style="height: 56px">
          <v-card-title class="modal-title">{{ $props.title }}</v-card-title>
          <v-btn class="modal_card_close_btn" variant="plain" rounded @click="open = false" v-if="!hideCloseCross"
            ><Icon icon="close" />
          </v-btn>
        </div>
        <slot :close-modal="closeModal"></slot>
      </v-card>
    </v-dialog>
  </v-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType, Ref } from 'vue'

export default defineComponent({
  name: 'ModalDialog',
  props: {
    title: String,
    modelValue: {
      type: [Boolean, Object] as PropType<boolean | undefined | null | Ref<boolean>>,
      default: null,
    },
    width: {
      type: String,
      default: '800',
    },
    position: {
      type: String as PropType<'top' | 'center'>,
      default: 'center',
    },
    persistent: Boolean,
    hideCloseCross: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return { open: this.modelValue ?? false }
  },
  watch: {
    open(newValue) {
      this.$emit('update:modelValue', newValue)
    },
    modelValue(newValue) {
      this.open = newValue
    },
  },
  methods: {
    closeModal() {
      this.open = false
    },
  },
  computed: {
    dialogProps() {
      if (this.modelValue == null) return { activator: 'parent' }
      else return {}
    },
    cardStyle() {
      const isDarkTheme = this.$vuetify.theme.global.current.dark
      return isDarkTheme ? { backgroundColor: this.$vuetify.theme.global.current.colors['modal-bg'] } : {}
    },
    style() {
      return {
        alignItems: this.position === 'top' ? 'flex-start' : 'center',
      }
    },
  },
})
</script>

<style>
.modal_card .v-table > .v-table__wrapper > table > thead,
.modal_card .v-table > .v-table__wrapper > table > thead > tr > th {
  background-color: transparent;
}
</style>
<style scoped>
.modal-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #393c3f;
  padding: 0;
}
.modal_card {
  padding: 0 16px 16px;
  background-color: rgb(var(--v-theme-modal-bg));
}
.modal-top {
  padding-top: 16px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: inherit;
}
.modal_card_close_btn,
.modal_card_close_btn.v-btn.v-btn--size-default {
  transform: translate(10px, -10px);
  padding: 8px;
  height: fit-content;
}
</style>
