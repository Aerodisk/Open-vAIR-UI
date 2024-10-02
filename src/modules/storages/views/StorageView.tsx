import { defineComponent } from 'vue'
import { find } from 'lodash'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StorageCard } from '../components/StorageCard'

export const StorageView = defineComponent({
  name: 'StorageView',
  computed: {
    storageId() {
      return `${this.$route.params.id}`
    },
    storage() {
      return find(this.$store.state.storage.storages, { id: this.storageId })
    },
  },
  render() {
    const name = this.storage?.name ? `${this.storage?.storage_type} | ${this.storage?.name}` : ''
    return (
      <Breadcrumbs custom={{ id: name || this.$t('noData') }}>
        <StorageCard storage={this.storage} />
      </Breadcrumbs>
    )
  },
})
