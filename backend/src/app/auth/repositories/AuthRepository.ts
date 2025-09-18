import { AuthUserLogin } from "../models/AuthLogin";

export interface AuthRepository {
  verifyPassword(data: AuthUserLogin): Promise<boolean>;
}