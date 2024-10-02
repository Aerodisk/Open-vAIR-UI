import type { VirtualMachineInfo } from '@api/generated'
import { sizeToBytes } from '@helpers'
import { t } from '@/locales'
import { TabsPropType } from '@/components/Form'

import type { FormDataType } from './types'
import { AddDisksInput, AddImageInput, AddNetworkInput } from './components'
import { osTypes, osVariants } from './constants'
import { extractInitials } from './utils'

const tPrefix = 'virtualization.vm.form.tabs'

export const tabs = (): TabsPropType => [
  {
    title: t(`${tPrefix}.settings.title`),
    fields: [
      {
        title: t(`${tPrefix}.settings.sections.mainSettings`),
        direction: 'row',
        fields: [
          {
            type: 'text',
            name: 'name',
            label: t(`${tPrefix}.settings.fields.name.label`),
            placeholder: t(`${tPrefix}.settings.fields.name.placeholder`),
            validation: 'required|length:2,45|name',
            // // disabled: vm?.state.state === 1,
          },
        ],
      },
      {
        type: 'textarea',
        minRows: 2,
        maxRows: 10,
        name: 'description',
        label: t(`${tPrefix}.settings.fields.description.label`),
        placeholder: t(`${tPrefix}.settings.fields.description.placeholder`),
        validation: 'length:0,256',
        // // disabled: vm?.state.state === 1,
      },
      {
        title: t(`${tPrefix}.settings.sections.bootComponents`),
        direction: 'row',
        fields: [
          {
            type: 'select',
            name: 'os_type',
            label: t(`${tPrefix}.settings.fields.osType.label`),
            placeholder: t(`${tPrefix}.settings.fields.osType.placeholder`),
            options: osTypes.map(i => ({ label: i.name, value: i.name })) || [],
            validation: 'required',
            // // disabled: vm?.state.state === 1,
          },
          {
            type: 'select',
            name: 'os_variant',
            label: t(`${tPrefix}.settings.fields.osVariant.label`),
            placeholder: t(`${tPrefix}.settings.fields.osVariant.placeholder`),
            options: v => osVariants.filter(i => i.type === v.os_type).map(i => ({ label: i.desc, value: i.name })),
            validation: 'required',
            // // disabled: vm?.state.state === 1,
          },
          {
            type: 'select',
            name: 'boot_device',
            label: t(`${tPrefix}.settings.fields.bootDevice.label`),
            placeholder: 'Выберите загрузочное устройство',
            options: [
              { label: 'HD', value: 'hd' },
              { label: 'CDROM', value: 'cdrom' },
            ],
            validation: 'required',
            // // disabled: vm?.state.state === 1,
          },
        ],
      },
      {
        direction: 'row',
        style: { marginTop: '8px' },
        fields: [
          {
            type: 'select',
            name: 'bios',
            label: 'BIOS',
            options: ['LEGACY', 'UEFI'].map(i => ({ value: i, label: i })),
            validation: 'required',
            placeholder: 'Выберите BIOS',
            // // disabled: vm?.state.state === 1,
            style: { width: '31.5%' },
          },
          {
            type: 'select',
            name: 'graphic_driver',
            label: t(`${tPrefix}.settings.fields.graphicsDriver.label`),
            placeholder: t(`${tPrefix}.settings.fields.graphicsDriver.placeholder`),
            options: ['vga', 'virtio'].map(i => ({ value: i, label: i })),
            validation: 'required',
            // // disabled: vm?.state.state === 1,
            style: { width: '31.5%' },
          },
          {
            type: 'select',
            name: 'graphic_interface',
            label: t(`${tPrefix}.settings.fields.graphics.label`),
            placeholder: 'Выберите протокол доступа',
            options: [
              { label: 'VNC', value: 'vnc' },
              // { label: 'Spice', value: 'spice' },
            ],
            style: { width: '31.5%' },
            validation: 'required',

            // // disabled: vm?.state.state === 1,
          },
        ],
      },
    ],
  },
  {
    title: t(`${tPrefix}.cpuRamSettings.title`),
    fields: [
      {
        title: t(`${tPrefix}.cpuRamSettings.sections.cpu`),
        direction: 'row',
        fields: [
          {
            type: 'select',
            name: 'cpu_type',
            label: 'Топология',
            placeholder: 'Выберите топологию',
            options: [
              { value: 'static', label: 'Статическая' },
              { value: 'dynamic', label: 'Динамическая' },
            ],
            style: { width: '31.5%' },
            validation: 'required',
          },
          {
            type: 'number',
            name: 'cpu_vcpu',
            label: t(`${tPrefix}.cpuRamSettings.fields.virtualCores.label`),
            placeholder: t(`${tPrefix}.cpuRamSettings.fields.virtualCores.placeholder`),
            validation: 'required|min:1',
            showIf: v => v.cpu_type === 'dynamic',
            // disabled: vm?.state.state === 1,
            style: { width: '31.5%' },
          },
        ],
      },
      {
        direction: 'row',
        style: { marginTop: '15px' },
        fields: [
          {
            type: 'number',
            name: 'cpu_sockets',
            label: t(`${tPrefix}.cpuRamSettings.fields.cpuSockets.label`),
            placeholder: t(`${tPrefix}.cpuRamSettings.fields.cpuSockets.placeholder`),
            validation: 'required|min:1',
            showIf: v => v.cpu_type === 'static',
          },
          {
            type: 'number',
            name: 'cpu_cores',
            label: t(`${tPrefix}.cpuRamSettings.fields.cpuCores.label`),
            placeholder: t(`${tPrefix}.cpuRamSettings.fields.cpuCores.placeholder`),
            validation: 'required|min:1',
            showIf: v => v.cpu_type === 'static',
          },
          {
            type: 'number',
            name: 'cpu_threads',
            label: t(`${tPrefix}.cpuRamSettings.fields.threads.label`),
            placeholder: t(`${tPrefix}.cpuRamSettings.fields.threads.placeholder`),
            validation: 'required|min:1',
            showIf: v => v.cpu_type === 'static',
          },
        ],
      },
      {
        type: 'select',
        name: 'cpu_model',
        label: t(`${tPrefix}.cpuRamSettings.fields.cpuModel.label`),
        placeholder: t(`${tPrefix}.cpuRamSettings.fields.cpuModel.placeholder`),
        // options: models.map(i => ({ label: i, value: i })),
        options: [{ value: 'host', label: 'host' }],
        validation: 'required',
        style: { width: '31.5%' },
        // disabled: vm?.state.state === 1,
      },
      {
        title: t(`${tPrefix}.cpuRamSettings.sections.ram`),
        direction: 'row',
        fields: [
          {
            type: 'size',
            name: 'ram_size',
            allowed: ['M', 'G'],
            style: { width: '66%' },
            // disabled: vm?.state.state === 1,
            validation: 'required|min:1',
          },
        ],
      },
    ],
  },
  {
    title: t(`${tPrefix}.disks.title`),
    fields: [
      {
        type: 'custom',
        name: 'disks',
        validation: 'required',
        render: p => <AddDisksInput {...p} />,
        validationMessages: { required: t(`${tPrefix}.disks.validationMessage`) },
        // disabled: vm?.state.state === 1,
      },
    ],
  },
  {
    title: t(`${tPrefix}.images.title`),
    fields: [
      {
        type: 'custom',
        name: 'images',
        render: p => <AddImageInput {...p} />,
        // disabled: vm?.state.state === 1,
      },
    ],
  },
  {
    title: t(`${tPrefix}.networks.title`),
    fields: [
      {
        type: 'custom',
        name: 'virtual_interfaces',
        validation: 'required',
        render: p => <AddNetworkInput {...p} />,
        validationMessages: { required: t(`${tPrefix}.networks.validationMessage`) },
      },
    ],
  },
]

const defaults: Partial<FormDataType> = {
  description: '',
  os_type: 'Linux',
  os_variant: 'altlinux',
  boot_device: 'hd',
  bios: 'LEGACY',
  graphic_interface: 'vnc',
  graphic_driver: 'vga',
  cpu_type: 'static',
  cpu_model: 'host',
  cpu_sockets: 1,
  cpu_cores: 1,
  cpu_threads: 1,
  cpu_vcpu: 1,
  ram_size: sizeToBytes(1, 'G'),
  images: [],
}

export const initials = (vm?: VirtualMachineInfo): Partial<FormDataType> => (vm ? extractInitials(vm) : defaults)
