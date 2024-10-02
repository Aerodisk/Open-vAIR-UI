import type { WatchOptions } from 'vue'
import type {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
  SubscribeActionOptions,
  SubscribeOptions,
} from 'vuex'
import type {
  AppActions,
  AppMutations,
  AppState,
  AppGetters,
  DashboardActions,
  DashboardMutations,
  DashboardState,
  ActionsStateState,
  ActionsStateMutations,
  DevicesMutations,
  DevicesActions,
  DevicesState,
  VirtualizationActions,
  VirtualizationMutations,
  VirtualizationState,
  StorageMutations,
  StorageActions,
  StorageState,
  MonitoringMutations,
  MonitoringActions,
  MonitoringState,
  BlockDevicesMutations,
  BlockDevicesState,
  BlockDevicesActions,
} from './modules'

export type AugmentedActionContext<State> = {
  commit<K extends keyof RootMutations>(key: K, payload: Parameters<RootMutations[K]>[1]): ReturnType<RootMutations[K]>
  dispatch<K extends keyof RootActions>(key: K, payload: Parameters<RootActions[K]>[1]): ReturnType<RootActions[K]>
} & Omit<ActionContext<State, RootState>, 'commit' | 'dispatch'>

export type ActionPayload<Action extends keyof RootActions> = Parameters<RootActions[Action]>[1]
export type MutationPayload<Mutation extends keyof RootMutations> = Parameters<RootMutations[Mutation]>[1]

export type RootActions = AppActions &
  DashboardActions &
  DevicesActions &
  VirtualizationActions &
  StorageActions &
  MonitoringActions &
  BlockDevicesActions

export type RootMutations = AppMutations &
  DashboardMutations &
  ActionsStateMutations &
  DevicesMutations &
  VirtualizationMutations &
  StorageMutations &
  MonitoringMutations &
  BlockDevicesMutations

export type RootGetters = AppGetters

export type RootState = {
  app: AppState
  dashboard: DashboardState
  actionsState: ActionsStateState
  devices: DevicesState
  virtualization: VirtualizationState
  storage: StorageState
  monitoring: MonitoringState
  blockDevices: BlockDevicesState
}

export type Store = {
  watch<T>(
    getter: (state: RootState, getters: Store['getters']) => T,
    cb: (value: T, oldValue: T) => void,
    options?: WatchOptions
  ): () => void
  dispatch<Action extends keyof RootActions>(
    action: Action,
    payload: ActionPayload<Action>,
    options?: DispatchOptions
  ): ReturnType<RootActions[Action]>
  subscribeAction<Action extends keyof RootActions>(
    fn: SubscribeActionOptions<{ type: Action; payload: ActionPayload<Action> }, RootState>,
    options?: SubscribeOptions
  ): () => void
  commit<Mutation extends keyof RootMutations>(
    mutation: Mutation,
    payload: MutationPayload<Mutation>,
    options?: CommitOptions
  ): ReturnType<RootMutations[Mutation]>
  subscribe<Mutation extends keyof RootMutations>(
    fn: (mutation: { type: Mutation; payload: MutationPayload<Mutation> }, state: RootState) => never | void,
    options?: SubscribeOptions
  ): () => void
  getters: { [Key in keyof RootGetters]: ReturnType<RootGetters[Key]> }
  state: RootState
} & Omit<VuexStore<RootState>, 'watch' | 'dispatch' | 'commit' | 'getters' | 'state' | 'subscribe' | 'subscribeAction'>
