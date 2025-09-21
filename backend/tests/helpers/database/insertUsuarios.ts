import { prisma } from '@database/prisma'
import { faker } from '@faker-js/faker'

interface UsuarioMockCreate {
  dni: string
  firstName: string
  lastName: string
  address?: string
  contact?: string
  createdDate: Date
  updatedDate: Date
}

export const insertUsuarios = async (usuarios?: UsuarioMockCreate[]) => {
  if (!usuarios || usuarios.length === 0) {
    await prisma.usuarios.create({
      data: {
        dni: String(faker.number.int({ min: 10_000_000, max: 99_999_999 })),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        contact: faker.phone.number({ style: 'international' }),
      },
    })
    return
  }

  await prisma.usuarios.createMany({
    data: usuarios.map((usuario) => ({
      dni: usuario.dni,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      address: usuario.address,
      contact: usuario.contact,
    })),
  })
}
