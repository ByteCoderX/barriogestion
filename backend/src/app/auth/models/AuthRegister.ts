import { Employee } from "./AuthUser";

export type EmployeeRegister = Pick<
  Employee,
  "username" | "password"
>;