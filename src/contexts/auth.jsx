import { createContext, useState } from "react";

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

  const login = (credentials) => {
    doLogin(credentials, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
      },
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signUp = (userData) => {
    // Implement sign up logic here
    // For example, make an API call to register a new user
    // and set the user state accordingly
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
