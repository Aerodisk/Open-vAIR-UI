<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <v-btn variant="text" size="small" class="refresh_button btn_icon_left" @click="click" :loading="loading">
    <div :style="{ opacity: showCheck ? 0 : 1, transition: showCheck ? 'none' : 'opacity .28s' }">
      <Icon icon="cached" :size="17" />
      {{ $t('refresh') }}
    </div>
    <div :style="{ opacity: showCheck ? 1 : 0, transition: showCheck ? 'none' : 'opacity .28s' }">
      <Icon icon="check" color="green" />
    </div>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTableRefreshButton',
  props: {
    onRefresh: Function,
  },
  data() {
    return { loading: false, showCheck: false }
  },
  methods: {
    async click() {
      if (this.loading || this.showCheck) return

      this.loading = true
      await this.onRefresh?.()
      this.showCheck = true
      this.loading = false
      setTimeout(() => (this.showCheck = false), 750)
    },
  },
})
</script>

<style scoped>
.refresh_button div:first-child {
  display: flex;
  align-items: center;
}
.refresh_button div:first-child svg {
  margin-right: 4px;
  transform: translateY(1px);
}
.refresh_button div:last-child {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.refresh_button div:last-child svg {
  transform: translateY(-2px);
}
</style>
