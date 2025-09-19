// Calcula el tiempo restante entre la fecha actual y una
// fecha unix
export const getRemainingTime = (
  unixTimestamp: number,
  unit: 's' | 'm' | 'h' | 'd',
) => {
  const dateFromUnix = new Date(unixTimestamp * 1000)
  const currentDate: Date = new Date()

  const diffMs = Math.abs(Number(currentDate) - Number(dateFromUnix))

  switch (unit) {
    case 'd':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    case 'h':
      return Math.floor(diffMs / (1000 * 60 * 60))
    case 'm':
      return Math.floor(diffMs / (1000 * 60))
    case 's':
      return Math.floor(diffMs / 1000)
    default:
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
  }
}
// Dependiendo de la unidad va a retornar un tipo diferente.
