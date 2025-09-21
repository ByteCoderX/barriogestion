import { prisma } from '@database/prisma'

export const getAllUsuarios = async () => {
  const usuarios = await prisma.usuarios.findMany()
  return usuarios
}
