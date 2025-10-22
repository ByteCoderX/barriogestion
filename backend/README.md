# Barrio Gestión - Backend

Backend construido con TypeScript, NodeJS, Express.JS, JWT, Prisma ORM y algunas cosas más.

---

## Índice General

- [Instalación y Configuración](#instalación-y-configuración)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Autenticación](#endpoints-de-autenticación)
- [Notas & Ejemplos](#notas-&-ejemplos)

---

## [Instalación y Configuración](#instalación-y-configuración)

1. Instalar dependencias:

   ```bash
   pnpm i
   ```

2. Renombrar el archivo `.env.template` a `.env.local` y completarlo con los datos necesarios.

3. Generar cliente de Prisma:

   ```bash
   pnpm prisma generate
   ```

4. Iniciar la aplicación en modo desarrollo:
   ```bash
   pnpm start:dev
   ```

---

## [Base URL](#base-url)

```
https://api.bringfeel.com.ar/bg/v1/{endpoint}
```

---

# API Documentación

## Índice de Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | [/auth/register](#post-authregister) | Registra un usuario de acceso |
| POST | [/auth/login](#post-authlogin) | Verifica credenciales y crea sesión |
| POST | [/auth/validator](#post-authvalidator) | Valida el refresh token en cookies |
| POST | [/auth/change-password](#post-authchange-password) | Cambia la contraseña de un usuario |
| POST | [/auth/logout](#post-authlogout) | Cierra la sesión y elimina el token |

### Client v1

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | [/client/v1/expenses/detailed/:id](#get-clientv1expensesdetailedid) | Obtiene los detalles de una expensa específica |
| GET | [/client/v1/expenses/:dni](#get-clientv1expensesdni) | Expensa actual pendiente y última pagada |
| GET | [/client/v1/expenses/history/:dni](#get-clientv1expenseshistorydni) | Historial completo de expensas |
| GET | [/client/v1/complaints?dni=:dni](#get-clientv1complaintsdnidni) | Obtiene los tickets de un usuario |
| POST | [/client/v1/complaints](#post-clientv1complaints) | Crea un nuevo ticket de reclamo |
| GET | [/client/v1/carnet/:dni](#get-clientv1carnetdni) | Genera y devuelve el carnet digital (PDF) |
| GET | [/client/v1/guest?userId=:userId](#get-clientv1guestuseriduserid) | Obtiene la lista de invitados de un usuario |
| POST | [/client/v1/guest](#post-clientv1guest) | Crea un nuevo invitado |
| PATCH | [/client/v1/guest](#patch-clientv1guest) | Actualiza un invitado existente |
| DELETE | [/client/v1/guest](#delete-clientv1guest) | Elimina un invitado |
| GET | [/client/v1/reservations/spaces](#get-clientv1reservationsspaces) | Obtiene todos los espacios disponibles |
| GET | [/client/v1/reservations/me/:dni](#get-clientv1reservationsmedni) | Obtiene reservas de un usuario |
| GET | [/client/v1/reservations/space/capacity/:spaceId](#get-clientv1reservationsspacecapacityspaceid) | Obtiene la capacidad de un espacio |
| POST | [/client/v1/reservations](#post-clientv1reservations) | Crea una nueva reserva |

---

## Endpoints de Autenticación

### POST `/auth/register`

Registra un usuario de acceso.

**Body:**
```json
{
  "dni": "string",
  "email": "string",
  "password": "string"
}
```

---

### POST `/auth/login`

Verifica la contraseña y genera la sesión (asigna los tokens mediante cookies).

**Body:**
```json
{
  "dni": "string",
  "password": "string"
}
```

---

### POST `/auth/validator`

Valida el refresh token de la cookie.

**Cookies:**
- Busca la cookie `refreshToken` (generada por el login)

---

### POST `/auth/change-password`

Cambia la contraseña de un usuario de acceso.

**Body:**
```json
{
  "dni": "string",
  "password": "string"
}
```

---

### POST `/auth/logout`

Elimina una sesión existente.

**Cookies:**
- Busca la cookie `refreshToken` (generada por el login)

---

## Endpoints de Client v1

### GET `/client/v1/expenses/detailed/:id`

Obtiene los detalles de una expensa específica.

**Path Parameters:**
```json
{
  "id": "string"
}
```

**Respuesta de ejemplo:**
```json
{
  "id": "123",
  "items": [
    {"concept": "Agua", "amount": 2000},
    {"concept": "Luz", "amount": 3000}
  ],
  "dueDate": "2025-10-31"
}
```

---

### GET `/client/v1/expenses/:dni`

Obtiene la expensa actual pendiente y la última pagada de un usuario.

**Path Parameters:**
```json
{
  "dni": "40123456"
}
```

**Respuesta de ejemplo:**
```json
{
  "current": {"monto": 5000, "vencimiento": "2025-10-31"},
  "previous": {"monto": 4500, "paidDate": "2025-09-30"}
}
```

---

### GET `/client/v1/expenses/history/:dni`

Obtiene el historial completo de expensas de un usuario.

**Path Parameters:**
```json
{
  "dni": "40123456"
}
```

**Respuesta de ejemplo:**
```json
[
  {"id": 1, "amount": 4500, "paidDate": "2025-09-30"},
  {"id": 2, "amount": 5000, "dueDate": "2025-10-31"}
]
```

---

### GET `/client/v1/complaints?dni=:dni`

Obtiene los tickets de un usuario según su DNI.

**Query Parameters:**
```json
{
  "dni": "40123456"
}
```

**Respuesta de ejemplo:**
```json
[
  {
    "id": 1,
    "title": "Fuga de agua",
    "category": "Plomería",
    "priority": "Alta",
    "location": "Departamento 3B",
    "description": "Fuga en el baño",
    "status": "Pendiente",
    "createdAt": "2025-10-01T10:00:00Z"
  }
]
```

---

### POST `/client/v1/complaints`

Crea un nuevo ticket de reclamo.

**Body:**
```json
{
  "title": "Fuga de agua",
  "category": "Plomería",
  "priority": "Alta",
  "location": "Departamento 3B",
  "description": "Fuga en el baño",
  "dni": "40123456"
}
```

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "status": "Pendiente"
}
```

---

### GET `/client/v1/carnet/:dni`

Genera y devuelve el carnet digital en PDF de un usuario.

**Path Parameters:**
```json
{
  "dni": "40123456"
}
```

**Respuesta:**
- PDF binario o link de descarga

---

### GET `/client/v1/guest?userId=:userId`

Obtiene la lista de invitados de un usuario.

**Query Parameters:**
```json
{
  "userId": 123
}
```

**Respuesta de ejemplo:**
```json
[
  {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "dni": "40123456",
    "contact": "123456789",
    "visitDate": "2025-10-20",
    "exitDate": "2025-10-20",
    "visitType": "Familiar",
    "reason": "Visita",
    "observations": ""
  }
]
```

---

### POST `/client/v1/guest`

Crea un nuevo invitado.

**Body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "dni": "40123456",
  "contact": "123456789",
  "visitDate": "2025-10-20",
  "exitDate": "2025-10-20",
  "visitType": "Familiar",
  "reason": "Visita",
  "userId": 123,
  "observations": ""
}
```

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "status": "Pendiente"
}
```

---

### PATCH `/client/v1/guest`

Actualiza un invitado existente.

**Body:**
- Igual que POST pero incluye `id` del invitado

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "status": "Actualizado"
}
```

---

### DELETE `/client/v1/guest`

Elimina un invitado.

**Body:**
```json
{
  "userId": 123,
  "guestId": 1
}
```

**Respuesta de ejemplo:**
```json
{
  "status": "Eliminado"
}
```

---

### GET `/client/v1/reservations/spaces`

Obtiene todos los espacios disponibles.

**Respuesta de ejemplo:**
```json
[
  {
    "id": 1,
    "name": "Gimnasio",
    "capacity": 30
  }
]
```

---

### GET `/client/v1/reservations/me/:dni`

Obtiene las reservas de un usuario.

**Path Parameters:**
```json
{
  "dni": "40123456"
}
```

**Respuesta de ejemplo:**
```json
[
  {
    "id": 1,
    "spaceId": 1,
    "reservationDate": "2025-10-25",
    "startTime": "18:00",
    "endTime": "20:00"
  }
]
```

---

### GET `/client/v1/reservations/space/capacity/:spaceId`

Obtiene la capacidad de un espacio.

**Path Parameters:**
```json
{
  "spaceId": 1
}
```

**Respuesta de ejemplo:**
```json
{
  "spaceId": 1,
  "capacity": 30,
  "available": 15
}
```

---

### POST `/client/v1/reservations`

Crea una nueva reserva.

**Body:**
```json
{
  "dni": "40123456",
  "spaceId": 1,
  "reservationDate": "2025-10-25",
  "startTime": "18:00",
  "endTime": "20:00"
}
```

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "status": "Confirmada"
}
```

## [Notas & Ejemplos](#notas-&-ejemplos)

- Ejemplo de `.env.local`.

  ```env
      # =============================
      # <API>
      # =============================
      PORT=3000
      API_KEY="hola"

      # =============================
      # <DATABASE>
      # =============================
      DATABASE_URL=mysql://USERNAME:PASSWORD@SERVER_IP:SERVER_PORT/DB_NAME

      # =============================
      # <JWT>
      # =============================
      # -> Tiempo de expiración junto a su unidad.
      # -> Unidades válidas: [ s | m | h | d ]
      # -> Ejemplo: 1d (1 día de expiración)

      JWT_ACCESS_EXP_TIME=1d           # 1 día de expiración
      JWT_ACCESS_REFRESH_TIME=7d       # 7 días para renovar
      JWT_REFRESH_EXP_TIME=30d         # 30 días de expiración
      JWT_REMAINING_REFRESH_TIME=7d    # 7 días para renovar
      JWT_ACCESS_SECRET=426990c8e9eab2c717fbf754016fedee
      JWT_REFRESH_SECRET=a01f6ab8b0b17868a86b5adfdea9cb1d

      # =============================
      # <LOGS>
      # =============================
      LOG_DIR=logs
  ```

- Los tokens se gestionan mediante cookies (`accessToken` y `refreshToken`).

---
