import { Pago } from './Pago'
import { Usuario } from './Usuario'

export interface ExpensaDetalle {
  id: number
  periodo: string
  parcela: string
  item: string | null
  importe: number
  detalle: string | null
  usuarios: Usuario[]
  pagos: Pago[]
}
