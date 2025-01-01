"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthResponse, AuthUserType } from "./auth-user.type";

const AuthUserContext = createContext<AuthUserType | null>(null);

export const useAuthUser = (): AuthUserType | null => useContext(AuthUserContext);

export function AuthUserProvider({ children }: { children: ReactNode }): JSX.Element {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

  useEffect(() => {
    const fetchAuthUser = async (): Promise<void> => {
      const response = await fetch(`/api/auth/user`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        if (data?.user) {
          setAuthUser(data.user);
        } else {
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    };

    fetchAuthUser().catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    });
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}
