<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <div class="card" :style="{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }">
    <div @click="goBack" class="card_backlink mb-4">
      <Icon icon="arrowLeft" />
      {{ backlink?.text }}
    </div>
    <v-tabs v-model="tab" v-if="tabs?.length">
      <v-tab v-for="i in tabs" :key="i.value" :value="i.value">{{
        typeof i.text === 'string' ? i.text : i.text.value
      }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="i in tabs" :key="i.value" :value="i.value">
        <slot :name="i.value" />
      </v-window-item>
    </v-window>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { chain } from 'lodash'

export default defineComponent({
  name: 'AppCard',
  props: {
    backlink: undefined as unknown as PropType<{ text: string; onClick?: Function } | undefined>,
    tabs: Array as PropType<{ text: string | ComputedRef<string>; value: string }[]>,
    maxWidth: Number,
  },
  watch: {
    tab(tab) {
      this.$router.replace({ query: { tab } })
    },
  },
  methods: {
    goBack() {
      if (this.backlink?.onClick) return this.backlink?.onClick()
      if (this.$router.options.history.state.back) return this.$router.back()
      const prevItem = chain(this.$route.matched).dropRight().last().pick(['path', 'params', 'query']).value()
      this.$router.replace(prevItem.path ? prevItem : '/')
    },
  },
  data() {
    return { tab: this.$route.query.tab || null }
  },
})
</script>

<style scoped>
.card {
  position: relative;
  padding: 24px;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-card-bg));
}
.card_backlink {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 14px;
  line-height: 28px;
  width: fit-content;
  color: rgb(var(--v-theme-text));
  transition: opacity 0.2s;
  cursor: pointer;
}
.card_backlink:hover {
  opacity: 0.8;
}
</style>
