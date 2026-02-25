import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { useAuthContext } from "@/contexts/auth";
import TransactionService from "@/services/transaction";

export const createTransactionKey = ["createTransaction"];
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  return useMutation({
    mutationKey: createTransactionKey,
    mutationFn: async (data) => {
      return await TransactionService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-transactions", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: getAllUserTransactionsKey({ user, from, to }),
      });
      toast.success("Transactions added successfuly");
    },
    onError: () => {
      toast.error("An error ocurrued while saving the transaction.");
    },
  });
};

export const editTransactionKey = ["editTransaction"];
export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  return useMutation({
    mutationKey: editTransactionKey,
    mutationFn: async ({ transaction }) => {
      console.log(transaction);
      return await TransactionService.edit({ transaction });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-transactions", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: getAllUserTransactionsKey({ user, from, to }),
      });
      toast.success("Transactions edited successfuly");
    },
    onError: () => {
      toast.error("An error ocurrued while editing the transaction.");
    },
  });
};

export const getAllUserTransactionsKey = ({ user, from, to }) => {
  return ["transactions", user?.id, from, to];
};
export const useGetAllUserTransactions = () => {
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  return useQuery({
    queryKey: getAllUserTransactionsKey({ user, from, to }),
    queryFn: async () => {
      return await TransactionService.me({ from, to });
    },
    enabled: Boolean(user) && Boolean(from) && Boolean(to),
  });
};
