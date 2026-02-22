import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuthContext } from "@/contexts/auth";
import TransactionService from "@/services/transaction";

export const createTransactionKey = ["createTransaction"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationKey: createTransactionKey,
    mutationFn: async (data) => {
      return await TransactionService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-transactions", user?.id],
      });
      toast.success("Transactions added successfuly");
    },
    onError: () => {
      toast.error("An error ocurrued while saving the transaction.");
    },
  });
};
