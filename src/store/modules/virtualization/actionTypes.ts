export enum VirtualizationActionTypes {
  // VM
  GET_VM_LIST = 'VIRTUALIZATION_GET_VM_LIST',
  CREATE_VM = 'VIRTUALIZATION_CREATE_VM',
  START_VM = 'VIRTUALIZATION_START_VM',
  SHUT_OFF_VM = 'VIRTUALIZATION_SHUT_OFF_VM',
  EDIT_VM = 'VIRTUALIZATION_EDIT_VM',
  OPEN_VNC_VM = 'VIRTUALIZATION_OPEN_VNC_VM',
  DELETE_VM = 'VIRTUALIZATION_DELETE_VM',

  // VIRTUAL NETWORK
  GET_VIRTUAL_NETWORK_LIST = 'VIRTUALIZATION_GET_VIRTUAL_NETWORK_LIST',
  CREATE_VIRTUAL_NETWORK = 'VIRTUALIZATION_CREATE_VIRTUAL_NETWORK',
  DELETE_VIRTUAL_NETWORK = 'VIRTUALIZATION_DELETE_VIRTUAL_NETWORK',
  TURN_ON_VIRTUAL_NETWORK = 'VIRTUALIZATION_TURN_ON_VIRTUAL_NETWORK',
  TURN_OFF_VIRTUAL_NETWORK = 'VIRTUALIZATION_TURN_OFF_VIRTUAL_NETWORK',
  ADD_PORTGROUP = 'VIRTUALIZATION_ADD_PORTGROUP',
  DELETE_PORTGROUP = 'VIRTUALIZATION_DELETE_PORTGROUP',
}
