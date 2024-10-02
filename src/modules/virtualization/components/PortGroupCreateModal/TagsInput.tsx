import { defineComponent, type PropType } from 'vue'
import { compose } from 'lodash/fp'
import type { FormKitFrameworkContext } from '@formkit/core'

import { preventDefault } from '@helpers'
import Chip from '@/components/Form/fields/MultiSelectInput/MultiselectInputChip.vue'
import { Button } from '@/components/Button'

const tPrefix = 'virtualization.virtualNetworks.actions.createPortgroup.fields.tags'

export const TagsInput = defineComponent({
  name: 'TagsInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  data() {
    return { open: true, search: '' }
  },
  computed: {
    value(): string[] {
      return this.$props.context.value || []
    },
  },
  methods: {
    addTag() {
      if (!this.search) return
      if (!this.value.includes(this.search)) this.$props.context.node.input([...this.value, this.search])
      this.search = ''
    },
    removeTag(v: string) {
      this.$props.context.node.input(this.value.filter(i => i !== v))
    },
    keyPress(e: KeyboardEvent) {
      if (e.code !== 'Enter') return
      e.stopPropagation()
      e.preventDefault()
      this.addTag()
    },
  },
  render() {
    return (
      <div
        data-type='custom'
        class='formkit-input d-flex align-center'
        style={{
          padding: '1.5px 24px 1.5px 8px',
          height: 'auto',
          flexWrap: 'wrap',
          gap: '4px',
          cursor: 'pointer',
          minHeight: '24px',
        }}
        onClick={() => (this.$refs.input as HTMLInputElement)?.focus()}
      >
        {this.value.length ? (
          this.value.map(i => (
            <Chip key={i} option={{ value: i, label: i, selected: true }} onRemove={() => this.removeTag(i)} />
          ))
        ) : (
          <div class='multiselect_chip'>{this.$t(`${tPrefix}.noSelect`)}</div>
        )}
        <input
          value={this.search}
          onInput={e => (this.search = (e.target as HTMLInputElement).value)}
          ref='input'
          placeholder={this.$t(`${tPrefix}.placeholder`)}
          type='number'
          class='select_search number_input_appearance'
          style={{ width: '165px' }}
          onBlur={this.addTag}
          onKeypress={this.keyPress}
        />
        <Button
          title={this.$t('add')}
          icon={{ icon: 'plus', size: 'small' }}
          size='small'
          variant='plain'
          style={{ position: 'absolute', right: 0, opacity: this.search ? 1 : 0 }}
          onClick={compose(this.addTag, preventDefault)}
        />
      </div>
    )
  },
})
