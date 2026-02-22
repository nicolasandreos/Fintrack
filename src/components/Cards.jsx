import { useQuery } from "@tanstack/react-query";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "react-router";

import { useAuthContext } from "@/contexts/auth";
import TransactionService from "@/services/transaction";

import CardSection from "./Card";

const Cards = () => {
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { user } = useAuthContext();
  const { data: userTransactions } = useQuery({
    queryKey: ["user-transactions", user?.id, from, to],
    queryFn: async () => {
      const meTransactions = await TransactionService.me({ from, to });
      return meTransactions;
    },
  });

  const profitsAmount =
    userTransactions?.reduce((acumulator, currentValue) => {
      if (currentValue.type === "EARNING") {
        return acumulator + Number(currentValue.amount);
      }
      return acumulator;
    }, 0) ?? 0;

  const expensesAmount =
    userTransactions?.reduce((acumulator, currentValue) => {
      if (currentValue.type === "EXPENSE") {
        return acumulator + Number(currentValue.amount);
      }
      return acumulator;
    }, 0) ?? 0;

  const investmentAmount =
    userTransactions?.reduce((acumulator, currentValue) => {
      if (currentValue.type === "INVESTMENT") {
        return acumulator + Number(currentValue.amount);
      }
      return acumulator;
    }, 0) ?? 0;

  const walletAmount = profitsAmount - expensesAmount - investmentAmount;

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 grid w-213 grid-cols-2 grid-rows-2 gap-4">
        <CardSection
          text="Wallet"
          value={`R$ ${walletAmount}`}
          icon={<WalletIcon className="h-5 w-5 text-white opacity-100" />}
        />
        <CardSection
          text="Profits"
          value={`R$ ${profitsAmount}`}
          icon={<TrendingUpIcon className="text-primary h-5 w-5 opacity-100" />}
        />
        <CardSection
          text="Expenses"
          value={`R$ ${expensesAmount}`}
          icon={
            <TrendingDownIcon className="h-5 w-5 text-red-500 opacity-100" />
          }
        />
        <CardSection
          text="Investment"
          value={`R$ ${investmentAmount}`}
          icon={<PiggyBankIcon className="h-5 w-5 text-blue-500 opacity-100" />}
        />
      </div>
      {/* <Card className='w-125 h-64' /> */}
    </div>
  );
};

export default Cards;
