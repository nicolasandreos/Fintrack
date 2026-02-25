import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateTransaction,
  useEditTransaction,
} from "@/hooks/data/Transactions";

import {
  addFormTransactionSchema,
  editFormTransactionSchema,
} from "../schemas/transaction";

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

function addOneDay(isoString) {
  const date = new Date(isoString);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString();
}

export const useFormEditTransaction = ({ onSuccess, transaction }) => {
  const { mutate: editTransaction, isPending } = useEditTransaction();
  const formSettings = useForm({
    resolver: zodResolver(editFormTransactionSchema),
    defaultValues: {
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    formSettings.reset({
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    });
    formSettings.setValue("id", transaction.id);
  }, [formSettings, transaction]);

  const handleSubmitForm = (formData) => {
    const date = formData.date;
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const formValues = {
      id: formData.id,
      name: formData.name,
      date: utcDate.toISOString(),
      amount: formData.amount,
      type: formData.type,
    };
    editTransaction(
      { transaction: formValues },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          return;
        },
      }
    );
  };

  return { formSettings, handleSubmitForm, isPending };
};
