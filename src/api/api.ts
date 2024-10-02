import { axiosInstance, BASE_URL } from './axios'
import {
  DashboardApi,
  InterfaceApi,
  StorageApi,
  DefaultApi,
  AuthApi,
  NotificationApi,
  EventApi,
  UserApi,
  ImageApi,
  VolumeApi,
  VirtualMachineApi,
  BlockDevicesApi,
  VirtualNetworkApi,
} from './generated'

/** Жесткий бинд контекста(this) экземпляра класса на самого себя */
function selfish<T extends object>(target: T): T {
  const cache = new WeakMap()
  const handler = {
    get(target: T, key: string) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') return value
      if (!cache.has(value)) cache.set(value, value.bind(target))
      return cache.get(value)
    },
  }
  return new Proxy(target, handler)
}

const api = {
  interface: selfish(new InterfaceApi(undefined, BASE_URL, axiosInstance)),
  dashboard: selfish(new DashboardApi(undefined, BASE_URL, axiosInstance)),
  storage: selfish(new StorageApi(undefined, BASE_URL, axiosInstance)),
  default: selfish(new DefaultApi(undefined, BASE_URL, axiosInstance)),
  auth: selfish(new AuthApi(undefined, BASE_URL, axiosInstance)),
  notification: selfish(new NotificationApi(undefined, BASE_URL, axiosInstance)),
  event: selfish(new EventApi(undefined, BASE_URL, axiosInstance)),
  user: selfish(new UserApi(undefined, BASE_URL, axiosInstance)),
  image: selfish(new ImageApi(undefined, BASE_URL, axiosInstance)),
  volume: selfish(new VolumeApi(undefined, BASE_URL, axiosInstance)),
  vm: selfish(new VirtualMachineApi(undefined, BASE_URL, axiosInstance)),
  blockDevices: selfish(new BlockDevicesApi(undefined, BASE_URL, axiosInstance)),
  virtualNetwork: selfish(new VirtualNetworkApi(undefined, BASE_URL, axiosInstance)),
}

export default api
