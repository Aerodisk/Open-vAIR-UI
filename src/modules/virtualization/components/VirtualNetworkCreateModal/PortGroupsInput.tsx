import { defineComponent, type PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'

import { booleanTranslate, preventDefault } from '@helpers'
import { Button } from '@/components/Button'
import { DataTable, type DataTableHeaders } from '@/components/DataTable'

import { PortGroupCreateModalForm } from '../PortGroupCreateModal'
import type { FormDataType as PortgroupInputValue } from '../PortGroupCreateModal/types'

const tPrefix = 'virtualization.virtualNetworks.actions.create.fields.portGroups'

export const PortGroupsInput = defineComponent({
  name: 'PortGroupsInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  computed: {
    value(): PortgroupInputValue[] {
      return this.$props.context.value || []
    },
    error() {
      const { errors, valid, validationVisible } = this.$props.context.state
      return errors || (!valid && validationVisible)
    },
  },
  methods: {
    addPortgroup(v: PortgroupInputValue) {
      this.$props.context.node.input([...this.value, v])
    },
    removePortgroup(e: MouseEvent, name: string) {
      e.preventDefault()
      this.$props.context.node.input(this.value.filter(i => i.port_group_name !== name))
    },
  },
  render() {
    const headers: DataTableHeaders = [
      { key: 'port_group_name', title: this.$t(`${tPrefix}.name`) },
      { key: 'is_trunk', title: this.$t(`${tPrefix}.isTrunk`), valueRender: booleanTranslate },
      { key: 'tags', title: this.$t(`${tPrefix}.tags`), valueRender: v => v?.join(', ') },
      {
        key: '_remove',
        title: '',
        width: '50',
        sortable: false,
        valueRender: (_, i) => (
          <Button
            icon={{ icon: 'delete', size: 'small' }}
            size='small'
            variant='plain'
            onClick={e => this.removePortgroup(e, i.port_group_name)}
          />
        ),
      },
    ]

    return (
      <div class='mt-4'>
        <div class='d-flex align-center justify-space-between'>
          <div class='fields_block_title'>{this.$t(`${tPrefix}.label`)}</div>
          <Button
            title={this.$t('add')}
            icon={{ icon: 'plus', size: 'small' }}
            size='small'
            color={this.error ? 'error' : undefined}
            variant='secondary'
            onClick={preventDefault}
          >
            <PortGroupCreateModalForm onSubmit={this.addPortgroup} ignore />
          </Button>
        </div>
        <DataTable class='mt-2' headers={headers} items={this.value} short />
      </div>
    )
  },
})
