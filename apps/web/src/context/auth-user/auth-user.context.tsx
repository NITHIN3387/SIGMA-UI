"use client";

import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthUserType } from "./auth-user.type";

const AuthUserContext = createContext<AuthUserType>(null);

export const getAuthUser = () => useContext(AuthUserContext);

export const AuthUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserType>();

  useEffect(() => {
    const fetchAuthUser = async () => {
      const response = await fetch(`/api/auth/user`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuthUser(data.user);
      } else setAuthUser(null)
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};
