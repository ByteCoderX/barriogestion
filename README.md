# barriogestion - Backend
[Me quiero matar](https://www.figma.com/board/uUN5NAxLLAz1whjUeNXxaI/Sin-t%C3%ADtulo?node-id=0-1&t=xd0qkSPxeHxPk6lT-1)

- 25 Endpoints - Lógicos
- http://localhost:2005/bg/v1/{endpoints}


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
