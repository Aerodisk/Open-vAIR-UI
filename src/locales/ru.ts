import type { FormKitNode } from '@formkit/core'

export type FormKitValidationI18NArgs = {
  node: FormKitNode
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  message?: string
}

export const ru = {
  // COMMON
  close: 'Закрыть',
  open: 'Открыть',
  create: 'Создать',
  save: 'Сохранить',
  refresh: 'Обновить',
  delete: 'Удалить',
  restart: 'Перезагрузить',
  cancel: 'Отмена',
  run: 'Запустить',
  yes: 'Да',
  no: 'Нет',
  path: 'Путь',
  status: 'Статус',
  speed: 'Скорость',
  state: 'Состояние',
  name: 'Имя',
  description: 'Описание',
  type: 'Тип',
  connection: 'Соединение',
  connections: 'Подключения',
  mounted: 'Примонтирован',
  options: 'Параметры',
  accessRights: 'Права доступа',
  generalInformation: 'Общие сведения',
  node: 'Узел',
  nodes: 'Узлы',
  format: 'Формат',
  readOnly: 'Только для чтения',
  createTime: 'Дата создания',
  startTime: 'Дата начала',
  endTime: 'Дата конца',
  updateTime: 'Дата изменения',
  date: 'Дата',
  startDate: 'Дата начала',
  endDate: 'Дата конца',
  time: 'Время',
  cluster: 'Кластер',
  search: 'Поиск',
  ram: 'ОЗУ',
  cpu: 'ЦПУ',
  interface: 'Интерфейс',
  port: 'Порт',
  ipAddress: 'IP-адрес',
  ipAddresses: 'IP-адреса',
  host: 'Хост',
  user: 'Пользователь',
  code: 'Код',
  progress: 'Прогресс',
  message: 'Сообщение',
  uptime: 'Время работы',
  alias: 'Псевдоним',
  add: 'Добавить',
  day: '0 дней | {n} день | {n} дня | {n} дней',
  hour: '0 часов | {n} час | {n} часа | {n} часов',
  noData: 'Нет данных',

  // MODAL
  modal: {
    confirmAction: 'Подтвердите действие',
    listExpand: 'Показать все',
    listCollapse: 'Скрыть все',
    licenseTrial: {
      header: {
        text: `Данная версия ПО является тестовой 
        Не предназначено для коммерческого использования`,
      },
      expiresSoon: {
        title: 'Тестовая лицензия скоро закончится',
        text: `Срок действия тестовой лицензии истекает через {unit}
        Обратитесь в отдел продаж Аэродиск`,
      },
      dontShowAgain: 'Больше не показывать',
      closeText: 'Ок',
    },
    license: {
      expired: {
        title: 'Техническая поддержка окончена',
        text: `Срок действия технической поддержки истек
        Обратитесь в отдел продаж Аэродиск`,
      },
      expiresSoon: {
        title: 'Техническая поддержка скоро заканчивается',
        text: `Срок действия вашей технической поддержки истекает через {unit}
        Обратитесь в отдел продаж Аэродиск`,
      },
      dontShowAgain: 'Больше не показывать',
      closeText: 'Ок',
    },
  },

  // FORM
  form: {
    next: 'Далее',
    back: 'Назад',
    sizeInput: {
      unit: { label: 'Единица измерения', placeholder: 'Выберите единицу измерения' },
      size: { label: 'Размер', placeholder: 'Введите размер' },
    },
    fileInput: {
      errors: {
        'file-invalid-type': 'Неверный тип файла',
        uploadError: 'Возникла ошибка при загрузке файла. Попробуйте снова',
      },
    },
  },

  // SIZES
  sizes: {
    full: {
      si: {
        B: 'Байт',
        K: 'Килобайт',
        M: 'Мегабайт',
        G: 'Гигабайт',
        T: 'Терабайт',
      },
      iec: {
        B: 'Байт',
        K: 'Кибибайт',
        M: 'Мебибайт',
        G: 'Гибибайт',
        T: 'Тебибайт',
      },
    },
    short: {
      si: {
        B: 'Б',
        K: 'КБ',
        M: 'МБ',
        G: 'ГБ',
        T: 'ТБ',
      },
      iec: {
        B: 'Б',
        K: 'КиБ',
        M: 'МиБ',
        G: 'ГиБ',
        T: 'ТиБ',
      },
    },
    size: 'размер',
    volume: 'объём',
    used: 'занято',
    available: 'свободно',
    availPercentage: 'занято (%)',
  },

  // LAYOUT
  sidebar: {
    dashboard: 'Системная панель',
    devices: 'Устройства',
    networkAdapters: 'Сетевые устройства',
    physicalDisks: 'Физические диски',
    virtualization: 'Виртуализация',
    virtualMachines: 'ВМ (Виртуальные машины)',
    virtualNetworks: 'Виртуальные сети',
    storage: 'Хранение данных',
    storages: 'Хранилища',
    disks: 'Виртуальные диски',
    images: 'Виртуальные образы',
    blockDevices: 'Блочные устройства',
    journal: 'Журналирование',
  },
  dataTable: {
    rowsPerPage: 'Показывать строк: {n}',
    bottomCounter: 'Записи с {firstIndex} по {lastIndex} из {total} записей',
    noData: 'Нет данных для отображения',
    columns: 'Колонки',
    cells: { linksList: { collapse: 'Свернуть' } },
  },
  formkit: {
    validation: {
      ip: 'Некорректный IP.',
      mac: 'Некорретный MAC.',
      uniq: 'Значение должно быть уникальным.',
      multipleOf: ({ args }: FormKitValidationI18NArgs) => `Кол-во выбранных элементов должно быть кратно ${args[0]}.`,
      name: 'Разрешены только латинские буквы, цифры, пробел и нижнее подчёркивание (_).',
      nameUpper: 'Разрешены только большие латинские буквы, цифры, проблел и нижнее подчёркивание (_).',
      login: 'Разрешены только латинские буквы, цифры, нижнее подчёркивание (_) и дефис (-).',
    },
    ui: {},
    inputs: {
      date: { select: 'Выбрать' },
      select: { noElements: 'Нет элементов', empty: 'Пусто', optionSearch: 'Поиск по опциям' },
      file: {
        selectFile: 'Выберите файл',
        dropzone: 'Или поместите его в этот контейнер',
        notSelected: 'Файл не выбран',
      },
      size: {
        validation: {
          required: 'Поле {name} обязательно для заполнения.',
          min: 'Поле {name} должно быть не менее, чем {count}.',
          moreThan: '{name} не может быть больше чем {name2}',
        },
      },
    },
    hint: { listExpand: 'Показать все', listCollapse: 'Скрыть все' },
  },
  breadcrumbs: {
    storage: 'Хранение данных',
    storages: 'Хранилища',
    virtualization: 'Виртуализация',
    virtualMachines: 'Виртуальные машины',
    vmCreate: 'Создание виртуальной машины',
    vmEdit: 'Редактирование виртуальной машины',
    virtualNetworks: 'Виртуальные сети',
    vnetItem: 'Виртуальная сеть',
    devices: 'Устройства',
    networkAdapters: 'Сетевые устройства',
    physicalDisks: 'Физические диски',
    blockDevices: 'Блочные устройства',
    journal: 'Журналирование',
    disks: 'Вируальные диски',
    images: 'Вируальные образы',
  },
  header: {
    monitoring: {
      criticals: {
        menu: {
          title: 'Критические ошибки',
          message: 'Требуется исправить ошибки',
          noMessages: 'Нет критических ошибок',
        },
        items: {
          storageSize: { name: 'Недостаточно свободной памяти на дисках', msg: '' },
          ramSize: { name: 'Недостаточно оперативной памяти', msg: '' },
          cpuUsage: { name: 'Критическая нагрузка CPU', msg: '' },
        },
      },
      warnings: {
        menu: {
          title: 'Важные уведомления',
          noMessages: 'Нет важных уведомлений',
        },
        items: {
          storageSize: { name: 'Мало свободной памяти на дисках', msg: '' },
          ramSize: { name: 'Мало оперативной памяти', msg: '' },
          cpuUsage: { name: 'Высокая нагрузка CPU', msg: '' },
        },
      },
    },
    search: {
      placeholder: 'Поиск функции или настройки',
      options: {
        labels: {
          bridgeCreate: 'Создать сетевой мост',
          vmCreate: 'Создать ВМ',
          vnetCreate: 'Создать виртуальную сеть',
          storageCreate: 'Создать хранилище',
          volumeCreate: 'Создать виртуальный диск',
          imageCreate: 'Создать виртуальный образ',
          iscsiSessionCreate: 'Создать iSCSI сессию',
          fibreChannelLipScan: 'Сканировать Fibre Channel (LIP)',
        },
        descriptions: {
          interface: 'Сетевой интерфейс',
          physicalDisk: 'Физический диск',
          virtualMachine: 'Виртуальная машина',
          vnet: 'Виртуальная сеть',
          storage: 'Хранилище',
          volume: 'Виртуальный диск',
          image: 'Виртуальный образ',
          iscsiSession: 'iSCSI сессия',
        },
      },
    },
    accountMenu: {
      logout: {
        title: 'Выйти из аккаунта',
        modalTitle: 'Выход из аккаунта',
        modalText: 'Вы уверены что хотите выйти из аккаунта?',
        confirmText: 'Выйти',
      },
    },
  },
  notFound: { title: '404 not found', text: 'Страница не найдена' },
  authForm: { login: 'Войти', fields: { username: 'Логин', password: 'Пароль' } },

  // API ERRORS
  apiErrors: {
    auth: 'Неверные учетные данные',
    canceled: 'Запрос отменён',
    rpcException: {
      ImageHasAttachmentError: 'Образ используется в виртуальной машине',
      VolumeHasAttachmentError: 'Диск используется в виртуальной машине',
    },
    code: {
      400: 'Что-то пошло не так',
      403: 'Действие запрещено',
      422: 'Возникла ошибка валидации',
      500: 'Что-то пошло не так',
    },
  },

  // MODULES
  dashboard: {
    widgets: {
      ramWidget: {
        title: 'ОЗУ',
        used: 'Использ.\n({unit})',
        free: 'Свободно\n({unit})',
      },
      storageWidget: {
        title: 'Хранилища',
        total: 'Всего ({unit})',
        used: 'Использ. ({unit})',
        free: 'Свободно ({unit})',
      },
      cpuWidget: {
        title: 'ЦПУ',
        cores: 'Ядер',
        threads: 'Потоков',
      },
      iopsMonitoringWidget: {
        title: 'Мониторинг',
        subtitle: 'IOPS',
        legend: { input: 'Ввод', output: 'Вывод' },
      },
      ioLatencyMonitoringWidget: {
        title: 'Мониторинг',
        subtitle: 'IO Latency (ms)',
        legend: { wait: 'Задержка' },
      },
      ioNetworkBandwidthMonitoringWidget: {
        title: 'Мониторинг',
        subtitle: 'Network IO Bandwidth (Mb/s)',
        legend: { read: 'Чтение', write: 'Запись' },
      },
      ioDiskBandwidthMonitoringWidget: {
        title: 'Мониторинг',
        subtitle: 'Disk IO Bandwidth (Mb/s)',
        legend: { read: 'Чтение', write: 'Запись' },
      },
      gridSettingsWidget: {
        title: 'Настройки панели',
        modalTitle: 'Настройки системной панели',
        gridSettings: {
          title: 'Настройки сетки',
          changeWidgetSize: 'Изменение размера виджетов',
          movingWidgets: 'Перемещение виджетов',
          disableCollision: 'Убрать колизии при перемещении',
          verticalCompact: 'Компакность сетки по вертикали',
        },
        selectWidgets: 'Выбор виджетов для отображения',
        resetSettings: {
          title: 'Сброс настроек системной панели',
          text: `Вы действительно хотите сбросить настройки системной панели?
          Настройки сетки и виджеты для отображения будут сброшены`,
          submitText: 'Сбросить',
        },
      },
    },
  },
  devices: {
    networkAdapters: {
      table: {
        mac: 'MAC адрес',
        mask: 'Маска',
      },
      actions: {
        create: {
          title: 'Создание сетевого моста',
          hint: `При выборе главного интерфейса в процессе создания бриджа, имейте в виду, что временное прерывание сетевого 
          соединения является возможным. Это связано с переходным этапом, когда новый бридж конфигурируется и вступает в
          работу, вместо текущего интерфейса.

          Потеря связи может вызвать прерывание в работе сетевых сервисов, поэтому настоятельно рекомендуется запланировать
          эту процедуру на период наименьшей активности или вне рабочего времени. Также следует убедиться, что у вас есть все
          необходимые средства для восстановления соединения в случае возникновения проблем.`,
          fields: {
            name: { label: 'Имя', placeholder: 'Укажите имя' },
            type: { label: 'Тип интерфейса', placeholder: 'Выберите тип интерфейса' },
            interfaces: { label: 'Интерфейсы', placeholder: 'Выберите интерфейсы' },
            ip: { label: 'IP адрес', placeholder: 'Укажите IP адрес' },
          },
        },
        turnOn: {
          confirm: 'Включить',
          single: {
            title: 'Включение сетевого устройства',
            text: `Вы уверены что хотите включить сетевое устройство {name}?`,
          },
          many: {
            title: 'Включение сетевых устройств',
            text: 'Вы уверены что хотите включить сетевые устройства ({count})?',
          },
        },
        turnOff: {
          confirm: 'Выключить',
          single: {
            title: 'Выключение сетевого устройства',
            text: `Вы уверены что хотите выключить сетевое устройство {name}?`,
          },
          many: {
            title: 'Выключение сетевых устройств',
            text: 'Вы уверены что хотите выключить сетевые устройства ({count})?',
          },
        },
        delete: {
          single: {
            title: 'Удаление сетевого моста',
            text: 'Вы действительно хотите удалить сетевой мост ({name})?',
          },
          many: {
            title: 'Удаление сетевых мостов',
            text: 'Вы действительно хотите удалить сетевые мосты ({count})?',
          },
        },
      },
    },
    physicalDisks: {
      table: {
        type: 'Тип устройства',
        fsType: 'Тип ФС',
        fsId: 'ФС ID',
        mountpoint: 'Точка монтирования',
        children: 'Партиции',
        parent: 'Родитель',
      },
      card: {
        backlink: 'Физический диск - {name}',
        tabs: { main: 'Основные настройки', partitions: 'Партиции' },
        noData: 'Не удалось получить данные о физическом диске. Произошла ошибка',
        totalSize: 'Общий объём диска: ',
      },
      actions: {
        createPartition: {
          title: 'Создать партицию',
          modalTitle: 'Создание партиции',
          hint: 'Будет создана партиция у диска {name}',
          fields: { size: { label: 'Размер', validation: 'Размер партиции не может превышать размер диска {size}' } },
        },
        deletePartition: {
          title: 'Удалить партицию',
          form: { select: { label: 'Партиции', placeholder: 'Выберите партиции' } },
          many: { title: 'Удаление партиций', text: 'Вы действительно хотите удалить партиции ({count})?' },
          single: { title: 'Удаление партицию', text: 'Вы действительно хотите удалить партицию {name}?' },
        },
      },
    },
  },
  virtualization: {
    vm: {
      table: {
        cpu: 'Кол-во ЦПУ',
        cores: 'Ядер',
        threads: 'Потоков на ядро',
        vcpu: 'Вирт. ядра',
        topology: 'Топология ЦПУ',
        information: 'Информация',
        powerState: {
          header: 'Питание',
          shut_off: 'OFF',
          running: 'ON',
        },
      },
      actions: {
        edit: 'Изменить',
        delete: {
          many: {
            title: 'Удаление виртуальных машин',
            text: 'Вы уверены что хотите удалить виртуальные машины ({count})?',
          },
          single: {
            title: 'Удаление виртуальной машины',
            text: 'Вы уверены что хотите удалить виртуальную машину {name}?',
          },
        },
        start: {
          many: {
            title: 'Запуск виртуальных машин',
            text: 'Вы уверены что хотите запустить виртуальные машины ({count})?',
          },
          single: {
            title: 'Запуск виртуальной машины',
            text: 'Вы уверены что хотите запустить виртуальную машину {name}?',
          },
        },
        shutOff: {
          title: 'Выключить',
          many: {
            title: 'Выключение виртуальных машин',
            text: 'Вы уверены что хотите выключить виртуальные машины ({count})?',
          },
          single: {
            title: 'Выключение виртуальной машины',
            text: 'Вы уверены что хотите выключить виртуальныея машина {name}?',
          },
        },
        vnc: 'VNC клиент',
      },
      form: {
        receivingVmError: 'Не удалось получить данные о ВМ. Произошла ошибка',
        tabs: {
          settings: {
            title: 'Настройки',
            sections: {
              mainSettings: 'Основные настройки',
              bootComponents: 'Компоненты загрузки',
              ballooning: 'Балунинг',
            },
            fields: {
              name: { label: 'Название', placeholder: 'Введите название ВМ' },
              alias: { label: 'Псевдоним', placeholder: 'Введите псевдоним ВМ' },
              description: { label: 'Описание', placeholder: 'Введите описание ВМ' },
              osType: { label: 'Тип ОС', placeholder: 'Выберите тип ОС' },
              osVariant: { label: 'Вариант ОС', placeholder: 'Выберите вариант ОС' },
              bootDevice: { label: 'Загрузочное устройство' },
              havm: {
                tooltip: `High Availability Virtual Machine (Высокая доступность ВМ)
                Если включено, эта ВМ будет перезапущена один раз на другом
                узле, если текущий узел выйдет из строя`,
                options: { on: 'Вкл', off: 'Выкл' },
              },
              havmPriority: {
                label: 'Приоритет',
                placeholder: 'Введите HAVM приоритет',
                tooltip: `Чем выше выбранное число, тем выше приоритет
                для включения ВМ функцией HAVM`,
              },
              graphicsDriver: { label: 'Графический драйвер', placeholder: 'Выберите графический драйвер' },
              graphics: { label: 'Протокол доступа' },
              adl: { label: 'АРН' },
              memory_ballooning: { label: 'Баллунинг' },
              memory_standard_value: { label: 'Гарантированная память' },
              memory_period: { label: 'Период (секунды)', placeholder: 'Укажите период' },
            },
          },
          cpuRamSettings: {
            title: 'Настройки ЦПУ/ОЗУ',
            sections: {
              cpu: 'ЦПУ',
              cpuFeatures: 'Функции ЦПУ',
              ram: 'Оперативная память',
            },
            fields: {
              cpyDynamicTopology: { label: 'Динамическая топология' },
              cpuSockets: { label: 'Сокеты', placeholder: 'Введите количество сокетов' },
              cpuCores: { label: 'Ядра', placeholder: 'Введите количество ядер' },
              threads: { label: 'Потоков', placeholder: 'Введите количество потоков' },
              virtualCores: { label: 'Виртуальных ядер', placeholder: 'Введите количество вирт. ядер' },
              cpuModel: { label: 'Модель ЦПУ', placeholder: 'Выберите модель ЦПУ' },
              cpuFeatures: { placeholder: 'Выберите опции' },
            },
          },
          disks: {
            title: 'Диски',
            modalTitle: 'Добавить диск',
            tabs: {
              existDisk: 'Существующий',
              existDiskExtra: 'Доп. настройки существующего',
              new: 'Новый',
              rdm: 'Выбор RDM диска',
            },
            sections: {
              qos: 'Приоритеты обслуживания (QOS)',
              readWriteSec: 'МБ/сек ',
              iops: 'IOPS',
              diskConfiguration: 'Кофигурация диска',
            },
            fields: {
              variant: {
                options: {
                  exist: 'Выбрать существующий диск из хранилища',
                  rdm: 'Выбрать RDM диск',
                  new: 'Создать новый диск',
                },
              },
              storageType: { label: 'Тип хранилища', placeholder: 'Выберите тип хранилища' },
              storageSubtype: { label: 'Подтип хранилища', placeholder: 'Выберите подтип хранилища' },
              disk: {
                headers: { storageName: 'Хранилище', storageType: 'Тип хранилища' },
                validationMessage: 'Необходимо выбрать диск',
              },
              emulation: { label: 'Эмуляция', placeholder: 'Выберите опцию' },
              cache: { label: 'Кеш', placeholder: 'Выберите опцию' },
              io: { placeholder: 'Выберите опцию' },
              rotation: { label: 'Формат', placeholder: 'Выберите формат' },
              template: { label: 'Шаблон', placeholder: 'Выберите опцию' },
              iopsRead: { label: 'Чтение' },
              iopsWrite: { label: 'Запись' },
              extraSettings: 'Расширенные настройки',
            },
            validationMessage: 'Необходимо выбрать диск',
            deleteAction: {
              title: 'Удаление диска',
              text: 'Вы уверены что хотите удалить диск {name}',
            },
          },
          images: {
            title: 'Виртуальные образы',
            btnAdd: 'Добавить ВО',
            modalTitle: 'Добавить виртуальный образ',
            backgroundUploading: 'Идёт фоновая загрузка ВО',
            tabs: { exist: 'Существующий', new: 'Новый' },
            fields: {
              variant: { exist: 'Выбрать существующий виртуальный образ', new: 'Загрузить новый виртуальный образ' },
              storageType: { label: 'Тип хранилища', placeholder: 'Выберите тип хранилища' },
              storageSubtype: { label: 'Подтип хранилища', placeholder: 'Выберите подтип хранилища' },
              image: {
                headers: { storageName: 'Хранилище', storageType: 'Тип хранилища' },
                validationMessage: 'Необходимо выбрать виртуальный образ',
              },
            },
            deleteAction: {
              title: 'Удаление виртуального образа',
              text: 'Вы уверены что хотите удалить виртуальный образ {name}',
            },
          },
          networks: {
            title: 'Сеть',
            modalTitle: 'Добавление сетевого интерфеса',
            btnAdd: 'Добавить сеть',
            validationMessage: 'Необходимо выбрать сеть',
            tabs: { variant: 'Выберите тип', bridge: 'Мост', vnet: 'Виртуальная сеть', extraSettings: 'Доп.настройки' },
            sections: { configuration: 'Конфигурация' },
            fields: {
              variant: { label: 'Выберите тип сетевого интерфейса', bridge: 'Мост', vnet: 'Виртуальная сеть' },
              network: { validationMessage: 'Необходимо выбрать сетевой интерфейс' },
              mode: { label: 'Режим', placeholder: 'Выберите режим' },
              model: { label: 'Модель', placeholder: 'Выберите модель' },
              mac: { placeholder: 'Введите MAC-адрес' },
              vnet: { name: 'Имя портгруппы', isTrunk: 'Trunk', tags: 'Тэги', interface: 'Интерфейс' },
            },
            deleteAction: {
              title: 'Удаление сети',
              text: 'Вы уверены что хотите удалить сеть {name}',
            },
          },
        },
      },
      card: {
        backlink: 'Виртуальная машина',
        noData: 'Не удалось получить данные о виртуальной машине. Произошла ошибка',
        tabs: {
          main: {
            title: 'Основная информация',
            sections: {
              main: 'Основные настройки',
              boot: 'Компоненты загрузки',
            },
            fields: {
              name: 'Название',
              powerState: 'Питание',
              description: 'Описание',
              information: 'Информация',
              osType: 'Тип ОС',
              osVariant: 'Вариант ОС',
              bootDevice: 'Загрузочное устройство',
              graphicsDriver: 'Графический драйвер',
              graphicType: 'Протокол доступа',
            },
          },
          cpuRam: {
            title: 'ЦПУ/ОЗУ',
            sections: { cpu: 'ЦПУ', ram: 'Оперативная память' },
            fields: {
              sockets: 'Сокеты',
              cores: 'Ядра',
              threads: 'Потоки',
              cpuModel: 'Модель ЦПУ',
              topology: 'Топология',
              vCores: 'Вирт. ядра',
              size: 'Объём',
            },
          },
          disks: { title: 'Диски', noData: 'Диски отсутствуют' },
          images: { title: 'Виртуальные образы', noData: 'Виртуальные образы отсутствуют' },
          network: { title: 'Сеть', noData: 'Сети отсутствуют' },
        },
        formBacklink: { create: 'Создание Виртуальной Машины', edit: 'Редактирование Виртуальной Машины' },
      },
    },
    virtualNetworks: {
      table: {
        portgroups: 'Группа портов',
        forwardMode: 'Режим переадресации',
        bridge: 'Мост',
        virtualPortType: 'Тип подгруппы',
        autostart: 'Автозапуск',
        persistent: 'Постоянная',
      },
      actions: {
        create: {
          title: 'Создание виртуальной сети',
          fields: {
            name: { label: 'Имя', placeholder: 'Укажите имя' },
            forwardMode: { label: 'Режим переадресации', placeholder: 'Выберите режим переадресации' },
            bridge: { label: 'Мост', placeholder: 'Выберите мост' },
            virtualPortType: { label: 'Тип подгруппы', placeholder: 'Выберите тип подгруппы' },
            portGroups: {
              label: 'Портгруппы',
              name: 'Имя',
              isTrunk: 'Trunk',
              tags: 'Тэги',
            },
          },
        },
        delete: {
          many: {
            title: 'Удалить виртуальные сети',
            text: 'Вы действительно хотите удалить виртуальные сети ({count})?',
          },
          single: {
            title: 'Удалить виртуальную сеть',
            text: 'Вы действительно хотите удалить виртуальную сеть {name}?',
          },
        },
        turnOn: {
          title: 'Включить',
          many: {
            title: 'Включить виртуальные сети',
            text: 'Вы действительно хотите включить виртуальные сети ({count})?',
          },
          single: {
            title: 'Включить виртуальную сеть',
            text: 'Вы действительно хотите включить виртуальную сеть {name}?',
          },
        },
        turnOff: {
          title: 'Выключить',
          many: {
            title: 'Выключить виртуальные сети',
            text: 'Вы действительно хотите выключить виртуальные сети ({count})?',
          },
          single: {
            title: 'Выключить виртуальную сеть',
            text: 'Вы действительно хотите выключить виртуальную сеть {name}?',
          },
        },
        createPortgroup: {
          title: 'Добавить портгруппу',
          modalTitle: 'Добавление портгруппы',
          submitText: 'Добавить',
          fields: {
            name: { label: 'Имя', placeholder: 'Укажите имя' },
            tags: { label: 'Тэги', placeholder: 'Укажите тэг и нажмите Enter', noSelect: 'Нет тэгов' },
            isTrunk: { label: 'Trunk' },
          },
        },
        deletePortgroup: {
          title: 'Удалить портгруппу',
          modalTitle: 'Удаление портгрупп',
          portgroup: { name: 'Имя', isTrunk: 'Trunk', tags: 'Тэги' },
        },
      },
    },
  },
  storages: {
    table: {
      storageType: 'Тип хранилища',
      available: 'Доступно',
      information: 'Инфо',
    },
    actions: {
      create: {
        title: 'Создать',
        modalTitle: 'Создание хранилища',
        form: {
          tabs: {
            storageType: 'Тип хранилища',
            configuration: 'Конфигурация',
            disk: 'Диск',
          },
          fields: {
            storageType: { label: 'Тип хранилища', placeholder: 'Выберите тип хранилища' },
            common: {
              name: { label: 'Имя', placeholder: 'Введите имя' },
              description: { label: 'Описание', placeholder: 'Введите описание' },
            },
            nfs: {
              ip: { label: 'IP адрес', placeholder: 'Укажите IP адрес' },
              path: { label: 'Путь', placeholder: 'Укажите путь' },
            },
            localFs: {
              fsType: { label: 'Файловая система', placeholder: 'Выберите файловую систему' },
              path: { headers: { path: 'Путь', size: 'Размер', type: 'Тип устройства' } },
            },
          },
        },
      },
      delete: {
        many: {
          title: 'Удаление хранилищ',
          text: 'Вы действительно хотите удалить хранилища ({count})?',
        },
        single: {
          title: 'Удаление хранилища',
          text: 'Вы действительно хотите удалить хранилище {name}?',
        },
      },
    },
    disks: {
      table: {
        attachments: 'Виртуальные машины',
        storage: 'Хранилище',
        information: 'Инфо',
        readOnly: 'Только чтение',
      },
      actions: {
        create: {
          title: 'Создать',
          modalTitle: 'Создание виртуального диска',
          fields: {
            name: { label: 'Имя диска', placeholder: 'Введите имя диска' },
            description: { label: 'Описание', placeholder: 'Введите описание' },
            storage: { label: 'Хранилище', placeholder: 'Выберите хранилище' },
            format: { label: 'Формат диска', placeholder: 'Выберите формат диска' },
            size: {
              label: 'Размер диска',
              validation: 'Размер диска не может превышать объём свободного места на пуле {size}',
            },
            read_only: { label: 'Только для чтения' },
          },
        },
        delete: {
          single: {
            title: 'Удаление виртуального диска',
            text: 'Вы уверены что хотите удалить виртуальный диск {name}',
          },
          many: {
            title: 'Удаление виртуальных дисков',
            text: 'Вы уверены что хотите удалить виртуальные диски ({count})?',
          },
        },
        extend: {
          title: 'Увеличить объём',
          formTitle: 'Увеличение объёма диска',
          submitText: 'Увеличить',
          formHint: 'Будет увеличен объём диска {name}',
          formInput: {
            label: 'Новый объём диска',
            validationMessages: {
              maxSize: 'Новый объём диска не может превышать объём свободного места в хранилище {size}',
              minSize: 'Новый объём диска не может быть меньше текущего {size}',
            },
          },
        },
        edit: {
          title: 'Изменить',
          formTitle: 'Изменение виртуального диска',
          formHint: 'Будет изменен виртуальный диск {name}',
        },
      },
    },
    images: {
      table: {
        attachments: 'Виртуальные машины',
        storage: 'Хранилище',
        information: 'Инфо',
      },
      actions: {
        upload: {
          title: 'Загрузить',
          modalTitle: 'Загрузка виртуального образа',
          uploadingProgress: 'Идет загрузка файла',
          fields: {
            name: { label: 'Имя', placeholder: 'Укажите имя', validationTaken: 'Имя уже используется' },
            description: { label: 'Описание', placeholder: 'Укажите описание' },
            image: {
              buttonText: 'Выберите образ',
              dropzone: 'Или поместите образ в этот контейнер',
              notSelected: 'Образ не выбран',
            },
            storageId: {
              label: 'Хранилище',
              placeholder: 'Выберите хранилище',
              validationMessage: 'Превышен объём свободного места в хранилище',
            },
          },
        },
        delete: {
          many: {
            title: 'Удаление виртуальных образов',
            text: 'Вы уверены что хотите удалить виртуальные образы ({count})?',
          },
          single: {
            title: 'Удаление виртуального образа',
            text: 'Вы уверены что хотите удалить виртуальный образ {name}?',
          },
        },
      },
    },
    card: {
      backlink: 'Хранилище',
      tabs: {
        main: {
          title: 'Основная информация',
          fields: {
            information: 'Информация',
            userId: 'ID пользователя',
            fsType: 'Тип ФС',
            mountPoint: 'Точка монтирования',
            mountVersion: 'Версия',
          },
        },
        volumes: {
          title: 'Диски',
        },
      },
    },
  },
  blockDevices: {
    table: { port: 'Порт' },
    actions: {
      scan: {
        title: 'Сканировать (LIP)',
        modalTitle: 'Сканирование Fibre Channel',
        text: `Будет выполнено сканирование на хост-адаптерах Fibre Channel с использованием протокола 
        LIP (Loop Initialization Protocol). Этот метод позволяет обнаруживать и добавлять новые 
        устройства в сеть Fibre Channel`,
        confirmText: 'Сканировать',
      },
      login: {
        title: 'Логин',
        modalTitle: 'Логин iSCSI сессии',
        fields: {
          ip: { label: 'IP', placeholder: 'Укажите IP' },
          port: { label: 'Порт', placeholder: 'Укажите порт' },
        },
      },
      logout: {
        title: 'Разлогинить',
        many: {
          title: 'Логаут сессий',
          text: 'Вы действительно уверены что хотите разлогинить сессии ({count})?',
        },
        single: {
          title: 'Логаут сессии',
          text: 'Вы действительно уверены что хотите разлогинить сессию {name}?',
        },
      },
    },
  },
  journal: {
    table: {
      module: 'Модуль',
      event: 'Событие',
      information: 'Инфо',
      objectId: 'ID объекта',
      timestamp: 'Дата',
      userId: 'ID пользователя',
    },
    actions: {
      download: {
        title: 'Загрузить',
      },
    },
  },
  settings: {
    settings: 'Настройки',
    interfaceSettings: 'Настройки интерфейса',
    clusterSettings: 'Настройки кластера',
    adlSettings: {
      title: 'Настройки АРН',
      cpuThreshold: { label: 'Порог ЦПУ в %', placeholder: 'Введите порог ЦПУ' },
      ramThreshold: { label: 'Порог ОЗУ в %', placeholder: 'Введите порог ОЗУ' },
      nodesParticipants: { label: 'Участвующие узлы', placeholder: 'Выберите участвующие узлы' },
    },
    RAMOverwriting: {
      enable: 'Включить переподписку оперативной памяти',
      nodes: 'Узлы для переподписки',
      nodesSelect: 'Выберите узлы',
    },
    theme: 'Тема',
    themes: {
      dark: 'Темная',
      darkBlue: 'Темно-синяя',
      light: 'Светлая',
    },
    locale: 'Язык',
    locales: {
      ru: '🇷🇺 Русский',
      en: '🇺🇸 English',
    },
    sizeNotation: 'Единицы измерения',
    oldVersion: 'Перейти на старый интерфейс',
    sizeNotations: {
      iec: 'МЭК Двоичная (КиБ, МиБ, ГиБ, ТиБ)',
      si: 'СИ Десятичная (КБ, МБ, ГБ, ТБ)',
    },
    sizeNotationsDesc: {
      iec: `Кибибайт (КиБ) 2^10 байт
        Мебибайт (МиБ) 2^20 байт
        Гибибайт (ГиБ) 2^30 байт
        Тебибайт (ТиБ) 2^40 байт`,
      si: `Килобайт (КБ) 10^3 байт
       Мегабайт (МБ) 10^6 байт
       Гигабайт (ГБ) 10^9 байт
       Терабайт (ТБ) 10^12 байт`,
    },
  },
}
