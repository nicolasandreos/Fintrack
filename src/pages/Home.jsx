import { PlusIcon } from "lucide-react";
import { Navigate } from "react-router";

import Cards from "@/components/Cards";
import Header from "@/components/Header";
import LoadingAuthentication from "@/components/LoadingAuthentication";
import { Button } from "@/components/ui/button";
import DateSelector from "@/components/ui/date-selector";
import { useAuthContext } from "@/contexts/auth";
import TransactionService from "@/services/transaction";

const HomePage = () => {
  const { user, isAuthenticating } = useAuthContext();

  if (isAuthenticating) {
    return <LoadingAuthentication />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAddTransaction = () => {
    const response = TransactionService.create({
      name: "Salary",
      type: "EARNING",
      date: "2023-12-15T17:08:26.189Z",
      amount: 1000,
    });
    return response;
  };

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="px-8">
        <div className="mt-8 mb-6 flex justify-between">
          <h2 className="text-2xl">Dashboard</h2>
          <div className="flex">
            <DateSelector />
            <Button onClick={handleAddTransaction}>
              New Transaction <PlusIcon />
            </Button>
          </div>
        </div>

        <Cards />
      </div>
    </div>
  );
};

export default HomePage;
