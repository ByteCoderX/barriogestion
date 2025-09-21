// Obtiene los atributos del header "set-cookie" y mapea
// cada cookie en una propiedad independiente.
// Ejemplo: { 'cookie': 'valor' }

export const cookieParser = (headers: Record<string, string>) => {
  const cookiesRaw = headers['set-cookie']
  if (!cookiesRaw) return null
  const cookies = Array.isArray(cookiesRaw) ? cookiesRaw : [cookiesRaw]

  const parsedCookies = cookies.reduce(
    (acc, cookieStr) => {
      const [cookie] = cookieStr.split(';')
      const [name, value] = cookie.split('=')
      acc[name] = value
      return acc
    },
    {} as Record<string, string>,
  )

  return parsedCookies
}
