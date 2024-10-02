<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { InputWrapper } from '../InputWrapper'
</script>

<template>
  <InputWrapper>
    <input
      type="checkbox"
      data-type="checkbox"
      class="formkit-input"
      :id="id"
      :aria-describedby="`help-${id}`"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    <div data-type="checkbox" class="formkit-input" :data-checked="value" :class="{ _disabled: disabled }">
      <Icon icon="check" />
    </div>
  </InputWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

export default defineComponent({
  name: 'CheckboxInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  computed: {
    value(): boolean {
      return this.$props.context.value
    },
    id() {
      return this.$props.context.id
    },
    disabled() {
      return Boolean(this.$props.context.disabled)
    },
  },
  methods: {
    handleInput() {
      if (this.disabled) return
      this.$props.context.node.input(!this.value)
    },
    handleFocus() {
      if (this.disabled) return
      this.$props.context.handlers.touch()
    },
    handleBlur() {
      if (this.disabled) return
      this.$props.context.handlers.blur()
    },
  },
})
</script>
