import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../services/Api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

interface IsignInCrendential {
  email: string;
  password: string;
}

interface User {
  email: string;
  permissions: Array<string>;
  roles: Array<string>;
}

interface IAuthContextProps {
  signIn(credentials: IsignInCrendential): Promise<void>;
  isAuthenticated: boolean;
  user: User;
}
export const SignOut = () => {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");
  Router.push("/");
};
export const AuthContext = React.createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    async function autoSignWithToken() {
      try {
        const { data } = await api.get("/me");
        const { roles, permissions, email } = data;
        setUser({
          email,
          roles,
          permissions,
        });
      } catch (err) {
        console.log(err);
        SignOut();
      }
    }

    if (token) autoSignWithToken();
  }, []);

  async function signIn({ email, password }: IsignInCrendential) {
    try {
      const { data } = await api.post("sessions", {
        email,
        password,
      });
      const { roles, permissions, token, refreshToken } = data;
      setUser({
        email,
        roles,
        permissions,
      });
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias,
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias,
        path: "/",
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      router.push("/dashboard");
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  const value = { signIn, isAuthenticated, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
