<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <div class="multiselect_chip">
    {{ option.label }}
    <Icon @mousedown.prevent.stop="null" @click.prevent.stop="$emit('remove')" icon="close" size="xsmall" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { SelectOptionExt } from './types'

export default defineComponent({
  name: 'MultiselectInputChip',
  props: { option: { type: Object as PropType<SelectOptionExt>, required: true } },
  emits: ['remove'],
})
</script>
