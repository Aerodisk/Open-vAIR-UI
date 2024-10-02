export type Session = {
  id: string
  inf_type: 'iscsi' | 'fibre_channel' | string
  port?: string
  ip: string
  status: string
}

export type State = {
  iqn: string | null
  sessions: Session[]
}

export const state: State = {
  iqn: null,
  sessions: [],
}
