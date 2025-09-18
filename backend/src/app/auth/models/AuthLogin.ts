import { AuthUser } from "./AuthUser";

export type AuthUserLogin = Pick<
  AuthUser,
  "dni" | "password"
>;