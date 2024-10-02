import type { VirtualMachineInfo, VirtualNetworkResponse } from '@api/generated'

export type State = {
  vm: VirtualMachineInfo[]
  virtualNetworks: VirtualNetworkResponse[]
}

export const state: State = {
  vm: [],
  virtualNetworks: [],
}
