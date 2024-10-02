import { createLogger, createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import {
  actionsStateStore as actionsState,
  appStore,
  dashboardStore,
  devicesStore,
  virtualizationStore,
  storageStore,
  monitoringStore,
  blockDevicesStore,
} from './modules'
import '@api/axios/interceptor'

import type { Store } from './types'
import { wrapModuleActionsInState } from './utils'

const debug = import.meta.env.DEV
const plugins = debug ? [createLogger({})] : []
// Plug in session storages based persistence
// plugins.push(createPersistedState({ storages: window.sessionStorage }));

export const store: Store = createStore({
  plugins,
  modules: {
    app: wrapModuleActionsInState(appStore),
    dashboard: wrapModuleActionsInState(dashboardStore),
    devices: wrapModuleActionsInState(devicesStore),
    virtualization: wrapModuleActionsInState(virtualizationStore),
    storage: wrapModuleActionsInState(storageStore),
    monitoring: wrapModuleActionsInState(monitoringStore),
    blockDevices: wrapModuleActionsInState(blockDevicesStore),
    actionsState,
  },
})

if (debug) (window as unknown as { store: Store }).store = store

export const useStore = (): Store => store
