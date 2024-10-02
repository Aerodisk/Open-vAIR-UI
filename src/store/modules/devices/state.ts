import type { LocalDisk, OpenvairModulesNetworkEntrypointsSchemasInterface } from '@api/generated'

export type Interface = OpenvairModulesNetworkEntrypointsSchemasInterface

export type Bridge = {
  address: string
  broadcast: string
  flags: string[]
  group: string
  ifindex: number
  ifname: string
  link_type: string
  linkmode: string
  mtu: number
  operstate: string
  qdisc: string
  txqlen: number
}

export type State = {
  interfaces: Interface[]
  bridges: Bridge[]
  disks: LocalDisk[]
}

export const state: State = {
  interfaces: [],
  bridges: [],
  disks: [],
}
