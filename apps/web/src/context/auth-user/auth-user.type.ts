import type { UserType } from "@/types/db.types";

export type AuthUserType = UserType | null | undefined

export interface AuthResponse {
  user: AuthUserType;
}