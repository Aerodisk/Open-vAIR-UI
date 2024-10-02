import { defineComponent, type PropType } from 'vue'

/** Сколько элементов будет показано без сворачивания под кнопку "Показать всё" */
const ITEMS_VISIBLE = 15

export const ModalItemsList = defineComponent({
  name: 'ModalItemsList',
  props: { items: Array as PropType<string[]> },
  data: () => ({ expand: false }),
  render() {
    if (!this.items?.length) return null

    return (
      <div
        style={{
          fontSize: '12px',
          marginTop: '12px',
          color: '#747a7d',
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyContent: 'space-between',
          gap: '4px 16px',
        }}
      >
        {(this.expand
          ? this.items
          : this.items?.length > ITEMS_VISIBLE
          ? this.items.slice(0, ITEMS_VISIBLE - 2)
          : this.items.slice(0, ITEMS_VISIBLE)
        ).map(i => (
          <div key={i}>{i}</div>
        ))}
        {this.items.length > ITEMS_VISIBLE && !this.expand && <div>...</div>}
        {this.items.length > ITEMS_VISIBLE && (
          <div onClick={() => (this.expand = !this.expand)} style={{ cursor: 'pointer' }}>
            {this.expand ? this.$t('modal.listCollapse') : this.$t('modal.listExpand')}
          </div>
        )}
      </div>
    )
  },
})
