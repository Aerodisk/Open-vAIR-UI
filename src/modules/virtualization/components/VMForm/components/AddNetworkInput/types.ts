import type { VirtualInterfaceModeEnum, VirtualInterfaceModelEnum } from '@api/generated'

export type NetworkConfiguration = {
  mode: VirtualInterfaceModeEnum
  model: VirtualInterfaceModelEnum
  mac: string
}

export type FormDataType = ({ interface: string } | { portgroup: string }) & NetworkConfiguration

export type NetworkInputValue = {
  __id: number
  order: number
  interface: string
  portgroup?: string
} & NetworkConfiguration
