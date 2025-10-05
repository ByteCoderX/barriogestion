export interface ExpensaUltimoPago {
  periodo: string
  parcela: string
  fecha: Date
  medio: string | null
  importe: number
  referencia: string | null
}
