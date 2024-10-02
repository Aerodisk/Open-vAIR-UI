import { defineComponent, ref, UnwrapRef, type VNodeRef, watch } from 'vue'
import { VList, VListItem, VListItemSubtitle, VListItemTitle, VMenu } from 'vuetify/components'
import { debounce, take } from 'lodash'

import { Icon } from '@/components/Icon'

import { searchFc } from './utils'
import { searchArray, type SearchAction, type SearchItem } from './searchConfig'

const MAX_VISIBLE_OPTIONS = 15

export const HeaderSearch = defineComponent({
  name: 'HeaderSearch',
  setup() {
    const search = ref('')
    const options = ref<SearchItem[]>([])

    const compSearchOptions = debounce(
      (v: string) =>
        (options.value = v
          ? (take(searchFc(searchArray.value, v), MAX_VISIBLE_OPTIONS) as UnwrapRef<SearchItem[]>)
          : []),
      200
    )

    watch(search, compSearchOptions)

    return { search, options }
  },
  data() {
    return { visible: false, focus: false }
  },
  methods: {
    actionHandler(action: SearchAction) {
      this.search = ''
      switch (action.type) {
        case 'redirect':
          return this.$router.push({ path: action.path, query: action.query })
        case 'modal':
          return action.modal.openModal()
        case 'dispatchEvent':
          return this.$store.dispatch(action.event, undefined)
        case 'function':
          return action.fc()
      }
    },
  },
  watch: {
    focus(v) {
      if (v && this.search && this.options.length) this.visible = true
    },
    search(v) {
      this.visible = Boolean(v && this.options.length)
    },
    options(v) {
      this.visible = Boolean(v.length && this.search)
    },
  },
  render() {
    return (
      <div class='header_search'>
        <VMenu modelValue={this.visible} onUpdate:modelValue={v => (this.visible = v)} class='header_search_menu'>
          {{
            default: () => (
              <VList density='compact'>
                {this.options.map(i => (
                  <VListItem key={i.label + i.description} onClick={() => this.actionHandler(i.action)}>
                    <VListItemTitle>{i.label}</VListItemTitle>
                    {i.description && <VListItemSubtitle>{i.description}</VListItemSubtitle>}
                  </VListItem>
                ))}
              </VList>
            ),
            activator: ({ props }: { props: { ref: VNodeRef } }) => (
              <div class='d-flex align-center w-100' ref={props.ref}>
                <label for='header_search'>
                  <Icon icon='magnify' size='large' class='mr-1' />
                </label>
                <input
                  id='header_search'
                  placeholder={this.$t('header.search.placeholder')}
                  value={this.search}
                  onInput={v => (this.search = (v.target as HTMLInputElement).value)}
                  onFocus={() => (this.focus = true)}
                  onBlur={() => (this.focus = false)}
                />
              </div>
            ),
          }}
        </VMenu>
        {searchArray.value
          .filter(i => i.action.type === 'modal')
          .map(i => i.action.type === 'modal' && i.action.modal.component)}
      </div>
    )
  },
})
