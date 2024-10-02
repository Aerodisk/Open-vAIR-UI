export enum storageTypes {
  nfs = 'nfs',
  localfs = 'localfs',
}

type CommonFormData = {
  name: string
  description: string
}

type NFSCreateFormData = {
  storage_type: storageTypes.nfs
  ip: string
  path: string
}

type LocalFSCreateFormData = {
  storage_type: storageTypes.localfs
  fs_type: 'xfs' | 'ext4'
  path: string
}

export type FormDataType = CommonFormData & (NFSCreateFormData | LocalFSCreateFormData)
