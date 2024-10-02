<script setup lang="ts">
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { WidgetExample } from './WidgetExample'

const tPrefix = 'dashboard.widgets.gridSettingsWidget'
</script>

<template>
  <Modal
    :title="$t(`${tPrefix}.modalTitle`)"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    width="1100"
  >
    <div class="mb-4">
      <div class="mb-2">{{ $t(`${tPrefix}.gridSettings.title`) }}</div>
      <div class="d-flex">
        <div class="mr-16">
          <FormKit
            type="checkbox"
            :label="$t(`${tPrefix}.gridSettings.changeWidgetSize`)"
            :model-value="settings.isResizable"
            @update:modelValue="settings = { ...settings, isResizable: $event as boolean }"
          />
          <FormKit
            type="checkbox"
            :label="$t(`${tPrefix}.gridSettings.movingWidgets`)"
            :model-value="settings.isDraggable"
            @update:modelValue="settings = { ...settings, isDraggable: $event as boolean }"
          />
        </div>
        <div>
          <FormKit
            type="checkbox"
            :label="$t(`${tPrefix}.gridSettings.disableCollision`)"
            :model-value="settings.preventCollision"
            @update:modelValue="settings = { ...settings, preventCollision: $event as boolean }"
          />
          <FormKit
            type="checkbox"
            :label="$t(`${tPrefix}.gridSettings.verticalCompact`)"
            :model-value="settings.verticalCompact"
            @update:modelValue="settings = { ...settings, verticalCompact: $event as boolean }"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="mb-2">{{ $t(`${tPrefix}.selectWidgets`) }}</div>
      <div class="widget-examples-list">
        <div
          v-for="widget in list"
          :key="widget.i"
          class="widget-examples-item"
          :class="{ _active: widget.added }"
          @click="toggleWidget(widget)"
        >
          <WidgetExample :widget-name="widget.i" />
        </div>
      </div>
    </div>
    <div>
      <div class="mb-2">{{ $t(`${tPrefix}.resetSettings.title`) }}</div>
      <Button :title="$t(`${tPrefix}.resetSettings.submitText`)" color="error" @click="reset" />
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { keys } from 'lodash'

import { DashboardMutationTypes } from '@/store'
import type { State } from '@/store/modules/dashboard/state'
import { useWithConfirm } from '@/components/Modal'

import { findGridRef, findNewPosition, layoutItemWithDefault } from '../DashboardGrid/utils'
import type { DashboardWidgets } from '../DashboardWidget/widgets'
import { widgetExamples } from './examples'

const tPrefix = 'dashboard.widgets.gridSettingsWidget'

export default defineComponent({
  name: 'DashboardWidgetAddModal',
  props: { modelValue: Boolean },
  emits: ['update:modelValue'],
  computed: {
    list() {
      const addedWidgets = this.$store.state.dashboard.layout?.map(i => i.i)
      return (keys(widgetExamples) as (keyof typeof widgetExamples)[]).map(widget => ({
        i: widget,
        added: !!addedWidgets?.find(i => i === widget),
      }))
    },
    settings: {
      get() {
        return this.$store.state.dashboard.gridSettings
      },
      set(settings: State['gridSettings']) {
        this.$store.commit(DashboardMutationTypes.SET_GRID_SETTINGS, settings)
      },
    },
    grid() {
      return findGridRef(this)
    },
  },
  methods: {
    toggleWidget({ i, added }: { i: keyof typeof DashboardWidgets; added: boolean }) {
      if (added) return this.$store.commit(DashboardMutationTypes.REMOVE_GRID_ITEM, i)

      const itemDefault = layoutItemWithDefault({ i })
      const item = {
        ...itemDefault,
        ...findNewPosition(this.$store.state.dashboard.layout, itemDefault, this.grid?.lastBreakpoint || 30),
      }
      this.$store.commit(DashboardMutationTypes.ADD_GRID_ITEM, item)
    },
    reset() {
      useWithConfirm({
        title: this.$t(`${tPrefix}.resetSettings.title`),
        text: this.$t(`${tPrefix}.resetSettings.text`),
        onConfirm: () => {
          this.$store.commit(DashboardMutationTypes.RESET_GRID, undefined)
          this.$emit('update:modelValue', false)
        },
        confirmText: this.$t(`${tPrefix}.resetSettings.submitText`),
        danger: true,
      })()
    },
  },
})
</script>

<style>
.widget-examples-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.widget-examples-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 4px solid transparent;
  cursor: pointer;
  transition: border-color 0.28s, box-shadow 0.28s, opacity 0.28s;
  opacity: 0.9;
}
.widget-examples-item:hover {
  opacity: 0.95;
}
.widget-examples-item._active {
  border-color: rgb(var(--v-theme-green));
  box-shadow: 0 0 4px 0 rgba(60, 255, 0, 0.5);
  opacity: 1;
}
</style>
