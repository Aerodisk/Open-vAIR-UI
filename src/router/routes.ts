export const routes = {
  root: '/',
  notFound: '/not-found',
  settings: {
    root: '/settings',
  },
  devices: {
    root: '/devices',
    interfaces: { root: '/devices/interfaces' },
    disks: { root: '/devices/disks', item: { root: '/devices/disks/:path' } },
  },
  virtualization: {
    root: '/virtualization',
    virtualMachines: {
      root: '/virtualization/virtual-machines',
      create: '/virtualization/virtual-machines/create',
      item: {
        root: '/virtualization/virtual-machines/:id',
        edit: '/virtualization/virtual-machines/:id/edit',
      },
    },
    virtualNetworks: {
      root: '/virtualization/virtual-networks',
      item: {
        root: '/virtualization/virtual-networks/:id',
      },
    },
  },
  storage: {
    root: '/storage',
    storages: {
      root: '/storage/storages',
      item: '/storage/storages/:id',
    },
    volumes: { root: '/storage/volumes' },
    images: { root: '/storage/images' },
  },
  blockDevices: {
    root: '/block-devices',
  },
  journal: { root: '/journal' },
} as const
