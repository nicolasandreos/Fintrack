import z from "zod";

export const addFormTransactionSchema = z.object({
  name: z.string().trim().min(1, "Title is required"),
  amount: z.number().min(1, "Value must exist"),
  date: z.date({ required_error: "Date is required" }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
});

export const editFormTransactionSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1, "Title is required"),
  amount: z.number().min(1, "Value must exist"),
  date: z.date({ required_error: "Date is required" }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
});
