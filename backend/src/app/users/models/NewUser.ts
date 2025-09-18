import { User } from "./User";

// Con esta pavada nos evitamos el crear una nueva interfaz para definir otro modelo
// de datos.

export type NewUser = Pick<User,
"dni" | "nombre" | "apellido" | "direccion" | "contacto" | "password"
>;