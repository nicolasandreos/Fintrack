import { Navigate } from "react-router";

import LoadingAuthentication from "@/components/LoadingAuthentication";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";

const HomePage = () => {
  const { user, isAuthenticating, logout } = useAuthContext();

  if (isAuthenticating) {
    return <LoadingAuthentication />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Olá {user?.first_name}</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomePage;
