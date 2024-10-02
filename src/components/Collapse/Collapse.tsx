import { defineComponent } from 'vue'

const ANIMATION_DURATION = 280 // ms
export const Collapse = defineComponent({
  name: 'CollapseContainer',
  props: { modelValue: Boolean },
  emits: ['update:modelValue'],
  data() {
    return { collapsed: this.modelValue || (true as boolean), transition: false, height: 0 }
  },
  watch: {
    modelValue(v) {
      this.collapsed = v
    },
    async collapsed(v) {
      this.transition = true
      if (v) {
        const el = this.$refs.el as HTMLDivElement
        this.height = el.clientHeight
        setTimeout(() => (this.height = 0))
      } else {
        const el = this.$refs.el as HTMLDivElement
        this.height = el.scrollHeight + el.clientHeight
      }
      setTimeout(() => (this.transition = false), ANIMATION_DURATION)
    },
  },
  methods: {
    toggle() {
      if (this.modelValue != null) return this.$emit('update:modelValue', this.collapsed)
      this.collapsed = !this.collapsed
    },
  },
  render() {
    return (
      <div
        ref='el'
        style={{
          height: this.transition || this.collapsed ? `${this.height}px` : 'auto',
          transition: `height ${ANIMATION_DURATION}ms`,
          overflow: 'hidden',
        }}
      >
        {this.$slots?.default?.()}
      </div>
    )
  },
})
