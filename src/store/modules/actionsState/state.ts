import type { AxiosError } from 'axios'
import { chain, cloneDeep, values } from 'lodash'

import { AppActionTypes } from '../app/actionTypes'
import { DashboardActionTypes } from '../dashboard/actionTypes'
import { DevicesActionTypes } from '../devices/actionTypes'
import { VirtualizationActionTypes } from '../virtualization/actionTypes'
import { StorageActionTypes } from '../storage/actionTypes'
import { MonitoringActionTypes } from '../monitoring/actionTypes'
import { BlockDevicesActionTypes } from '@/store/modules/blockDevices/actionTypes'

type AllActionTypes =
  | AppActionTypes
  | DashboardActionTypes
  | DevicesActionTypes
  | VirtualizationActionTypes
  | StorageActionTypes
  | MonitoringActionTypes
  | BlockDevicesActionTypes

const unionActionTypes = [
  AppActionTypes,
  DashboardActionTypes,
  DevicesActionTypes,
  VirtualizationActionTypes,
  StorageActionTypes,
  MonitoringActionTypes,
  BlockDevicesActionTypes,
]

/**
 * isUninitialized - значение true указывает на то, что экшен ещё не был задиспатчен ни разу
 * isError - значение true указывает на то, что последний вызов экшена завершлися с ошибкой
 * isSuccess - значение true указывает на то, что последний вызов экшена завершился успешно
 * isInitializing - Значение true указывает, что экшен в данный момент выполняется первый раз.
 *             Это будет верно для первого диспатча, но не для последующих диспатчей.
 * isDispatching - Значение true указывает, экшен в данный момент выполняется.
 *              Это будет верно как для первого диспатча, так и для последующих.
 * error - ошибка, если последний диспатч закончился ошибкой
 * timestamp - timestamp последнего диспатча экшена, завершившегося успешно
 * */
export type ActionStateType = {
  isUninitialized: boolean
  isError: boolean
  isSuccess: boolean
  isInitializing: boolean
  isDispatching: boolean
  error: AxiosError | Error | null
  timestamp: number | null
}

export const defaultActionState: ActionStateType = {
  isUninitialized: true,
  isError: false,
  isSuccess: false,
  isInitializing: false,
  isDispatching: false,
  error: null,
  timestamp: null,
}

export type State = {
  [key in AllActionTypes]: ActionStateType
}

export const state: State = chain(unionActionTypes)
  .flatMap(values)
  .map(key => [key, cloneDeep(defaultActionState)])
  .fromPairs()
  .value() as State
