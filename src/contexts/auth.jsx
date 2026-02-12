import { createContext, useState } from "react";

import useCreateUser from "@/hooks/data/useCreateUser";
import useLogin from "@/hooks/data/useLogin";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signUp: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { mutate: doLogin } = useLogin();
  const { mutate: createUser } = useCreateUser();

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
