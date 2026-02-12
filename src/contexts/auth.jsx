import { createContext, useContext, useEffect, useState } from "react";

import useCreateUser from "@/hooks/data/useCreateUser";
import useGetAutenticatedUser from "@/hooks/data/useGetAutenticatedUser";
import useLogin from "@/hooks/data/useLogin";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { mutate: doLogin } = useLogin();
  const { mutate: createUser } = useCreateUser();
  const { data: authenticatedUser } = useGetAutenticatedUser();

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

  const logout = () => setUser(null);

  const signUp = (userData) => {
    createUser(userData, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        console.log(user);
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
