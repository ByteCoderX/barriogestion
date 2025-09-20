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
http://localhost:3000/bg/v1/{endpoint}
```

---

## [Endpoints](#endpoints)

### Índice rápido de Autenticación

| Método | Endpoint                                           | Descripción                         |
| ------ | -------------------------------------------------- | ----------------------------------- |
| POST   | [/auth/register](#post-authregister)               | Registra un usuario de acceso       |
| POST   | [/auth/login](#post-authlogin)                     | Verifica credenciales y crea sesión |
| POST   | [/auth/validator](#post-authvalidator)             | Valida el refresh token en cookies  |
| POST   | [/auth/change-password](#post-authchange-password) | Cambia la contraseña de un usuario  |
| POST   | [/auth/logout](#post-authlogout)                   | Cierra la sesión y elimina el token |

---

## [Endpoints de Autenticación](#endpoints-de-autenticación)

### **POST** `/auth/register`

Registra un usuario de acceso.

**Body:**

```json
{
  "dni": "string",
  "email": "string",
  "password": "string",
  "personalId": 0
}
```

---

### **POST** `/auth/login`

Verifica la contraseña y genera la sesión (asigna los tokens mediante cookies).

**Body:**

```json
{
  "dni": "string",
  "password": "string"
}
```

---

### **POST** `/auth/validator`

Valida el **refresh token** de la cookie.

- Busca la cookie `refreshToken` (generada por el login).

---

### **POST** `/auth/change-password`

Cambia la contraseña de un usuario de acceso.

**Body:**

```json
{
  "dni": "string",
  "password": "string"
}
```

---

### **POST** `/auth/logout`

Elimina una sesión existente.

- Busca la cookie `refreshToken` (generada por el login).

---

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
