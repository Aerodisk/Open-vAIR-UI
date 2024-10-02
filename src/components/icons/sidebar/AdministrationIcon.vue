<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <Icon icon="accountLock" :color="c.color" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdministrationIcon',
  computed: {
    c() {
      const colors = this.$vuetify.theme.global.current.colors
      return { color: colors['sidebar-item-icon'] }
    },
  },
})
</script>
