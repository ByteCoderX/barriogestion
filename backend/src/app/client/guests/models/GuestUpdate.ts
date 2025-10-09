import { Guest } from './Guest'

export type GuestUpdate = Pick<
  Guest,
  | 'firstName'
  | 'lastName'
  | 'dni'
  | 'contact'
  | 'visitDate'
  | 'exitDate'
  | 'visitType'
  | 'reason'
  | 'observations'
>
