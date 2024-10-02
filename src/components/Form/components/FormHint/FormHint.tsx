import { defineComponent, PropType } from 'vue'

import { Icon } from '@/components/Icon'
import type { FormHintType } from '../../types'

/** Сколько элементов будет показано без сворачивания под кнопку "Показать всё" */
const itemsVisibleCount = 15

export const FormHint = defineComponent({
  name: 'FormHint',
  props: { hint: Object as PropType<FormHintType | null> },
  data() {
    return { listExpand: false }
  },
  render() {
    if (!this.hint) return null

    const { text, variant = 'info' } = this.hint
    const itemsList = this.hint.itemsList
      ? this.listExpand
        ? this.hint.itemsList
        : this.hint?.itemsList?.length > itemsVisibleCount
        ? this.hint.itemsList.slice(0, itemsVisibleCount - 2)
        : this.hint.itemsList.slice(0, itemsVisibleCount)
      : null

    return (
      <div class='formkit_hint' data-variant={variant}>
        <Icon icon='alertCircleOutline' />
        <div>
          {text}
          {!!itemsList?.length && (
            <div class='formkit_hint_itemsList'>
              {itemsList?.map(i => (
                <div key={i}>{i}</div>
              ))}

              {itemsList?.length > itemsVisibleCount && !this.listExpand && <div>...</div>}
              {itemsList?.length > itemsVisibleCount && (
                <div onClick={() => (this.listExpand = !this.listExpand)} style={{ cursor: 'pointer' }}>
                  {this.$t(`formkit.hint.${this.listExpand ? 'listCollapse' : 'listExpand'}`)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
})
