import { setArrItem } from '@helpers/commonHelpers'
import { ActionsStateMutationTypes } from '@/store/modules'
import type { KeysMatching } from '@/types'

import type { RootState } from './types'
import type { Action, Module } from 'vuex'
import { mapValues } from 'lodash'
import { store } from '@/store/store'
import type { State as ActionsState } from '@/store/modules/actionsState/state'

type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export const createAction = () => null

/** Возвращает мутацию, которая заменяет значение в стейте по ключу на переданный payload.
 *  @summary Для быстрого создания мутации, где нужно заменить весь массив на новый.
 *  @key ключ в объекте стейта */
export const createMutation =
  <State extends RootState[keyof RootState], Key extends keyof State, Payload extends State[Key]>(key: Key) =>
  (state: State, payload: Payload) =>
    (state[key] = payload)

/** Возвращает мутацию, которая заменяет/добавляет объект в массиве в стейте по ключу
 *  @summary Для быстрого создания мутации, где нужно изменить/добавить элемент в массиве.
 *  @key ключ в объекте стейта
 *  @replaceBy ключ в объекте по которому будет проходить поиск совпадения */
export const createMutationSetArrItem =
  <
    State extends RootState[keyof RootState],
    Key extends KeysMatching<State, Array<object>>,
    Item extends ArrayElement<State[Key]>
  >(
    key: Key,
    replaceBy: 'id' | keyof Item = 'id'
  ) =>
  (state: State, item: Item) => {
    state[key] = setArrItem(state[key] as unknown as object[], item as object, replaceBy) as unknown as State[Key]
  }

/** Возвращает мутацию, которая удаляет объект из массива в стейте по ключу
 *  @summary Для быстрого создания мутации, где нужно удалить элемент из массиве
 *  @key ключ в объекте стейта
 *  @filterBy ключ в объекте по которому будет проходить фильтр */
export const createMutationDeleteArrItem =
  <
    State extends RootState[keyof RootState],
    Key extends KeysMatching<State, Array<object>>,
    Item extends ArrayElement<State[Key]>,
    Value extends keyof Item
  >(
    key: Key,
    filterBy: 'id' | keyof Item = 'id'
  ) =>
  (state: State, value: Value) => {
    state[key] = (state[key] as unknown as Array<{ [key in typeof filterBy]: unknown }>).filter(
      i => i[filterBy] !== value
    ) as unknown as State[Key]
  }

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Оборачивает экшены модуля в функцию, которая диспатчит состояние в модуль стора actionsState
 *
 *  **NOTE:** При добавлении нового модуля в стор, не забывать в стэйт модуля actionsState добалвять экшены нового модуля
 *
 *  @summary Для отлеживания состояния выполнения экшенов
 *  @module модуль стора */
export const wrapModuleActionsInState = <T extends Module<any, any>>(module: T): T => {
  return {
    ...module,
    actions: mapValues(module.actions, (v: Action<any, any>, k: keyof ActionsState) => {
      return async (...args: any) => {
        store.commit(ActionsStateMutationTypes.ACTION_INITIATE, k)

        try {
          // @ts-ignore
          const actionReturn = await v(...args)
          store.commit(ActionsStateMutationTypes.ACTION_SUCCESS, k)
          return actionReturn
        } catch (error) {
          // @ts-ignore
          store.commit(ActionsStateMutationTypes.ACTION_ERROR, { actionKey: k, error })
        }
      }
    }),
  }
}

export const pullItem = async <T extends { id: string; status?: string }>(
  initial: T,
  callback: (id: string) => Promise<{ data: T }>,
  mutation?: (i: T) => unknown
) => {
  const initialStatus = initial.status

  return new Promise(resolve => {
    let isFetching = false
    const interval = setInterval(async () => {
      if (isFetching) return
      isFetching = true
      const res = await callback(initial.id).catch(() => null)
      isFetching = false
      if (!res) {
        clearInterval(interval)
        return resolve(null)
      }
      if (!initialStatus || res.data.status !== initialStatus) {
        mutation?.(res.data)
        clearInterval(interval)
        resolve(res.data)
      }
    }, 3000)
  })
}
