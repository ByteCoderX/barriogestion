export interface User {
    id_usuario: number
    dni: string
    nombre: string
    apellido: string
    direccion: string
    contacto: string
    password: string
    creado_en: Date
    actualizado_en: Date
    //La puta madre elias, crea las columnas en ingles
}