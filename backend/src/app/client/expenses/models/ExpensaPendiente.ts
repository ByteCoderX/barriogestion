import { Cargo } from './Cargo'

export interface ExpensaPendiente {
  periodo: string
  total: number
  pagado: number
  saldo: number
  cargos: Cargo[]
}
