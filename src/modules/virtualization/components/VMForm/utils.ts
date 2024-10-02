import { chain, filter, intersectionWith, isEqual, map, mapValues, omit, pick, some } from 'lodash'

import type {
  AttachDisksInner,
  Cpu,
  DetachDisk,
  DetachVirtualInterface,
  EditDisk,
  EditVirtualInterface,
  EditVirtualInterfaces,
  EditVmDisks,
  Os,
  VirtualInterface,
  VirtualMachineInfo,
} from '@api/generated'
import type { ActionPayload } from '@/store'
import { VirtualizationActionTypes } from '@/store/modules'

import type { DiskInputValue, ImageInputValue, NetworkInputValue } from './components'
import type { FormDataType } from './types'

export const extractInitials = (vm: VirtualMachineInfo): Partial<FormDataType> => ({
  ...pick(vm, ['name', 'description']),
  ...vm?.os, // os_type os_variant boot_device bios graphic_driver
  ...chain(vm?.cpu)
    .mapKeys((_, key) => `cpu_${key}`)
    .mapValues(v => (v == null ? 1 : v))
    .value(), // cpu_type cpu_model cpu_sockets cpu_cores cpu_threads
  graphic_interface: vm?.graphic_interface?.connect_type,
  ram_size: vm?.ram.size,
  disks: vm.disks
    .filter(i => i.type === 1)
    .map(i => ({
      __id: i.disk_id,
      id: i.id,
      volume_id: i.disk_id,
      qos: mapValues(i.qos, Number),
      ...pick(i, ['name', 'boot_order', 'order', 'emulation', 'format']),
    })) as unknown as DiskInputValue[],
  images: vm.disks
    .filter(i => i.type === 2)
    .map(i => ({
      __id: i.disk_id,
      image_id: i.disk_id,
      qos: mapValues(i.qos, Number),
      ...pick(i, ['name', 'boot_order', 'order', 'emulation', 'format', 'id']),
    })) as unknown as ImageInputValue[],
  virtual_interfaces: vm.virtual_interfaces.map(i => ({
    __id: i.id,
    ...pick(i, ['interface', 'mac', 'mode', 'model', 'order', 'portgroup']),
  })) as unknown as NetworkInputValue[],
})

export const prepareCreatePayload = (v: FormDataType): ActionPayload<VirtualizationActionTypes.CREATE_VM> => ({
  ...pick(v, ['name', 'description']),
  cpu: chain(v)
    .pick(['cpu_cores', 'cpu_threads', 'cpu_sockets', 'cpu_model', 'cpu_type', 'cpu_vcpu'])
    .mapKeys((_, key) => key.replace('cpu_', ''))
    .thru(cpu => (cpu.type === 'static' ? omit(cpu, ['vcpu']) : omit(cpu, ['cores', 'threads', 'sockets'])))
    .value(),
  ram: { size: v.ram_size },
  os: pick(v, ['os_type', 'os_variant', 'boot_device', 'bios', 'graphic_driver']),
  graphic_interface: { connect_type: v.graphic_interface },
  disks: {
    attach_disks: [...v.disks, ...v.images].map((i, ind) => ({
      ...omit(i, ['__id']),
      order: ind + 1,
      boot_order: ind + 1,
    })) as unknown as AttachDisksInner[],
  },
  virtual_interfaces: map(v.virtual_interfaces, (i, ind) => ({ ...omit(i, ['__id']), order: ind })),
})

const generateNetworkFields = (
  v: FormDataType,
  initials: Partial<FormDataType>,
  vm: VirtualMachineInfo
): EditVirtualInterfaces => {
  const iNetworks = initials.virtual_interfaces || []
  const networks = v.virtual_interfaces.map((i, ind) => ({ ...i, order: ind + 1 }))

  const detach_virtual_interfaces = filter(iNetworks, i => !some(networks, { __id: i.__id })).map(i => ({
    id: vm.virtual_interfaces.find(d => d.id === i.__id)?.id,
  })) as unknown as DetachVirtualInterface[]
  const new_virtual_interfaces = filter(networks, i => !some(iNetworks, { __id: i.__id })).map(i =>
    omit(i, ['__id'])
  ) as unknown as VirtualInterface[]
  const edit_virtual_interfaces = intersectionWith(
    networks,
    iNetworks,
    (i1, i2) => i1.__id === i2.__id && !isEqual(i1, i2)
  ).map(i => ({ ...omit(i, ['__id']), id: i.__id })) as unknown as EditVirtualInterface[]

  return { new_virtual_interfaces, detach_virtual_interfaces, edit_virtual_interfaces }
}

const generateDiskFields = (v: FormDataType, initials: Partial<FormDataType>, vm: VirtualMachineInfo): EditVmDisks => {
  const iDisks = [...(initials?.disks || []), ...(initials?.images || [])]
  const disks = [...v.disks, ...v.images].map((i, ind) => ({ ...i, order: ind + 1, boot_order: ind + 1 }))

  const detach_disks = filter(iDisks, i => !some(disks, { __id: i.__id })).map(i => ({
    id: vm.disks.find(d => d.disk_id === `${i.__id}`)?.id,
  })) as unknown as DetachDisk[]
  const attach_disks = filter(disks, i => !some(iDisks, { __id: i.__id })).map(i =>
    omit(i, ['__id'])
  ) as unknown as AttachDisksInner[]
  const edit_disks = intersectionWith(disks, iDisks, (i1, i2) => i1.__id === i2.__id && !isEqual(i1, i2)).map(i =>
    omit(i, ['__id'])
  ) as unknown as EditDisk[]

  return { detach_disks, attach_disks, edit_disks }
}

export const prepareEditPayload = (
  v: FormDataType,
  initials: Partial<FormDataType>,
  vm: VirtualMachineInfo
): ActionPayload<VirtualizationActionTypes.EDIT_VM> => {
  return {
    id: `${vm.id}`,
    ...pick(v, ['name', 'description']),
    description: v.description || '',
    cpu: chain(v)
      .pick(['cpu_cores', 'cpu_threads', 'cpu_sockets', 'cpu_model', 'cpu_type', 'cpu_vcpu'])
      .mapKeys((_, key) => key.replace('cpu_', ''))
      .thru(cpu => (cpu.type === 'static' ? omit(cpu, ['vcpu']) : omit(cpu, ['cores', 'threads', 'sockets'])))
      .value() as Cpu,
    ram: { size: v.ram_size },
    os: pick(v, ['os_type', 'os_variant', 'boot_device', 'bios', 'graphic_driver']) as Os,
    graphic_interface: { connect_type: v.graphic_interface },
    disks: generateDiskFields(v, initials, vm),
    virtual_interfaces: generateNetworkFields(v, initials, vm),
  }
}
