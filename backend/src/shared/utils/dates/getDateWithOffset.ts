// Devuelve la fecha actual y una fecha con un offset personalizado.
export const getDateWithOffset = (data: {
  value: number
  unit: 's' | 'm' | 'h' | 'd'
}) => {
  const offset = new Date()
  const dateNow = new Date()

  switch (data.unit) {
    case 'd':
      offset.setDate(offset.getDate() + data.value)
      break
    case 'h':
      offset.setHours(offset.getHours() + data.value)
      break
    case 'm':
      offset.setMinutes(offset.getMinutes() + data.value)
      break
    case 's':
      offset.setSeconds(offset.getSeconds() + data.value)
      break
    default:
      offset.setDate(offset.getDate() + data.value)
      break
  }

  return {
    now: dateNow,
    offset,
  }
}
