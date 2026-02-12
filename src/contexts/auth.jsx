import { createContext, useContext, useEffect, useState } from "react";

import useCreateUser from "@/hooks/data/useCreateUser";
import useGetAutenticatedUser from "@/hooks/data/useGetAutenticatedUser";
import useLogin from "@/hooks/data/useLogin";

export const AuthContext = createContext({
  user: null,
  isAuthenticating: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { mutate: doLogin } = useLogin();
  const { mutate: createUser } = useCreateUser();
  const { data: authenticatedUser, isPending } = useGetAutenticatedUser();

  const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    try {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      }
    } catch (error) {
      console.error("Error setting authenticated user:", error);
    }
  }, [authenticatedUser]);

  const login = (credentials) => {
    doLogin(credentials, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
      },
    });
  };

  const logout = () => {
    removeTokens();
    setUser(null);
  };

  const signUp = (userData) => {
    createUser(userData, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        console.log(user);
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticating: isPending, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
