import api from "@/lib/axios";

const TransactionService = {
  create: async (data) => {
    console.log(data);
    const response = await api.post("/transactions/me", data);
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
