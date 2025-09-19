# barriogestion - Backend

- 25 Endpoints - Lógicos
- http://localhost:3000/bg/v1/{endpoints}

# Primeros pasos
- pnpm i
- editen el ".env.template" a ".env.local" y completenlo con los datos necesarios.
- pnpm prisma generate
- pnpm start:dev

# Documentación Crota
/auth
- **POST** /register | Registra un usuario de acceso.
  - Recibe por Body:
```
{
  dni: string
  email: string
  password: string
  personalId: number
}
```
- **POST** /login | Verifica la contraseña y genera la sesión (asigna los tokens mediante cookies).
  - Recibe por Body:
```
{
  dni: string
  password: string
}
```
- **POST** /validator | Valida el refresh token de la cookie.
  - Busca la cookie "refreshToken". (La cual es generada por el login)
- **POST** /change-password | Cambia la contraseña de un usuario de acceso.
  - Recibe por Body:
```
{
  dni: string
  password: string
}
```
- **POST** /logout | Elimina una sesión existente.
  - Busca la cookie "refreshToken". (La cual es generada por el login)
---
# Listado de posibles endpoints para el panel de Administración.
```
- *Completado* | Ni idea amigo
- [Posible] | Endpoints que se pueden llegar a hacer / Tienen su respectiva Tabla
- {Imposible} | Endpoints que no se pueden hacer por falta de datos
```

```
- auth/ | *Completado*
  - verify                            verifyToken(token: string)
  - login                             login(data: AuthUserLogin)
  - logout                            deleteToken(rId: string)

- user/ (usuarios) | [Posible]
  - GET /                             getAll()
  - GET /:id                          getUser(id: string)
  - POST /                            createUser() | Body: NewUser
  - PATCH /:id                        editUser(id: string) | Body: EditUser
  - DELETE /:id                       deleteUser(id: string)

- access/ (accesos) | [Posible]
  - POST /                            newAccess() | Body: NewAccess
  - GET /                             getAccess()

- expenses/ (expensas) | [Posible]
  - GET /:id                          getExpense(id: string)
  - GET /                             getAll()
  - POST /                            newExpense() | Body: NewExpense
  - PATCH /:id                        editExpense(id: string) | Body: EditExpense
  - DELETE /:id                       deleteExpense(id: string)


- bills/ (gastos) | {Imposible}
  - POST /                            newBill() | Body: NewBill
  - GET /                             getAll()
  - GET /:id                          getBill(id: string)
  - PATCH /:id                        editBill(id: string) | Body: EditBill

- founds/ (fondos) | {Imposible}
  - GET /                             getAll()

- incomes/ (ingresos) | {Imposible}
  - POST /                            newIncome() | Body: NewIncome
  - GET /                             getAll()

- payment/ (pagos) [Posible]
  - POST /                            newPayment() | Body: NewPayment
  - GET /:id                          getPayment(id: string)
  - PATCH /:id                        editPayment(id: string) | Body: editPayment
```
