export class AuthUser {
  constructor(
    public readonly id_usuario: number,
    public readonly creado_en: number,
    public readonly password: string,
    public dni: string
  ) {}
}