import type {
  CpuModelEnum,
  CpuTypeEnum,
  GraphicInterfaceBaseConnectTypeEnum,
  OsBiosEnum,
  OsBootDeviceEnum,
  OsGraphicDriverEnum,
} from '@api/generated'
import type { DiskInputValue, ImageInputValue, NetworkInputValue } from './components'

export type FormDataType = {
  // COMMON
  name: string
  description: string
  // OS
  os_type: string
  os_variant: string
  boot_device: OsBootDeviceEnum
  bios: OsBiosEnum
  graphic_driver: OsGraphicDriverEnum
  // GRAPHIC_INTERFACE
  graphic_interface: GraphicInterfaceBaseConnectTypeEnum
  // CPU
  cpu_type: CpuTypeEnum
  cpu_vcpu?: number
  cpu_sockets: number
  cpu_cores: number
  cpu_threads: number
  cpu_model: CpuModelEnum
  // RAM
  ram_size: number
  // DISKS
  disks: DiskInputValue[]
  images: ImageInputValue[]
  // NETWORKS
  virtual_interfaces: NetworkInputValue[]
}
