import api from "@/lib/axios";

const TransactionService = {
  create: async (data) => {
    const response = await api.post("/transactions/me", data);
    return response.data;
  },
  edit: async ({ transaction }) => {
    console.log(transaction);
    const response = await api.patch(`/transactions/me/${transaction.id}`, {
      name: transaction.name,
      type: transaction.type,
      date: transaction.date,
      amount: transaction.amount,
    });
    return response.data;
  },
  me: async ({ from, to }) => {
    const response = await api.get("/transactions/me", {
      params: { from, to },
    });
    return response.data;
  },
};

export default TransactionService;
