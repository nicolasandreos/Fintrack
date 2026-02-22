import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateTransaction } from "@/hooks/data/Transactions";

import { addFormTransactionSchema } from "../schemas/transaction";

export const useFormAddTransaction = ({ onSuccess }) => {
  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const formSettings = useForm({
    resolver: zodResolver(addFormTransactionSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: new Date(),
      type: "EARNING",
    },
    shouldUnregister: true,
  });

  const handleSubmitForm = (formData) => {
    createTransaction(formData, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return { formSettings, handleSubmitForm, isPending };
};
