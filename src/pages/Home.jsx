import { Navigate } from "react-router";

import ButtonAddTransaction from "@/components/ButtonAddTransaction";
import Cards from "@/components/Cards";
import Header from "@/components/Header";
import LoadingAuthentication from "@/components/LoadingAuthentication";
import TransactionsTable from "@/components/TransactionsTable";
import DateSelector from "@/components/ui/date-selector";
import { useAuthContext } from "@/contexts/auth";

const HomePage = () => {
  const { user, isAuthenticating } = useAuthContext();

  if (isAuthenticating) {
    return <LoadingAuthentication />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="space-y-6 px-8">
        <div className="mt-8 mb-6 flex justify-between">
          <h2 className="text-2xl">Dashboard</h2>
          <div className="flex">
            <DateSelector />
            <ButtonAddTransaction />
          </div>
        </div>
        <Cards />
        <TransactionsTable />
      </div>
    </div>
  );
};

export default HomePage;
