import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const SingUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().min(1, "Last Name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Confirm Password must be at least 6 characters"),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
