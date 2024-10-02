import type { FormKitValidationI18NArgs } from './ru'

export const en = {
  // COMMON
  close: 'Close',
  open: 'Open',
  create: 'Create',
  save: 'Save',
  refresh: 'Refresh',
  delete: 'Delete',
  restart: 'Restart',
  cancel: 'Cancel',
  run: 'Run',
  yes: 'Yes',
  no: 'No',
  path: 'Path',
  status: 'Status',
  speed: 'Speed',
  state: 'State',
  name: 'Name',
  description: 'Description',
  type: 'Type',
  connection: 'Connection',
  connections: 'Connections',
  mounted: 'Mounted',
  options: 'Options',
  accessRights: 'Access rights',
  generalInformation: 'General information',
  node: 'Node',
  nodes: 'Nodes',
  format: 'Format',
  readOnly: 'Read only',
  createTime: 'Create time',
  startTime: 'Start time',
  endTime: 'End time',
  updateTime: 'Update time',
  date: 'Date',
  startDate: 'Start date',
  endDate: 'End date',
  time: 'Time',
  cluster: 'Cluster',
  search: 'Search',
  ram: 'RAM',
  cpu: 'CPU',
  interface: 'Interface',
  port: 'Port',
  ipAddress: 'IP-address',
  ipAddresses: 'IP-addresses',
  host: 'Host',
  user: 'User',
  code: 'Code',
  progress: 'Progress',
  message: 'Message',
  uptime: 'Uptime',
  confirmAction: 'Confirm action',
  alias: 'Alias',
  add: 'Add',
  day: '0 days | {n} day | {n} days',
  hour: '0 hours | {n} hour | {n} hours',
  noData: 'No data',

  // MODAL
  modal: {
    confirmAction: 'Confirm action',
    listExpand: 'Show all',
    listCollapse: 'Hide all',
    licenseTrial: {
      header: {
        text: `This software version is a trial version 
        Not intended for commercial use`,
      },
      expiresSoon: {
        title: 'Trial license will expire soon',
        text: `The trial license expires in {unit}
        Contact Aerodisk sales department`,
      },
      dontShowAgain: "Don't show again",
      closeText: 'Ok',
    },
    license: {
      expired: {
        title: 'Technical support expired',
        text: `Technical support has expired
        Contact Aerodisk sales department`,
      },
      expiresSoon: {
        title: 'Technical support expires soon',
        text: `Your technical support will expire in {unit}
        Contact Aerodisk sales department`,
      },
      dontShowAgain: "Don't show again",
      closeText: 'Ok',
    },
  },

  // FORM
  form: {
    next: 'Next',
    back: 'Back',
    sizeInput: {
      unit: { label: 'Unit', placeholder: 'Select unit' },
      size: { label: 'Size', placeholder: 'Enter size' },
    },
    fileInput: {
      errors: {
        'file-invalid-type': 'Invalid file type',
        uploadError: 'An error occurred while uploading the file. Try again',
      },
    },
  },

  // SIZES
  sizes: {
    full: {
      si: {
        B: 'Byte',
        K: 'Kilobyte',
        M: 'Megabyte',
        G: 'Gigabyte',
        T: 'Terabyte',
      },
      iec: {
        B: 'Byte',
        K: 'Kibibyte',
        M: 'Mebibyte',
        G: 'Gibibyte',
        T: 'Tebibyte',
      },
    },
    short: {
      si: {
        B: 'B',
        K: 'KB',
        M: 'MB',
        G: 'GB',
        T: 'TB',
      },
      iec: {
        B: 'B',
        K: 'KiB',
        M: 'MiB',
        G: 'GiB',
        T: 'TiB',
      },
    },
    size: 'size',
    volume: 'volume',
    used: 'used',
    available: 'available',
    availPercentage: 'used (%)',
  },

  // LAYOUT
  sidebar: {
    dashboard: 'Dashboard',
    devices: 'Devices',
    networkAdapters: 'Network Adapters',
    physicalDisks: 'Physical Disks',
    virtualization: 'Virtualization',
    virtualMachines: 'VM (Virtual machines)',
    virtualNetworks: 'Virtual networks',
    storage: 'Data storage',
    storages: 'Storages',
    disks: 'Virtual disks',
    images: 'Virtual images',
    blockDevices: 'Block devices',
    journal: 'Journal',
  },
  dataTable: {
    rowsPerPage: 'Show rows: {n}',
    bottomCounter: 'Entries {firstIndex} to {lastIndex} of {total} entries',
    noData: 'No data to display',
    columns: 'Columns',
    cells: { linksList: { collapse: 'Collapse' } },
  },
  formkit: {
    validation: {
      ip: 'Incorrect IP.',
      mac: 'Incorrect MAC.',
      uniq: 'Value must be uniq.',
      multipleOf: ({ args }: FormKitValidationI18NArgs) =>
        `Count of selected elements must be a multiple of ${args[0]}.`,
      name: 'Only latin letters, numbers, spaces and underscores (_) are allowed.',
      nameUpper: 'Only capital latin letters, numbers, spaces and underscores (_) are allowed.',
      login: 'Only Latin letters, numbers, underscore (_) and hyphen (-) are allowed.',
    },
    ui: {},
    inputs: {
      date: { select: 'Select' },
      select: { noElements: 'No elements', empty: 'Empty', optionSearch: 'Search options' },
      file: {
        selectFile: 'Select file',
        dropzone: 'Or put it in this container',
        notSelected: 'File not selected',
      },
      size: {
        validation: {
          required: '{name} is required.',
          min: '{name} must be at least {count}.',
          moreThan: '{name} cannot be greater than {name2}',
        },
      },
    },
    hint: { listExpand: 'Show all', listCollapse: 'Hide all' },
  },
  breadcrumbs: {
    storage: 'Data storage',
    storages: 'Storages',
    virtualization: 'Virtualization',
    virtualMachines: 'Virtual machines',
    vmCreate: 'Create virtual machine',
    vmEdit: 'Edit virtual machine',
    virtualNetworks: 'Virtual networks',
    vnetItem: 'Virtual network',
    devices: 'Devices',
    networkAdapters: 'Network adapters',
    physicalDisks: 'Physical disks',
    blockDevices: 'Block devices',
    journal: 'Journal',
    disks: 'Virtual disks',
    images: 'Virtual images',
  },
  header: {
    monitoring: {
      criticals: {
        menu: {
          title: 'Critical errors',
          message: 'Errors need to be corrected',
          noMessages: 'No critical errors',
        },
        items: {
          storageSize: { name: 'Not enough free disk space', msg: '' },
          ramSize: { name: 'Not enough RAM', msg: '' },
          cpuUsage: { name: 'Critical CPU Load', msg: '' },
        },
      },
      warnings: {
        menu: {
          title: 'Warning notifications',
          noMessages: 'No warning notifications',
        },
        items: {
          storageSize: { name: 'Not enough free disk space', msg: '' },
          ramSize: { name: 'Low RAM', msg: '' },
          cpuUsage: { name: 'High CPU load', msg: '' },
        },
      },
    },
    search: {
      placeholder: 'Search a function or setting',
      options: {
        labels: {
          bridgeCreate: 'Create network bridge',
          vmCreate: 'Create VM',
          vnetCreate: 'Create virtual network',
          storageCreate: 'Create storage',
          volumeCreate: 'Create virtual volume',
          imageCreate: 'Create virtual image',
          iscsiSessionCreate: 'Create an iSCSI session',
          fibreChannelLipScan: 'Scan Fibre Channel (LIP)',
        },
        descriptions: {
          interface: 'Network interface',
          physicalDisk: 'Physical disk',
          virtualMachine: 'Virtual machine',
          vnet: 'Virtual network',
          storage: 'Storage',
          volume: 'Virtual volume',
          image: 'Virtual image',
          iscsiSession: 'iSCSI session',
        },
      },
    },
    accountMenu: {
      logout: {
        title: 'Sign out',
        modalTitle: 'Signing out',
        modalText: 'Are you sure you want to sign out?',
        confirmText: 'Sign out',
      },
    },
  },
  notFound: { title: '404 not found', text: 'Page not found' },
  authForm: { login: 'Login', fields: { username: 'Username', password: 'Password' } },

  // API ERRORS
  apiErrors: {
    auth: 'Wrong credentials',
    canceled: 'Request canceled',
    rpcException: {
      ImageHasAttachmentError: 'Image is used in a virtual machine',
      VolumeHasAttachmentError: 'Volume is used in a virtual machine',
    },
    code: {
      400: 'Something went wrong',
      403: 'Action forbidden',
      422: 'A validation error occurred',
      500: 'Something went wrong',
    },
  },

  // MODULES
  dashboard: {
    widgets: {
      ramWidget: {
        title: 'RAM',
        used: 'Used\n({unit})',
        free: 'Available\n({unit})',
      },
      storageWidget: {
        title: 'Storages',
        total: 'Total ({unit})',
        used: 'Used ({unit})',
        free: 'Available ({unit})',
      },
      cpuWidget: {
        title: 'CPU',
        cores: 'Cores',
        threads: 'Threads',
      },
      iopsMonitoringWidget: {
        title: 'Monitoring',
        subtitle: 'IOPS',
        legend: { input: 'Input', output: 'Output' },
      },
      ioLatencyMonitoringWidget: {
        title: 'Monitoring',
        subtitle: 'IO Latency (ms)',
        legend: { wait: 'Wait' },
      },
      ioNetworkBandwidthMonitoringWidget: {
        title: 'Monitoring',
        subtitle: 'Network IO Bandwidth (Mb/s)',
        legend: { read: 'Read', write: 'Write' },
      },
      ioDiskBandwidthMonitoringWidget: {
        title: 'Monitoring',
        subtitle: 'Disk IO Bandwidth (Mb/s)',
        legend: { read: 'Read', write: 'Write' },
      },
      gridSettingsWidget: {
        title: 'Panel settings',
        modalTitle: 'Dashboard settings',
        gridSettings: {
          title: 'Grid settings',
          changeWidgetSize: 'Resizing widgets',
          movingWidgets: 'Moving widgets',
          disableCollision: 'Disable collisions when moving',
          verticalCompact: 'Grid compactness vertically',
        },
        selectWidgets: 'Selecting widgets to display',
        resetSettings: {
          title: 'Reset dashboard settings',
          text: `Are you sure you want to reset dashboard settings?
          Grid settings and widgets to display will be reset`,
          submitText: 'Reset',
        },
      },
    },
  },
  devices: {
    networkAdapters: {
      table: {
        mac: 'MAC address',
        mask: 'Mask',
      },
      actions: {
        create: {
          title: 'Creating a network bridge',
          hint: `When selecting the main interface during the bridge creation process, keep in mind that temporary network interruption
          connection is possible. This is due to the transition phase when the new bridge is configured and comes into use.
          work instead of the current interface.

          Loss of communication may cause disruption to network services, so it is strongly recommended that you schedule
          this procedure during periods of least activity or outside of working hours. You should also make sure you have everything
          necessary means to restore the connection if problems arise.`,
          fields: {
            name: { label: 'Name', placeholder: 'Enter name' },
            type: { label: 'Interface type', placeholder: 'Select interface type' },
            interfaces: { label: 'Interfaces', placeholder: 'Select interfaces' },
            ip: { label: 'IP address', placeholder: 'Enter IP address' },
          },
        },
        turnOn: {
          confirm: 'Turn on',
          single: {
            title: 'Turning on network device',
            text: `Are you sure you want to turn on network device {name}?`,
          },
          many: {
            title: 'Turning on network devices',
            text: 'Are you sure you want to turn on network devices ({count})?',
          },
        },
        turnOff: {
          confirm: 'Turn off',
          single: {
            title: 'Turning off network interface',
            text: `Are you sure you want to turn off network device {name}?`,
          },
          many: {
            title: 'Turning off network interfaces',
            text: 'Are you sure you want to turn off network devices ({count})?',
          },
        },
        delete: {
          single: {
            title: 'Deleting network bridge',
            text: 'Are you sure you want to delete network bridge {name}?',
          },
          many: {
            title: 'Deleting network bridges',
            text: 'Are you sure you want to delete network bridges ({count})?',
          },
        },
      },
    },
    physicalDisks: {
      table: {
        type: 'Device type',
        fsType: 'FS type',
        fsId: 'FS ID',
        mountpoint: 'Mount point',
        children: 'Partitions',
        parent: 'Parent',
      },
      card: {
        backlink: 'Physical disk - {name}',
        tabs: { main: 'Main settings', partitions: 'Partitions' },
        noData: 'Failed to retrieve physical disk data. An error has occurred',
        totalSize: 'Disk total size: ',
      },
      actions: {
        createPartition: {
          title: 'Create partition',
          modalTitle: 'Creating partition',
          hint: 'A partition will be created for the disk {name}',
          fields: { size: { label: 'Size', validation: 'Partition size cannot exceed the disk size {size}' } },
        },
        deletePartition: {
          title: 'Delete partition',
          form: { select: { label: 'Partitions', placeholder: 'Select partitions' } },
          many: { title: 'Deleting partitions', text: 'Are you sure you want to delete partitions ({count})?' },
          single: { title: 'Deleting partition', text: 'Are you sure you want to delete partition {name}?' },
        },
      },
    },
  },
  virtualization: {
    vm: {
      table: {
        cpu: 'Number of CPU',
        cores: 'Cores',
        threads: 'Threads per cores',
        vcpu: 'Virtual cores',
        topology: 'CPU topology',
        information: 'Information',
        powerState: {
          header: 'Power',
          shut_off: 'OFF',
          running: 'ON',
        },
      },
      actions: {
        edit: 'Edit',
        delete: {
          many: {
            title: 'Delete virtual machines',
            text: 'Are you sure you want to delete virtual machines ({count})?',
          },
          single: {
            title: 'Delete virtual machine',
            text: 'Are you sure you want to delete virtual machine {name}?',
          },
        },
        start: {
          many: {
            title: 'Running virtual machines',
            text: 'Are you sure you want to start virtual machines ({count})?',
          },
          single: {
            title: 'Running virtual machine',
            text: 'Are you sure you want to start virtual machine {name}?',
          },
        },
        shutOff: {
          title: 'Down',
          many: {
            title: 'Downing virtual machines',
            text: 'Are you sure you want to down virtual machines ({count})?',
          },
          single: { title: 'Downing virtual machine', text: 'Are you sure you want to down virtual machine {name}?' },
        },
        vnc: 'VNC client',
      },
      form: {
        receivingVmError: 'Failed to receive VM data. An error has occurred',
        tabs: {
          settings: {
            title: 'Settings',
            sections: {
              mainSettings: 'Basic settings',
              bootComponents: 'Boot components',
              ballooning: 'Ballooning',
            },
            fields: {
              name: { label: 'Name', placeholder: 'Enter VM name' },
              alias: { label: 'Alias', placeholder: 'Enter VM alias' },
              description: { label: 'Description', placeholder: 'Enter VM Description' },
              osType: { label: 'OS type', placeholder: 'Select OS type' },
              osVariant: { label: 'OS variant', placeholder: 'Select OS variant' },
              bootDevice: { label: 'Boot device' },
              havm: {
                tooltip: `High Availability Virtual Machine
                If enabled, this VM will be restarted once on another
                node if the current node goes down`,
                options: { on: 'On', off: 'Off' },
              },
              havmPriority: {
                label: 'Priority',
                placeholder: 'Enter HAVM priority',
                tooltip: `The higher the selected number, the higher the priority
                to turn on the VM with the HAVM function`,
              },
              graphicsDriver: { label: 'Graphics driver', placeholder: 'Select graphics driver' },
              graphics: { label: 'Access protocol' },
              adl: { label: 'ADL' },
              memory_ballooning: { label: 'Ballooning' },
              memory_standard_value: { label: 'Guaranteed memory' },
              memory_period: { label: 'Period (seconds)', placeholder: 'Enter period' },
            },
          },
          cpuRamSettings: {
            title: 'CPU/RAM settings',
            sections: {
              cpu: 'CPU',
              cpuFeatures: 'CPU features',
              ram: 'RAM',
            },
            fields: {
              cpyDynamicTopology: { label: 'Dynamic topology' },
              cpuSockets: { label: 'Sockets', placeholder: 'Enter number of sockets' },
              cpuCores: { label: 'Cores', placeholder: 'Enter number of cores' },
              threads: { label: 'Threads', placeholder: 'Enter number of threads' },
              virtualCores: { label: 'Virtual cores', placeholder: 'Enter number of virtual cores' },
              cpuModel: { label: 'CPU model', placeholder: 'Select CPU model' },
              cpuFeatures: { placeholder: 'Select options' },
            },
          },
          disks: {
            title: 'Disks',
            modalTitle: 'Add disks',
            tabs: {
              existDisk: 'Exist',
              existDiskExtra: 'Additional settings for existing disk',
              new: 'New',
              rdm: 'Selecting RDM disk',
            },
            sections: {
              qos: 'Service priorities (QOS)',
              readWriteSec: 'MB/sec',
              iops: 'IOPS',
              diskConfiguration: 'Disk configuration',
            },
            fields: {
              variant: {
                options: {
                  exist: 'Select an existing disk from storage',
                  rdm: 'Select RDM disk',
                  new: 'Create a new disk',
                },
              },
              storageType: { label: 'Storage type', placeholder: 'Select storage type' },
              storageSubtype: { label: 'Storage subtype', placeholder: 'Select storage subtype' },
              disk: {
                headers: { storageName: 'Storage', storageType: 'Storage type' },
                validationMessage: 'Disk must be selected',
              },
              emulation: { label: 'Emulation', placeholder: 'Select option' },
              cache: { label: 'Cache', placeholder: 'Select option' },
              io: { placeholder: 'Select option' },
              rotation: { label: 'Format', placeholder: 'Select format' },
              template: { label: 'Template', placeholder: 'Select option' },
              iopsRead: { label: 'Read' },
              iopsWrite: { label: 'Write' },
              extraSettings: 'Advanced settings',
            },
            validationMessage: 'Disk must be selected',
            deleteAction: {
              title: 'Delete disk',
              text: 'Are you sure you want to delete disk {name}',
            },
          },
          images: {
            title: 'Virtual images',
            btnAdd: 'Add VI',
            modalTitle: 'Add virtual image',
            backgroundUploading: 'Background VI download in progress',
            tabs: { exist: 'Exist', new: 'New' },
            fields: {
              variant: { exist: 'Select an existing virtual image', new: 'Upload a new virtual image' },
              storageType: { label: 'Storage type', placeholder: 'Select storage type' },
              storageSubtype: { label: 'Storage subtype', placeholder: 'Select storage subtype' },
              image: {
                headers: { storageName: 'Storage', storageType: 'Storage type' },
                validationMessage: 'You must select a virtual image',
              },
            },
            deleteAction: {
              title: 'Delete virtual image',
              text: 'Are you sure you want to delete virtual image {name}',
            },
          },
          networks: {
            title: 'Network',
            btnAdd: 'Add network',
            modalTitle: 'Add network interface',
            validationMessage: 'You must select a network',
            tabs: { variant: 'Select type', bridge: 'Bridge', vnet: 'Vnet', extraSettings: 'Ext.Settings' },
            sections: { configuration: 'Configuration' },
            fields: {
              variant: { label: 'Select network interface type', bridge: 'Bridge', vnet: 'Virtual network' },
              network: { validationMessage: 'You must select a network interface' },
              mode: { label: 'Mode', placeholder: 'Select mode' },
              model: { label: 'Model', placeholder: 'Select model' },
              mac: { placeholder: 'Enter MAC address' },
              vnet: { name: 'Portgroup name', isTrunk: 'Trunk', tags: 'Tags', interface: 'Interface' },
            },
            deleteAction: {
              title: 'Delete network',
              text: 'Are you sure you want to delete network {name}',
            },
          },
        },
      },
      card: {
        backlink: 'Virtual machine',
        noData: 'Failed to retrieve virtual machine data. An error has occurred',
        tabs: {
          main: {
            title: 'Basic information',
            sections: {
              main: 'Basic settings',
              boot: 'Boot Components',
            },
            fields: {
              name: 'Name',
              powerState: 'Power state',
              description: 'Description',
              information: 'Information',
              osType: 'OS type',
              osVariant: 'OS variant',
              bootDevice: 'Boot device',
              graphicsDriver: 'Graphics driver',
              graphicType: 'Access protocol',
            },
          },
          cpuRam: {
            title: 'CPU/RAM',
            sections: { cpu: 'CPU', ram: 'RAM' },
            fields: {
              sockets: 'Sockets',
              cores: 'Cores',
              threads: 'Threads',
              size: 'Size',
              cpuModel: 'CPU model',
              topology: 'Dynamic topology',
              vCores: 'Virt. cores',
            },
          },
          disks: { title: 'Disks', noData: 'No disks' },
          images: { title: 'Virtual images', noData: 'No virtual images' },
          network: { title: 'Network', noData: 'No networks' },
        },
        formBacklink: { create: 'Creating Virtual Machine', edit: 'Editing Virtual Machine' },
      },
    },
    virtualNetworks: {
      table: {
        portgroups: 'Portgroups',
        forwardMode: 'Forward mode',
        bridge: 'Bridge',
        virtualPortType: 'Virtual port type',
        autostart: 'Autostart',
        persistent: 'Persistent',
      },
      actions: {
        create: {
          title: 'Creating virtual network',
          fields: {
            name: { label: 'Name', placeholder: 'Enter name' },
            forwardMode: { label: 'Forward mode', placeholder: 'Select forward mode' },
            bridge: { label: 'Bridge', placeholder: 'Select bridge' },
            virtualPortType: { label: 'Virtual portgroup type', placeholder: 'Select portgroup type' },
            portGroups: {
              label: 'Portgroups',
              name: 'Name',
              isTrunk: 'Trunk',
              tags: 'Tags',
            },
          },
        },
        delete: {
          many: {
            title: 'Delete virtual networks',
            text: 'Are you sure you want to delete virtual networks ({count})?',
          },
          single: {
            title: 'Delete virtual network',
            text: 'Are you sure you want to delete virtual network {name}?',
          },
        },
        turnOn: {
          title: 'Turn on',
          many: {
            title: 'Turn on virtual networks',
            text: 'Are you sure you want to turn on virtual networks ({count})?',
          },
          single: {
            title: 'Turn on virtual network',
            text: 'Are you sure you want to turn on virtual network {name}?',
          },
        },
        turnOff: {
          title: 'Turn off',
          many: {
            title: 'Turn off virtual networks',
            text: 'Are you sure you want to turn off virtual networks ({count})?',
          },
          single: {
            title: 'Turn off virtual network',
            text: 'Are you sure you want to turn off virtual network {name}?',
          },
        },
        createPortgroup: {
          title: 'Add portgroup',
          modalTitle: 'Add portgroup',
          submitText: 'Add',
          fields: {
            name: { label: 'Name', placeholder: 'Enter name' },
            tags: { label: 'Tags', placeholder: 'Enter tag and press Enter', noSelect: 'No tags' },
            isTrunk: { label: 'Trunk' },
          },
        },
        deletePortgroup: {
          title: 'Delete portgroup',
          modalTitle: 'Deleting portgroup',
          portgroup: { name: 'Name', isTrunk: 'Trunk', tags: 'Tags' },
        },
      },
    },
  },
  storages: {
    table: {
      storageType: 'Storage type',
      available: 'Available',
      information: 'Information',
    },
    actions: {
      create: {
        title: 'Create',
        modalTitle: 'Create storage',
        form: {
          tabs: {
            storageType: 'Storage type',
            configuration: 'Configuration',
            disk: 'Disk',
          },
          fields: {
            storageType: { label: 'Storage type', placeholder: 'Select storage type' },
            common: {
              name: { label: 'Name', placeholder: 'Enter name' },
              description: { label: 'Description', placeholder: 'Enter description' },
            },
            nfs: {
              ip: { label: 'IP address', placeholder: 'Enter IP address' },
              path: { label: 'Path', placeholder: 'Enter path' },
            },
            localFs: {
              fsType: { label: 'File system', placeholder: 'Select file system' },
              path: { headers: { path: 'Path', size: 'Size', type: 'Device type' } },
            },
          },
        },
      },
      delete: {
        many: {
          title: 'Delete storages',
          text: 'Are you sure you want to delete storages ({count})?',
        },
        single: {
          title: 'Delete storage {type}',
          text: 'Are you sure you want to delete storage {name}?',
        },
      },
    },
    disks: {
      table: {
        attachments: 'Virtual machines',
        storage: 'Storage',
        information: 'Information',
        readOnly: 'Read only',
      },
      actions: {
        create: {
          title: 'Create',
          modalTitle: 'Create virtual disk',
          fields: {
            name: { label: 'Disk name', placeholder: 'Enter disk name' },
            description: { label: 'Description', placeholder: 'Enter description' },
            storage: { label: 'Storage', placeholder: 'Select storage' },
            format: { label: 'Disk format', placeholder: 'Select disk format' },
            size: {
              label: 'Disk size',
              validation: 'The disk size cannot exceed the amount of free space on the pool {size}',
            },
            read_only: { label: 'Read only' },
          },
        },
        delete: {
          single: {
            title: 'Delete virtual disk',
            text: 'Are you sure you want to delete virtual disk {name}',
          },
          many: {
            title: 'Delete virtual disks',
            text: 'Are you sure you want to delete virtual disks ({count})?',
          },
        },
        extend: {
          title: 'Increase volume',
          formTitle: 'Increasing disk space',
          submitText: 'Increase',
          formHint: 'Disk space will be increased {name}',
          formInput: {
            label: 'New disk space',
            validationMessages: {
              maxSize: 'The new disk size cannot exceed the amount of free space in storage {size}',
              minSize: 'The new disk size cannot be less than the current {size}',
            },
          },
        },
        edit: {
          title: 'Edit',
          formTitle: 'Editing virtual disk',
          formHint: 'Virtual disk will be changed {name}',
        },
      },
    },
    images: {
      table: {
        attachments: 'Virtual machines',
        storage: 'Storage',
        information: 'Information',
      },
      actions: {
        upload: {
          title: 'Upload',
          modalTitle: 'Uploading virtual image',
          uploadingProgress: 'Uploading file',
          fields: {
            name: { label: 'Name', placeholder: 'Enter name', validationTaken: 'Name already in use' },
            description: { label: 'Description', placeholder: 'Enter description' },
            image: {
              buttonText: 'Select image',
              dropzone: 'Or put the image in this container',
              notSelected: 'Image not selected',
            },
            storageId: {
              label: 'Storage',
              placeholder: 'Select storage',
              validationMessage: 'The amount of free space in the storage has been exceeded',
            },
          },
        },
        delete: {
          many: {
            title: 'Delete virtual images',
            text: 'Are you sure you want to delete virtual images ({count})?',
          },
          single: {
            title: 'Delete virtual image',
            text: 'Are you sure you want to delete virtual image {name}?',
          },
        },
      },
    },
    card: {
      backlink: 'Storage',
      tabs: {
        main: {
          title: 'Main information',
          fields: {
            information: 'information',
            userId: 'User ID',
            fsType: 'FS type',
            mountPoint: 'Mount point',
            mountVersion: 'Version',
          },
        },
        volumes: {
          title: 'Disks',
        },
      },
    },
  },
  blockDevices: {
    table: { port: 'Port' },
    actions: {
      scan: {
        title: 'Scan (LIP)',
        modalTitle: 'Scan Fibre Channel',
        text: `Scanning will be performed on Fiber Channel host adapters using the protocol
        LIP (Loop Initialization Protocol). This method allows you to discover and add new
        devices to the Fiber Channel network`,
        confirmText: 'Scan',
      },
      login: {
        title: 'Login',
        modalTitle: 'Login iSCSI session',
        fields: {
          ip: { label: 'IP', placeholder: 'Enter IP' },
          port: { label: 'Port', placeholder: 'Enter port' },
        },
      },
      logout: {
        title: 'Logout',
        many: {
          title: 'Logout sessions',
          text: 'Are you sure you want to logout sessions ({count})?',
        },
        single: {
          title: 'Logout session',
          text: 'Are you sure you want to logout session {name}?',
        },
      },
    },
  },
  journal: {
    table: {
      module: 'Module',
      event: 'Event',
      information: 'Info',
      objectId: 'Object ID',
      timestamp: 'Date',
      userId: 'User ID',
    },
    actions: {
      download: {
        title: 'Download',
      },
    },
  },
  settings: {
    settings: 'Settings',
    interfaceSettings: 'Interface settings',
    clusterSettings: 'Cluster settings',
    adlSettings: {
      title: 'ADL settings',
      cpuThreshold: { label: 'CPU threshold in %', placeholder: 'Enter CPU threshold' },
      ramThreshold: { label: 'RAM threshold in %', placeholder: 'Enter RAM threshold' },
      nodesParticipants: { label: 'Nodes participants', placeholder: 'Select nodes participants' },
    },
    RAMOverwriting: {
      enable: 'Enable RAM overwriting',
      nodes: 'Nodes for overwriting',
      nodesSelect: 'Select nodes',
    },
    theme: 'Theme',
    themes: {
      dark: 'Dark',
      darkBlue: 'Dark blue',
      light: 'Light',
    },
    locale: 'Language',
    locales: {
      ru: '🇷🇺 Русский',
      en: '🇺🇸 English',
    },
    sizeNotation: 'Size notation',
    oldVersion: 'Go to old user interface',
    sizeNotations: {
      iec: 'IEC Binary (KiB, MiB, GiB, TiB)',
      si: 'SI Decimal (KB, MB, GB, TB)',
    },
    sizeNotationsDesc: {
      iec: `Kibibyte (KiB) 2^10 bytes
        Mebibyte (MiB) 2^20 bytes
        Gibibyte (GiB) 2^30 bytes
        Tebibyte (TiB) 2^40 bytes`,
      si: `Kilobyte (KB) 10^3 bytes
       Megabyte (MB) 10^6 bytes
       Gigabyte (GB) 10^9 bytes
       Terabyte (TB) 10^12 bytes`,
    },
  },
}
