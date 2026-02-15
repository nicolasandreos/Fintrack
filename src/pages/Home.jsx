import { Navigate } from "react-router";

import Header from "@/components/Header";
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
    <div className="h-screen w-screen">
      <Header />
    </div>
  );
};

export default HomePage;
