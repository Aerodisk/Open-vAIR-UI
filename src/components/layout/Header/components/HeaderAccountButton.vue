<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <v-btn size="small" variant="text" class="header_account_button" :data-open="open">
    {{ username }}<Icon icon="chevronDown" size="small" />
    <v-menu activator="parent" v-model="open" :close-on-content-click="true">
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>{{ $t('header.accountMenu.logout.title') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppActionTypes } from '@/store'
import { useWithConfirm } from '@/components/Modal'

export default defineComponent({
  name: 'HeaderAccountButton',
  data() {
    return { open: false, openChangePassModal: false }
  },
  computed: {
    username() {
      return this.$store.state.app.user?.username
    },
  },
  methods: {
    logout() {
      useWithConfirm({
        title: this.$t('header.accountMenu.logout.modalTitle'),
        text: this.$t('header.accountMenu.logout.modalText'),
        confirmText: this.$t('header.accountMenu.logout.confirmText'),
        danger: true,
        onConfirm: () => setTimeout(() => this.$store.dispatch(AppActionTypes.LOGOUT, undefined)),
      })()
    },
  },
})
</script>

<style scoped>
.header_account_button {
  color: rgb(var(--v-theme-header-text));
}
.header_account_button svg {
  margin-left: 4px;
  color: rgb(var(--v-theme-header-text));
}
.header_account_button[data-open='true'] svg {
  transform: rotate(180deg);
}
</style>
