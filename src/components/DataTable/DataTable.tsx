import { defineComponent, isRef, type PropType, ref } from 'vue'
import { type LocationQueryValue, RouterLink, useRoute } from 'vue-router'
import { VBtn, VDataTable, VSpacer, VToolbar } from 'vuetify/components'
import { compose } from 'lodash/fp'
import { chain, cloneDeep, find, get, isArray, isFunction, isNil, map, merge, omitBy } from 'lodash'
import type { AxiosError } from 'axios'

import { Button } from '@/components/Button'
import { LeftArrowIcon, LeftEndArrowIcon, RightArrowIcon, RightEndArrowIcon } from '@icons/table'
import {
  getLocalStorage,
  isNotNullable,
  nearestNumber,
  preventDefault,
  setLocalStorage,
  stopPropagation,
} from '@helpers'

import type { DataTableHeader, DataTableItem, DataTableItemSlotProps, DataTableProps } from './types'
import { DataTableSelectHeaderSlotProps } from './types'
import {
  ColumnsMenu,
  Error,
  Header,
  ItemActions,
  ItemsActions,
  NoData,
  RefreshButton,
  RowsPerPageMenu,
  Search,
  SelectCheckboxHeader,
  SelectCheckboxItem,
  TopItemsActions,
} from './components'
import { customFilter } from './utils'

const rowsPerPageOptions = [10, 25, 50, 100]
const defaultItemsPerPage = 25

const getInitialPage = (withQuery: boolean, query?: LocationQueryValue | LocationQueryValue[]) =>
  withQuery ? (Number(query) < 0 ? 1 : Number(query) || 1) : 1
const getInitialItemsPerPage = (withQuery: boolean, query?: LocationQueryValue | LocationQueryValue[]) =>
  withQuery ? nearestNumber(rowsPerPageOptions, Number(query) || defaultItemsPerPage) : defaultItemsPerPage
const getInitialSelected = (
  withQuery: boolean,
  selected?: string[],
  query?: LocationQueryValue | LocationQueryValue[]
) =>
  selected
    ? selected
    : withQuery
    ? typeof query === 'string'
      ? [query]
      : isArray(query)
      ? map(query, i => `${i}`)
      : []
    : []
const getInitialSearch = (withQuery: boolean, query?: LocationQueryValue | LocationQueryValue[]) =>
  withQuery ? (query || '').toString() : ''

export const DataTable = defineComponent({
  name: 'DataTable',
  props: {
    items: Array as PropType<DataTableProps['items']>,
    headers: {
      type: Array as PropType<DataTableProps['headers']>,
      required: true,
    },
    itemValue: String as PropType<DataTableProps['itemValue']>,
    itemTitle: String as PropType<DataTableProps['itemTitle']>,
    clickable: Boolean as PropType<DataTableProps['clickable']>,
    short: Boolean as PropType<DataTableProps['short']>,
    title: String as PropType<DataTableProps['title']>,
    initialSortBy: Object as PropType<DataTableProps['initialSortBy']>,
    disableItemPerPageSelect: Boolean as PropType<DataTableProps['disableItemPerPageSelect']>,
    tableActions: Array as PropType<DataTableProps['tableActions']>,
    selected: {
      type: Array as PropType<DataTableProps['selected']>,
      required: false,
    },
    multiple: {
      type: Boolean as PropType<DataTableProps['multiple']>,
      default: true,
    },
    onRefresh: Function,
    withQuery: Boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: { type: Object as PropType<AxiosError<unknown, any> | Error | null>, default: null },
    itemActions: { type: Function as PropType<DataTableProps['itemActions']> },
  },
  emits: ['click:row', 'update:selected'],
  setup(props) {
    const route = useRoute()
    const localId = `${route.path}*${props.headers.map(i => i.key).join('&')}`
    // const ctrlPressed = ref(false)
    const lHeaders = ref(cloneDeep(props.headers))
    const columnsSettings = getLocalStorage('tableColumns')?.[localId]
    if (columnsSettings) lHeaders.value.forEach(i => (i.visible = columnsSettings[i.key]?.visible))

    // if (props.itemActions) {
    //   useKeyboard(() => (ctrlPressed.value = true), { code: 'ControlLeft', eventType: 'keydown' })
    //   useKeyboard(() => (ctrlPressed.value = false), { code: 'ControlLeft', eventType: 'keyup' })
    // }
    // return { localId, lHeaders, ctrlPressed }
    return { localId, lHeaders }
  },
  data() {
    return {
      rowsPerPageOptions,
      itemsPerPage:
        this.$props.short || this.disableItemPerPageSelect
          ? 0
          : getInitialItemsPerPage(this.withQuery, this.$route.query.itemsPerPage),
      sortBy: this.$props.initialSortBy ? [this.$props.initialSortBy] : [],
      page: getInitialPage(this.withQuery, this.$route.query.page),
      inputPage: getInitialPage(this.withQuery, this.$route.query.page),
      search: getInitialSearch(this.withQuery, this.$route.query.search),
      selectedLoc: getInitialSelected(this.withQuery, this.selected, this.$route.query.selected),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      query: JSON.parse(JSON.stringify(this.$route.query)) || ({} as any),
    }
  },
  computed: {
    clickableComp() {
      return this.clickable || !!this.itemActions || this.selected // || this.ctrlPressed
    },
  },
  watch: {
    query: {
      handler(v) {
        v = omitBy(v, i => isNil(i) || !i)
        if (v.page && v.page === 1) delete v.page
        if (v.itemsPerPage && v.itemsPerPage === defaultItemsPerPage) delete v.itemsPerPage
        this.$router.replace({ query: v })
      },
      deep: true,
    },
    '$route.query'(v, oldV) {
      if (this.withQuery && v.search !== oldV.search) this.search = v.search
    },
    search(v) {
      if (this.withQuery) this.query.search = v
    },
    page(page) {
      this.inputPage = page
      if (this.withQuery) this.query.page = page
    },
    itemsPerPage(itemsPerPage) {
      if (this.withQuery) this.query.itemsPerPage = itemsPerPage
    },
    selectedLoc(selected) {
      this.$emit('update:selected', selected)
      if (this.withQuery) this.query.selected = selected
    },
    selected(v) {
      this.selectedLoc = v
    },
    items(v, oldV) {
      if (this.selected == null && !this.itemActions) return

      const diff = chain(oldV)
        .differenceBy(v, this.itemValue || 'id')
        .map('id')
        .value()

      if (diff.length) this.selectedLoc = this.selectedLoc.filter(i => !diff.includes(i))
    },
  },
  methods: {
    onRowClick(event: Event, { item, internalItem }: { item: unknown; internalItem: DataTableItem<unknown> }) {
      event.preventDefault()
      event.stopPropagation()
      const isSelected = this.selectedLoc?.includes(internalItem.value)

      if ((this.clickable || !this.itemActions) && !this.selected) return this.$emit('click:row', item, event)

      if (this.multiple) {
        if (isSelected) this.selectedLoc = this.selectedLoc.filter(i => i !== internalItem.value)
        else this.selectedLoc = [...this.selectedLoc, internalItem.value]
      } else {
        if (isSelected) this.selectedLoc = []
        else this.selectedLoc = [internalItem.value]
      }
    },
    pageInputHandler(pageCount: number) {
      if (this.inputPage < 1) {
        this.inputPage = 1
        this.page = 1
        return
      } else if (this.inputPage > pageCount) {
        this.inputPage = pageCount
        this.page = pageCount
        return
      }

      this.page = this.inputPage
    },
    toggleHeaderDisplay(key: string) {
      const header = find(this.lHeaders, { key })
      if (!header) return
      if (header.visible == null) header.visible = false
      else header.visible = !header.visible

      const data = getLocalStorage('tableColumns') || {}
      if (!data[this.localId]) data[this.localId] = {}
      data[this.localId][key] = { visible: header.visible }
      setLocalStorage('tableColumns', data)
    },
  },
  render() {
    const {
      items,
      itemValue = 'id',
      itemTitle = 'name',
      title,
      disableItemPerPageSelect,
      short,
      multiple,
      clickable,
      tableActions,
      selected,
      itemActions,
    } = this.$props
    const { search, page, itemsPerPage, sortBy, rowsPerPageOptions, selectedLoc, clickableComp } = this

    const displayedHeaders: DataTableHeader[] = [
      ...this.lHeaders,
      itemActions && {
        title: '',
        key: 'actions',
        width: 28,
        sortable: false,
        valueRender: (v: any) => <ItemActions item={v} actions={itemActions} />,
      },
    ]
      .filter(isNotNullable)
      .filter(i => i.visible !== false)

    const tableProps = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers: displayedHeaders as any,
      items,
      itemValue,
      itemTitle,
      search,
      showSelect: !!(selected || itemActions),
      'onClick:row': this.selected || itemActions || clickable ? this.onRowClick : undefined,
      class: clickableComp ? '_clickable_items' : '',
    }
    const vModelsTable = {
      modelValue: selectedLoc,
      'onUpdate:modelValue': (v: string[]) => (this.selectedLoc = v),
      page,
      'onUpdate:page': (v: number) => (this.page = v),
      itemsPerPage,
      'onUpdate:itemsPerPage': (v: number) => (this.itemsPerPage = v),
      sortBy,
      'onUpdate:sortBy': (v: typeof this.sortBy) => (this.sortBy = v),
    }

    const selectedItems = (items || []).filter(i => selectedLoc.includes(i[itemValue as keyof typeof i]))
    const headersSlots = merge(
      {},
      ...displayedHeaders.map(({ key }) => ({
        [`header.${key}`]: ({ column }: { column: DataTableHeader }) => <Header header={column} sortBy={sortBy} />,
      })),
      { ['header.actions']: () => itemActions && short && <ItemsActions items={selectedItems} actions={itemActions} /> }
    )

    const itemsSlots = merge(
      {},
      ...displayedHeaders.map(({ key, valueRender, noWrap, link }) => ({
        [`item.${key}`]: (p: { item: DataTableItem<{ [key: string]: unknown }> }) => {
          const customRendered = valueRender?.(key === 'actions' ? p.item : get(p.item, key), p.item)
          const value =
            this.$slots[`item.${key}`]?.(p) ||
            (customRendered && isRef(customRendered) ? customRendered.value : customRendered) ||
            get(p.item, key)
          if (link) {
            const linkStr = isFunction(link) ? link(get(p.item, key), p.item) : link
            if (!linkStr) return value
            return (
              <RouterLink
                class='v-data-table__td_link'
                to={linkStr}
                // @ts-ignore onClick allowed for RouterLink
                onClick={compose(stopPropagation, preventDefault)}
                style={noWrap ? { whiteSpace: 'nowrap' } : null}
              >
                {value}
              </RouterLink>
            )
          }
          return noWrap ? <span style={{ whiteSpace: 'nowrap' }}>{value}</span> : value
        },
      }))
    )

    const tableActionsSlot =
      this.$slots['table.actions']?.() || tableActions?.map(i => <Button size='small' variant='secondary' {...i} />)

    return (
      <VDataTable {...tableProps} {...vModelsTable} customFilter={customFilter(this.lHeaders)} filterMode='some'>
        {{
          top: () => (
            <>
              {!!title && <div class='table_title'>{title}</div>}
              {(!short || !!tableActionsSlot) && (
                <VToolbar tag='div'>
                  {!short && (
                    <div class='table_tools'>
                      {this.onRefresh && <RefreshButton onRefresh={this.onRefresh} />}
                      {!disableItemPerPageSelect && (
                        <RowsPerPageMenu
                          rowsPerPageOptions={rowsPerPageOptions}
                          modelValue={itemsPerPage}
                          onUpdate:modelValue={v => (this.itemsPerPage = v)}
                        />
                      )}
                      <ColumnsMenu
                        displayedHeaders={displayedHeaders}
                        headers={this.lHeaders}
                        onToggle={this.toggleHeaderDisplay}
                      />
                      <Search modelValue={search} onUpdate:modelValue={v => (this.search = v)} />
                    </div>
                  )}
                  <VSpacer />
                  <div class='table_actions'>
                    <TopItemsActions items={selectedItems} actions={itemActions} />
                    {tableActionsSlot}
                  </div>
                </VToolbar>
              )}
            </>
          ),
          bottom: ({ page, pageCount, itemsPerPage }: { page: number; pageCount: number; itemsPerPage: number }) => {
            const itemsLength =
              // @ts-ignore
              this.$.subTree.component.ctx._.provides[Symbol.for('vuetify:data-table-pagination')].itemsLength.value

            return (
              <>
                {!short && !disableItemPerPageSelect && (
                  <div class='bottom'>
                    <div class='bottom_left'>
                      {this.$t('dataTable.bottomCounter', {
                        firstIndex: page * itemsPerPage - itemsPerPage + 1,
                        lastIndex: itemsLength <= page * itemsPerPage ? itemsLength : page * itemsPerPage,
                        total: itemsLength,
                      })}
                    </div>
                    <div class='pagination'>
                      <VBtn
                        class='pagination_button'
                        rounded
                        variant='text'
                        // @ts-ignore
                        onClick={() => (this.page = 1)}
                        disabled={page === 1}
                      >
                        <LeftEndArrowIcon />
                      </VBtn>
                      <VBtn
                        class='pagination_button'
                        rounded
                        variant='text'
                        // @ts-ignore
                        onClick={() => (this.page -= 1)}
                        disabled={page - 1 < 1}
                      >
                        <LeftArrowIcon />
                      </VBtn>
                      <div class='pagination_pages'>
                        <input
                          type='number'
                          value={this.inputPage}
                          onInput={(e: Event) => (this.inputPage = Number((e.target as HTMLInputElement).value))}
                          onFocus={(e: FocusEvent) => (e.target as HTMLInputElement).select?.()}
                          onBlur={() => this.pageInputHandler(pageCount)}
                          onKeydown={() => this.pageInputHandler(pageCount)}
                        />
                        <div class='pagination_pages_total'>/ {pageCount}</div>
                      </div>
                      <VBtn
                        class='pagination_button'
                        rounded
                        variant='text'
                        // @ts-ignore
                        onClick={() => (this.page += 1)}
                        disabled={page + 1 > pageCount}
                      >
                        <RightArrowIcon />
                      </VBtn>
                      <VBtn
                        class='pagination_button'
                        rounded
                        variant='text'
                        // @ts-ignore
                        onClick={() => (this.page = pageCount)}
                        disabled={page === pageCount}
                      >
                        <RightEndArrowIcon />
                      </VBtn>
                    </div>
                  </div>
                )}
              </>
            )
          },
          ...headersSlots,
          ...itemsSlots,
          'header.data-table-select': (props: DataTableSelectHeaderSlotProps) => (
            <SelectCheckboxHeader props={props} multiple={multiple} />
          ),
          'item.data-table-select': (props: DataTableItemSlotProps) => <SelectCheckboxItem props={props} />,
          'no-data': () => (this.error ? <Error error={this.error} /> : <NoData />),
        }}
      </VDataTable>
    )
  },
})
