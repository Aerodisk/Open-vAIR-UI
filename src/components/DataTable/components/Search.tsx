import { defineComponent, ref } from 'vue'
import { debounce } from 'lodash'

import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'

export const Search = defineComponent({
  name: 'DataTableSearch',
  props: { modelValue: String },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const updateModelValue = ref(debounce((value: string) => emit('update:modelValue', value), 300))
    return { updateModelValue }
  },
  data() {
    return { focus: false, locValue: this.modelValue || '' }
  },
  computed: {
    _active() {
      return this.focus || !!this.locValue
    },
  },
  methods: {
    clear() {
      this.locValue = ''
      this.$emit('update:modelValue', '')
    },
    input(e: Event) {
      this.locValue = (e.target as HTMLInputElement).value
      this.updateModelValue(this.locValue)
    },
  },
  watch: {
    modelValue(v) {
      this.locValue = v
    },
  },
  render() {
    return (
      <div class={`search ${this._active ? ' _active' : null}`}>
        <Icon icon='magnify' size={16} />
        <input
          value={this.locValue}
          onInput={this.input}
          placeholder={this.$t('search')}
          onFocus={() => (this.focus = true)}
          onBlur={() => (this.focus = false)}
        />
        <div class='search-clear-btn'>
          <Button
            icon={{ icon: 'close', size: 'xsmall' }}
            size='small'
            variant='plain'
            onClick={this.clear}
            style={{ padding: 0, height: '14px' }}
          />
        </div>
      </div>
    )
  },
})
