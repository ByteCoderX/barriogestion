import { Guest } from './Guest'

export type GuestCreate = Pick<
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
  | 'userId'
>
